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

  if (file.buffer.length === 0) {
    throw new Error(
      `"${file.originalname}" is empty. ` +
        "Please choose a valid file and submit again."
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
      fields: "id,name,mimeType,size,webViewLink",
    });

    /*
      Drive can commit a file record even when the
      media transfer failed, leaving a 0-byte file
      behind. Verify the stored size matches the
      uploaded buffer so empty files are never
      recorded as successful uploads.
    */
    if (
      response.data.size !== undefined &&
      Number(response.data.size) === 0
    ) {
      await drive.files
        .delete({ fileId: response.data.id })
        .catch(() => {});

      throw new Error(
        `"${file.originalname}" could not be stored ` +
          "correctly. Please try uploading again."
      );
    }

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
      size: response.data.size,
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
    fields: "id,name,mimeType,size",
  });

  const response = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  return {
    stream: response.data,
    name: metadata.data.name,
    mimeType: metadata.data.mimeType,
    size: metadata.data.size,
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
