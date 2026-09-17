// const express = require("express");
// const multer = require("multer");

// const {
//   submitAffiliation,
//   getAllAffiliations,
//   getAffiliationById,
//   updateStatus,
//   deleteAffiliation,
// } = require("../controllers/affiliationController");

// const router = express.Router();

// const storage = multer.memoryStorage();

// const allowedMimeTypes = [
//   "application/pdf",
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
// ];

// const upload = multer({
//   storage,

//   limits: {
//     fileSize: 10 * 1024 * 1024,
//   },

//   fileFilter: (req, file, callback) => {
//     if (allowedMimeTypes.includes(file.mimetype)) {
//       callback(null, true);
//     } else {
//       callback(
//         new Error(
//           "Only PDF, JPG, JPEG and PNG files are allowed."
//         ),
//         false
//       );
//     }
//   },
// });

// const affiliationUploadFields = [
//   {
//     name: "saleDeedFile",
//     maxCount: 1,
//   },
//   {
//     name: "rentalAgreementFile",
//     maxCount: 1,
//   },
//   {
//     name: "buildingDocumentsFile",
//     maxCount: 1,
//   },
//   {
//     name: "institutionHeadSignature",
//     maxCount: 1,
//   },

//   {
//     name: "enclosure_file_3",
//     maxCount: 1,
//   },
//   {
//     name: "enclosure_file_4",
//     maxCount: 1,
//   },
//   {
//     name: "enclosure_file_5",
//     maxCount: 1,
//   },
//   {
//     name: "enclosure_file_6",
//     maxCount: 1,
//   },
//   {
//     name: "enclosure_file_7",
//     maxCount: 1,
//   },
//   {
//     name: "enclosure_file_9",
//     maxCount: 1,
//   },
//   {
//     name: "enclosure_file_10",
//     maxCount: 1,
//   },
//   {
//     name: "enclosure_file_11",
//     maxCount: 1,
//   },
//   {
//     name: "enclosure_file_12",
//     maxCount: 1,
//   },
//   {
//     name: "enclosure_file_13",
//     maxCount: 1,
//   },
// ];

// router.post(
//   "/",
//   upload.fields(affiliationUploadFields),
//   submitAffiliation
// );

// router.get(
//   "/",
//   getAllAffiliations
// );

// router.get(
//   "/:id",
//   getAffiliationById
// );

// router.patch(
//   "/:id/status",
//   updateStatus
// );

// router.delete(
//   "/:id",
//   deleteAffiliation
// );

// module.exports = router;



const express = require("express");
const multer = require("multer");

const {
  submitAffiliation,
  getAllAffiliations,
  getAffiliationById,
  updateStatus,
  deleteAffiliation,
} = require("../controllers/affiliationController");

const router = express.Router();

/* =====================================================
   MULTER STORAGE
===================================================== */

const storage = multer.memoryStorage();

/* =====================================================
   ALLOWED FILE TYPES
===================================================== */

const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];

/* =====================================================
   MULTER CONFIGURATION
===================================================== */

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, callback) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      return callback(null, true);
    }

    return callback(
      new Error(
        "Only PDF, JPG, JPEG and PNG files are allowed."
      ),
      false
    );
  },
});

/* =====================================================
   AFFILIATION UPLOAD FIELDS
===================================================== */

const affiliationUploadFields = [
  {
    name: "saleDeedFile",
    maxCount: 1,
  },
  {
    name: "rentalAgreementFile",
    maxCount: 1,
  },
  {
    name: "buildingDocumentsFile",
    maxCount: 1,
  },
  {
    name: "institutionHeadSignature",
    maxCount: 1,
  },
  {
    name: "enclosure_file_3",
    maxCount: 1,
  },
  {
    name: "enclosure_file_4",
    maxCount: 1,
  },
  {
    name: "enclosure_file_5",
    maxCount: 1,
  },
  {
    name: "enclosure_file_6",
    maxCount: 1,
  },
  {
    name: "enclosure_file_7",
    maxCount: 1,
  },
  {
    name: "enclosure_file_9",
    maxCount: 1,
  },
  {
    name: "enclosure_file_10",
    maxCount: 1,
  },
  {
    name: "enclosure_file_11",
    maxCount: 1,
  },
  {
    name: "enclosure_file_12",
    maxCount: 1,
  },
  {
    name: "enclosure_file_13",
    maxCount: 1,
  },
];

/* =====================================================
   AFFILIATION SUBMIT ROUTE
===================================================== */

router.post(
  "/",

  (req, res, next) => {
    console.log("========================================");
    console.log("AFFILIATION POST REQUEST RECEIVED");
    console.log("URL:", req.originalUrl);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("========================================");

    next();
  },

  (req, res, next) => {
    upload.fields(affiliationUploadFields)(
      req,
      res,
      function (error) {
        if (error instanceof multer.MulterError) {
          console.error(
            "AFFILIATION MULTER ERROR:",
            error
          );

          if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              success: false,
              message:
                "Each uploaded file must be 10 MB or smaller.",
            });
          }

          return res.status(400).json({
            success: false,
            message:
              "File upload error: " +
              error.message,
          });
        }

        if (error) {
          console.error(
            "AFFILIATION FILE ERROR:",
            error
          );

          return res.status(400).json({
            success: false,
            message:
              error.message ||
              "Invalid file upload.",
          });
        }

        console.log(
          "AFFILIATION FORM BODY:",
          req.body
        );

        console.log(
          "AFFILIATION FILE FIELDS:",
          req.files
            ? Object.keys(req.files)
            : []
        );

        next();
      }
    );
  },

  submitAffiliation
);

/* =====================================================
   GET ALL AFFILIATIONS
===================================================== */

router.get(
  "/",
  getAllAffiliations
);

/* =====================================================
   GET AFFILIATION BY ID
===================================================== */

router.get(
  "/:id",
  getAffiliationById
);

/* =====================================================
   UPDATE AFFILIATION STATUS
===================================================== */

router.patch(
  "/:id/status",
  updateStatus
);

/* =====================================================
   DELETE AFFILIATION
===================================================== */

router.delete(
  "/:id",
  deleteAffiliation
);

module.exports = router;