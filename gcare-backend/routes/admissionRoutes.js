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
  deleteAdmission
} = require("../controllers/admissionController");

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
-------------------------------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    ensureUploadDir();
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      fileExtension;

    cb(null, fileName);
  }
});

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

// GET /api/admissions
router.get("/", getAdmissions);

// GET /api/admissions/:id
router.get("/:id", getAdmissionById);

// PUT /api/admissions/:id/status
router.put("/:id/status", updateAdmissionStatus);

// DELETE /api/admissions/:id
router.delete("/:id", deleteAdmission);

module.exports = router;