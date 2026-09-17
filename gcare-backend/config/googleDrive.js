const { google } = require("googleapis");
require("dotenv").config();

const missingEnvVars = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REDIRECT_URI",
  "GOOGLE_REFRESH_TOKEN",
  "GOOGLE_DRIVE_FOLDER_ID",
].filter((name) => !process.env[name]);

if (missingEnvVars.length) {
  console.warn(
    "[GOOGLE DRIVE] Missing environment variables:",
    missingEnvVars.join(", ")
  );
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

console.log("[GOOGLE DRIVE] OAuth2 initialized");

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

module.exports = drive;
