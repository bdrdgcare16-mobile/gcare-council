const crypto = require("crypto");

/* =====================================================
   ADMIN TOKEN AUTHENTICATION

   Stateless HMAC-signed token. No extra dependencies.

   Token format:
     base64url(JSON payload) + "." + base64url(HMAC-SHA256)

   Payload:
     { email, iat, exp }
===================================================== */

const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

function getTokenSecret() {
  return process.env.ADMIN_TOKEN_SECRET || "";
}

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(data) {
  return crypto
    .createHmac("sha256", getTokenSecret())
    .update(data)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generateAdminToken(email) {
  const payload = {
    email: String(email || ""),
    iat: Date.now(),
    exp: Date.now() + TOKEN_TTL_MS
  };

  const payloadPart = base64url(JSON.stringify(payload));
  const signaturePart = sign(payloadPart);

  return `${payloadPart}.${signaturePart}`;
}

function verifyAdminToken(token) {
  if (
    !getTokenSecret() ||
    typeof token !== "string"
  ) {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [payloadPart, signaturePart] = parts;
  const expectedSignature = sign(payloadPart);

  const a = Buffer.from(signaturePart);
  const b = Buffer.from(expectedSignature);

  if (
    a.length !== b.length ||
    !crypto.timingSafeEqual(a, b)
  ) {
    return null;
  }

  let payload;

  try {
    payload = JSON.parse(
      Buffer.from(payloadPart, "base64").toString("utf8")
    );
  } catch (error) {
    return null;
  }

  if (
    !payload ||
    typeof payload.exp !== "number" ||
    payload.exp < Date.now()
  ) {
    return null;
  }

  return payload;
}

/* =====================================================
   REQUIRE ADMIN MIDDLEWARE

   Checks the Authorization: Bearer <token> header.
   Rejects with 401 when the token is missing,
   invalid, or expired.
===================================================== */

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match ? match[1] : null;

  const payload = verifyAdminToken(token);

  if (!payload) {
    return res.status(401).json({
      success: false,
      message: "Admin authentication required."
    });
  }

  req.admin = payload;

  next();
}

/* =====================================================
   TIMING-SAFE CREDENTIAL CHECK
===================================================== */

function safeCompare(a, b) {
  const aBuf = Buffer.from(String(a || ""));
  const bBuf = Buffer.from(String(b || ""));

  if (aBuf.length !== bBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuf, bBuf);
}

module.exports = {
  generateAdminToken,
  verifyAdminToken,
  requireAdmin,
  safeCompare
};
