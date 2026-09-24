// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const {
//   createAdmission,
//   getAdmissions,
//   getAdmissionById,
//   updateAdmissionStatus
// } = require("../controllers/admissionController");

// const router = express.Router();

// const uploadDir = path.join(process.cwd(), "uploads", "admissions");

// function ensureUploadDir() {
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }
// }

// ensureUploadDir();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     ensureUploadDir();
//     cb(null, uploadDir);
//   },

//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() +
//       "-" +
//       Math.round(Math.random() * 1e9) +
//       path.extname(file.originalname);

//     cb(null, uniqueName);
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024
//   },
//   fileFilter: function (req, file, cb) {
//     const allowedMimeTypes = [
//       "image/jpeg",
//       "image/jpg",
//       "image/png",
//       "application/pdf"
//     ];

//     if (allowedMimeTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only JPG, JPEG, PNG, and PDF files are allowed."));
//     }
//   }
// });

// const admissionUpload = upload.fields([
//   { name: "photoUpload", maxCount: 1 },
//   { name: "aadhaarUpload", maxCount: 1 },
//   { name: "educationCertificateUpload", maxCount: 1 },
//   { name: "parentSignature", maxCount: 1 }
// ]);

// router.post("/", admissionUpload, createAdmission);
// router.get("/", getAdmissions);
// router.get("/:id", getAdmissionById);
// router.put("/:id/status", updateAdmissionStatus);

// module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
  deleteAdmission,
  streamAdmissionDocument
} = require("../controllers/admissionController");

const { requireAdmin } = require("../middleware/adminAuth");

const router = express.Router();

/* --------------------------------
   Upload Folder Setup
-------------------------------- */
const uploadDir = path.join(process.cwd(), "uploads", "admissions");

function ensureUploadDir() {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

ensureUploadDir();

/* --------------------------------
   Multer Storage Configuration
   Memory storage keeps file.buffer
   available for Google Drive upload.
-------------------------------- */
const storage = multer.memoryStorage();

/* --------------------------------
   File Upload Validation
-------------------------------- */
const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: function (req, file, cb) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, PNG, and PDF files are allowed."));
    }
  }
});

/* --------------------------------
   Admission Upload Fields
-------------------------------- */
const admissionUpload = upload.fields([
  { name: "photoUpload", maxCount: 1 },
  { name: "aadhaarUpload", maxCount: 1 },
  { name: "educationCertificateUpload", maxCount: 1 },
  { name: "parentSignature", maxCount: 1 }
]);

/* --------------------------------
   Upload Error Handler
-------------------------------- */
function handleAdmissionUpload(req, res, next) {
  admissionUpload(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message:
          error.code === "LIMIT_FILE_SIZE"
            ? "File size should not exceed 5 MB."
            : error.message
      });
    }

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    next();
  });
}

/* --------------------------------
   Admission Routes
-------------------------------- */

// POST /api/admissions
router.post("/", handleAdmissionUpload, createAdmission);

// GET /api/admissions (admin only)
router.get("/", requireAdmin, getAdmissions);

// GET /api/admissions/documents/:documentId/file (admin only)
// Streams a stored document (Google Drive or legacy local file)
router.get(
  "/documents/:documentId/file",
  requireAdmin,
  streamAdmissionDocument
);

// GET /api/admissions/:id (admin only)
router.get("/:id", requireAdmin, getAdmissionById);

// PUT /api/admissions/:id/status (admin only)
router.put("/:id/status", requireAdmin, updateAdmissionStatus);

// DELETE /api/admissions/:id (admin only)
router.delete("/:id", requireAdmin, deleteAdmission);

module.exports = router;