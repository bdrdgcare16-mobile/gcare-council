/* =====================================================
   GOOGLE DRIVE OAUTH SETUP ROUTES (TEMPORARY)

   Purpose:
   Regenerate GOOGLE_REFRESH_TOKEN locally when the
   existing token is expired or revoked.

   Security:
   - Only mounted when NODE_ENV !== "production" AND
     GOOGLE_OAUTH_SETUP=true in .env
   - Rejects non-localhost requests
   - Never logs or displays codes, tokens, or secrets
   - Delete this file (or set GOOGLE_OAUTH_SETUP=false)
     after the refresh token has been regenerated
===================================================== */

const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const router = express.Router();

const DRIVE_SCOPE =
  "https://www.googleapis.com/auth/drive.file";

let pendingState = null;

function createOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

function isLocalRequest(req) {
  const host = (req.hostname || "").toLowerCase();
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host === "[::1]"
  );
}

router.use(function (req, res, next) {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }

  if (process.env.GOOGLE_OAUTH_SETUP !== "true") {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }

  if (!isLocalRequest(req)) {
    return res.status(403).json({
      success: false,
      message:
        "Google Drive OAuth setup is restricted to localhost.",
    });
  }

  next();
});

router.get("/auth", function (req, res) {
  pendingState = crypto.randomBytes(32).toString("hex");

  const oauth2Client = createOAuthClient();

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [DRIVE_SCOPE],
    state: pendingState,
  });

  return res.redirect(authUrl);
});

router.get("/oauth2callback", async function (req, res) {
  const { code, state, error } = req.query;

  if (error) {
    pendingState = null;
    return res
      .status(400)
      .send(
        "Google authorization was declined or failed. " +
          "No changes were made."
      );
  }

  if (
    !state ||
    !pendingState ||
    state.length !== pendingState.length ||
    !crypto.timingSafeEqual(
      Buffer.from(state),
      Buffer.from(pendingState)
    )
  ) {
    pendingState = null;
    return res
      .status(400)
      .send(
        "Invalid OAuth state. " +
          "Restart the flow at /api/google-drive/auth."
      );
  }

  pendingState = null;

  if (!code) {
    return res
      .status(400)
      .send("Missing authorization code.");
  }

  try {
    const oauth2Client = createOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens || !tokens.refresh_token) {
      return res
        .status(400)
        .send(
          "Google did not return a refresh token. " +
            "Restart the flow at /api/google-drive/auth."
        );
    }

    const envPath = path.join(__dirname, "..", ".env");
    const envContent = fs.readFileSync(envPath, "utf8");

    const line = `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`;

    let updatedEnv;

    if (/^GOOGLE_REFRESH_TOKEN=.*$/m.test(envContent)) {
      updatedEnv = envContent.replace(
        /^GOOGLE_REFRESH_TOKEN=.*$/m,
        line
      );
    } else {
      updatedEnv =
        envContent.replace(/\s*$/, "") +
        "\n\n" +
        line +
        "\n";
    }

    fs.writeFileSync(envPath, updatedEnv);

    return res
      .status(200)
      .send(
        "<h2>Google Drive authorization successful.</h2>" +
          "<p>A new refresh token was saved to the backend .env file.</p>" +
          "<p>Next steps:</p>" +
          "<ol>" +
          "<li>Restart the backend server.</li>" +
          "<li>Set GOOGLE_OAUTH_SETUP=false in .env (or remove this routes file).</li>" +
          "<li>Test a Google Drive upload.</li>" +
          "</ol>"
      );
  } catch (err) {
    return res
      .status(500)
      .send(
        "Token exchange failed. Check that the redirect URI " +
          "matches the OAuth client configuration and retry " +
          "/api/google-drive/auth."
      );
  }
});

module.exports = router;
