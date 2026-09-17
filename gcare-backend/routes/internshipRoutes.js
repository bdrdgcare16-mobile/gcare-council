// const express =
//   require("express");

// const multer =
//   require("multer");

// const path =
//   require("path");

// const fs =
//   require("fs");


// const {
//   createInternship,
//   getAllInternships,
//   getInternshipById,
//   updateInternshipStatus,
//   deleteInternship
// } =
//   require("../controllers/internshipController");


// const router =
//   express.Router();


// /* =====================================================
//    UPLOAD DIRECTORY
// ===================================================== */

// const uploadDirectory =
//   path.join(
//     process.cwd(),
//     "uploads",
//     "internships"
//   );


// if (
//   !fs.existsSync(
//     uploadDirectory
//   )
// ) {
//   fs.mkdirSync(
//     uploadDirectory,
//     {
//       recursive: true
//     }
//   );
// }


// /* =====================================================
//    STORAGE
// ===================================================== */

// const storage =
//   multer.diskStorage({

//     destination:
//       function (
//         req,
//         file,
//         cb
//       ) {

//         cb(
//           null,
//           uploadDirectory
//         );

//       },


//     filename:
//       function (
//         req,
//         file,
//         cb
//       ) {

//         const extension =
//           path
//             .extname(
//               file.originalname
//             )
//             .toLowerCase();


//         const fileName =
//           `candidate-${Date.now()}-${Math.round(
//             Math.random() * 1e9
//           )}${extension}`;


//         cb(
//           null,
//           fileName
//         );

//       }

//   });


// /* =====================================================
//    FILE FILTER
// ===================================================== */

// const fileFilter =
//   function (
//     req,
//     file,
//     cb
//   ) {

//     const allowedMimeTypes = [
//       "image/jpeg",
//       "image/png"
//     ];


//     const allowedExtensions = [
//       ".jpg",
//       ".jpeg",
//       ".png"
//     ];


//     const extension =
//       path
//         .extname(
//           file.originalname
//         )
//         .toLowerCase();


//     if (
//       allowedMimeTypes.includes(
//         file.mimetype
//       ) &&
//       allowedExtensions.includes(
//         extension
//       )
//     ) {

//       return cb(
//         null,
//         true
//       );

//     }


//     return cb(
//       new Error(
//         "Only JPG, JPEG, and PNG files are allowed."
//       )
//     );

//   };


// /* =====================================================
//    MULTER
// ===================================================== */

// const upload =
//   multer({

//     storage,

//     fileFilter,

//     limits: {
//       fileSize:
//         5 * 1024 * 1024
//     }

//   });


// /* =====================================================
//    UPLOAD MIDDLEWARE
// ===================================================== */

// function uploadCandidateSignature(
//   req,
//   res,
//   next
// ) {

//   upload.single(
//     "candidateSignature"
//   )(
//     req,
//     res,
//     function (
//       error
//     ) {

//       if (
//         error instanceof
//         multer.MulterError
//       ) {

//         if (
//           error.code ===
//           "LIMIT_FILE_SIZE"
//         ) {
//           return res
//             .status(400)
//             .json({
//               success: false,

//               message:
//                 "Candidate Signature image must be less than 5 MB."
//             });
//         }


//         return res
//           .status(400)
//           .json({
//             success: false,

//             message:
//               error.message
//           });

//       }


//       if (error) {

//         return res
//           .status(400)
//           .json({
//             success: false,

//             message:
//               error.message
//           });

//       }


//       next();

//     }
//   );

// }


// /* =====================================================
//    ROUTES
// ===================================================== */


// /*
//   POST
//   /api/internships

//   Submit Internship Form
// */

// router.post(
//   "/",
//   uploadCandidateSignature,
//   createInternship
// );


// /*
//   GET
//   /api/internships

//   Get all Internship applications
// */

// router.get(
//   "/",
//   getAllInternships
// );


// /*
//   GET
//   /api/internships/1
// */

// router.get(
//   "/:id",
//   getInternshipById
// );


// /*
//   PUT
//   /api/internships/1/status

//   Body:
//   {
//     "status": "Approved"
//   }
// */

// router.put(
//   "/:id/status",
//   updateInternshipStatus
// );

// router.delete(
//   "/:id",
//   deleteInternship
// );


// module.exports =
//   router;




const express =
  require("express");

const multer =
  require("multer");

const path =
  require("path");

const fs =
  require("fs");


const {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternshipStatus,
  deleteInternship
} =
  require(
    "../controllers/internshipController"
  );


const router =
  express.Router();


/* =====================================================
   UPLOAD DIRECTORY
===================================================== */

const uploadDirectory =
  path.join(
    process.cwd(),
    "uploads",
    "internships"
  );


if (
  !fs.existsSync(
    uploadDirectory
  )
) {

  fs.mkdirSync(
    uploadDirectory,
    {
      recursive:
        true
    }
  );

}


/* =====================================================
   STORAGE
===================================================== */

const storage =
  multer.diskStorage({

    destination:
      function (
        req,
        file,
        cb
      ) {

        cb(
          null,
          uploadDirectory
        );

      },


    filename:
      function (
        req,
        file,
        cb
      ) {

        const extension =
          path
            .extname(
              file.originalname
            )
            .toLowerCase();


        const fileName =
          `candidate-${Date.now()}-${Math.round(
            Math.random() *
            1e9
          )}${extension}`;


        cb(
          null,
          fileName
        );

      }

  });


/* =====================================================
   FILE FILTER
===================================================== */

const fileFilter =
function (
  req,
  file,
  cb
) {

  const allowedMimeTypes = [
    "image/jpeg",
    "image/png"
  ];


  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png"
  ];


  const extension =
    path
      .extname(
        file.originalname
      )
      .toLowerCase();


  if (
    allowedMimeTypes.includes(
      file.mimetype
    ) &&
    allowedExtensions.includes(
      extension
    )
  ) {

    return cb(
      null,
      true
    );

  }


  return cb(
    new Error(
      "Only JPG, JPEG, and PNG files are allowed."
    )
  );

};


/* =====================================================
   MULTER
===================================================== */

const upload =
  multer({

    storage,

    fileFilter,

    limits: {
      fileSize:
        5 *
        1024 *
        1024
    }

  });


/* =====================================================
   UPLOAD MIDDLEWARE
===================================================== */

function uploadCandidateSignature(
  req,
  res,
  next
) {

  upload.single(
    "candidateSignature"
  )(
    req,
    res,
    function (
      error
    ) {

      if (
        error instanceof
        multer.MulterError
      ) {

        if (
          error.code ===
          "LIMIT_FILE_SIZE"
        ) {

          return res
            .status(400)
            .json({

              success:
                false,

              message:
                "Candidate Signature image must be less than 5 MB."

            });

        }


        return res
          .status(400)
          .json({

            success:
              false,

            message:
              error.message

          });

      }


      if (
        error
      ) {

        return res
          .status(400)
          .json({

            success:
              false,

            message:
              error.message

          });

      }


      next();

    }
  );

}


/* =====================================================
   CREATE INTERNSHIP
===================================================== */

router.post(
  "/",
  uploadCandidateSignature,
  createInternship
);


/* =====================================================
   GET ALL INTERNSHIPS
===================================================== */

router.get(
  "/",
  getAllInternships
);


/* =====================================================
   GET INTERNSHIP BY ID
===================================================== */

router.get(
  "/:id",
  getInternshipById
);


/* =====================================================
   UPDATE STATUS
===================================================== */

router.put(
  "/:id/status",
  updateInternshipStatus
);


/* =====================================================
   DELETE INTERNSHIP
===================================================== */

router.delete(
  "/:id",
  deleteInternship
);


/* =====================================================
   EXPORT
===================================================== */

module.exports =
  router;