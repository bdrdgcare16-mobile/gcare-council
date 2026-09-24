const express = require("express");

const {
  generateAdminToken,
  safeCompare
} = require("../middleware/adminAuth");

const router = express.Router();

/* =====================================================
   PASSWORD STRENGTH

   The configured ADMIN_LOGIN_PASSWORD must be strong.
   In production a weak password disables admin login
   entirely instead of issuing tokens against it.
===================================================== */

function isStrongPassword(password) {
  return (
    typeof password === "string" &&
    password.length >= 12 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password)
  );
}

if (
  process.env.ADMIN_LOGIN_PASSWORD &&
  !isStrongPassword(process.env.ADMIN_LOGIN_PASSWORD)
) {
  console.warn(
    "[ADMIN AUTH] WARNING: ADMIN_LOGIN_PASSWORD is weak. " +
      "Use at least 12 characters with upper/lowercase, " +
      "numbers, and symbols. Admin login is DISABLED " +
      "in production until this is fixed."
  );
}

if (
  !process.env.ADMIN_TOKEN_SECRET ||
  process.env.ADMIN_TOKEN_SECRET.length < 32
) {
  console.warn(
    "[ADMIN AUTH] WARNING: ADMIN_TOKEN_SECRET is missing " +
      "or too short. Set a random value of at least " +
      "32 characters."
  );
}

/* =====================================================
   LOGIN RATE LIMITING

   In-memory limiter: max 5 failed attempts per IP
   per 15-minute window. Successful login clears the
   counter. Responses stay generic — never reveal
   whether the email or the password was wrong.
===================================================== */

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 5;
const loginAttempts = new Map();

function isRateLimited(ip) {
  const entry = loginAttempts.get(ip);

  if (!entry) {
    return false;
  }

  if (Date.now() > entry.resetAt) {
    loginAttempts.delete(ip);
    return false;
  }

  return entry.count >= LOGIN_MAX_ATTEMPTS;
}

function recordFailedLogin(ip) {
  const entry = loginAttempts.get(ip);

  if (!entry || Date.now() > entry.resetAt) {
    loginAttempts.set(ip, {
      count: 1,
      resetAt: Date.now() + LOGIN_WINDOW_MS
    });
    return;
  }

  entry.count += 1;
}

function clearLoginAttempts(ip) {
  loginAttempts.delete(ip);
}

/* =====================================================
   ADMIN LOGIN

   POST /api/admin/login
   Body: { email, password }

   Verifies credentials against server-side
   environment variables and returns a signed
   bearer token for admin API access.
===================================================== */

router.post("/login", (req, res) => {
  const ip = req.ip || "unknown";

  if (isRateLimited(ip)) {
    console.warn(
      "[ADMIN AUTH] Rate-limited login attempt"
    );

    return res.status(429).json({
      success: false,
      message:
        "Too many login attempts. Try again later."
    });
  }

  const { email, password } = req.body || {};

  const expectedEmail =
    process.env.ADMIN_LOGIN_EMAIL || "";

  const expectedPassword =
    process.env.ADMIN_LOGIN_PASSWORD || "";

  if (!expectedEmail || !expectedPassword) {
    return res.status(500).json({
      success: false,
      message:
        "Admin login is not configured on the server."
    });
  }

  if (
    process.env.NODE_ENV === "production" &&
    !isStrongPassword(expectedPassword)
  ) {
    console.error(
      "[ADMIN AUTH] Login rejected: ADMIN_LOGIN_PASSWORD " +
        "does not meet the production strength policy."
    );

    return res.status(500).json({
      success: false,
      message:
        "Admin login is not properly configured on the server."
    });
  }

  const emailOk = safeCompare(email, expectedEmail);
  const passwordOk = safeCompare(password, expectedPassword);

  if (!emailOk || !passwordOk) {
    recordFailedLogin(ip);

    console.warn(
      "Failed admin login attempt"
    );

    return res.status(401).json({
      success: false,
      message: "Invalid admin email or password."
    });
  }

  clearLoginAttempts(ip);

  const token = generateAdminToken(expectedEmail);

  return res.status(200).json({
    success: true,
    message: "Login successful.",
    token
  });
});

module.exports = router;
