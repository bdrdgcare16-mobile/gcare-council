const { Readable } = require("stream");
const drive = require("../config/googleDrive");

const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

console.log(
  "[GOOGLE DRIVE] Folder ID from env:",
  folderId ? `${folderId.slice(0, 6)}…` : "NOT SET"
);

const uploadFileToDrive = async (file) => {
  if (!file) {
    return null;
  }

  const folderId =
    process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!folderId) {
    throw new Error(
      "GOOGLE_DRIVE_FOLDER_ID is not configured"
    );
  }

  if (!file.buffer) {
    throw new Error(
      `File buffer missing for "${file.originalname}". ` +
        "Multer must use memoryStorage for Drive uploads."
    );
  }

  console.log(
    "[GOOGLE DRIVE] Uploading:",
    file.originalname
  );

  try {
    const response = await drive.files.create({
      requestBody: {
        name: `${Date.now()}-${file.originalname}`,
        parents: [folderId],
      },
      media: {
        mimeType: file.mimetype,
        body: Readable.from(file.buffer),
      },
      fields: "id,name,mimeType,webViewLink",
    });

    console.log(
      "[GOOGLE DRIVE] Upload successful:",
      response.data.id
    );

    return {
      id: response.data.id,
      name: response.data.name,
      fileId: response.data.id,
      fileName: response.data.name,
      mimeType: response.data.mimeType,
      webViewLink:
        response.data.webViewLink || null,
    };
  } catch (error) {
    console.error(
      "[GOOGLE DRIVE] Upload failed:",
      file.originalname,
      "-",
      error.message
    );

    throw error;
  }
};

const getDriveFileStream = async (fileId) => {
  const metadata = await drive.files.get({
    fileId,
    fields: "id,name,mimeType",
  });

  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  return {
    stream: response.data,
    name: metadata.data.name,
    mimeType: metadata.data.mimeType,
  };
};

const deleteFileFromDrive = async (fileId) => {
  try {
    await drive.files.delete({ fileId });
    return true;
  } catch (error) {
    console.error(
      "[GOOGLE DRIVE] Failed to delete orphaned file:",
      fileId
    );
    return false;
  }
};

module.exports = {
  uploadFileToDrive,
  getDriveFileStream,
  deleteFileFromDrive,
};
