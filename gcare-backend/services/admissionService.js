


// const {
//   insertAdmission,
//   insertAdmissionDocument,
//   fetchAdmissions,
//   fetchAdmissionById,
//   fetchAdmissionDocuments,
//   updateStatus
// } = require("../query/admissionQuery");

// const {
//   sendAdminAdmissionNotification,
//   sendAdmissionStatusEmail
// } = require("./admissionEmailService");
// const normalizeFilePath = (filePath) => {
//   if (!filePath) return null;
//   return filePath.replace(/\\/g, "/");
// };

// const getAdmissionCourseName = (admission) => {
//   return (
//     admission.courseName ||
//     admission.educationCourse ||
//     "-"
//   );
// };

// const getAdmissionFullName = (admission) => {
//   return admission.fullName || "Student";
// };

// const getAdmissionApplicationNo = (admission) => {
//   return admission.applicationNo || "-";
// };

// const saveAdmission = (body, files) => {
//   return new Promise((resolve, reject) => {
//     // Validate required file uploads
//     if (!files || !files.photoUpload || !files.photoUpload[0]) {
//       return reject(new Error("Photo upload is required"));
//     }
//     if (!files || !files.aadhaarUpload || !files.aadhaarUpload[0]) {
//       return reject(new Error("Aadhaar card upload is required"));
//     }
//     if (!files || !files.educationCertificateUpload || !files.educationCertificateUpload[0]) {
//       return reject(new Error("Education certificate upload is required"));
//     }
//     if (!files || !files.parentSignature || !files.parentSignature[0]) {
//       return reject(new Error("Parent signature upload is required"));
//     }

//     // Log received files
//     console.log("Received uploaded files:");
//     console.log("- photoUpload:", files.photoUpload?.[0]?.filename || "Not provided");
//     console.log("- aadhaarUpload:", files.aadhaarUpload?.[0]?.filename || "Not provided");
//     console.log("- educationCertificateUpload:", files.educationCertificateUpload?.[0]?.filename || "Not provided");
//     console.log("- parentSignature:", files.parentSignature?.[0]?.filename || "Not provided");

//     // Extract file paths from req.files
//     const admissionData = {
//       ...body,
//       photoPath: files.photoUpload?.[0] ? normalizeFilePath(files.photoUpload[0].path) : null,
//       aadhaarPath: files.aadhaarUpload?.[0] ? normalizeFilePath(files.aadhaarUpload[0].path) : null,
//       educationCertificatePath: files.educationCertificateUpload?.[0] ? normalizeFilePath(files.educationCertificateUpload[0].path) : null,
//       parentSignaturePath: files.parentSignature?.[0] ? normalizeFilePath(files.parentSignature[0].path) : null
//     };

//     insertAdmission(admissionData, async (err, result) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       const admissionId = result.insertId;

//       const fileMap = [
//         {
//           key: "photoUpload",
//           type: "Passport Size Photo"
//         },
//         {
//           key: "aadhaarUpload",
//           type: "Aadhaar Card"
//         },
//         {
//           key: "educationCertificateUpload",
//           type: "Education Certificate"
//         },
//         {
//           key: "parentSignature",
//           type: "Parent / Guardian Signature"
//         }
//       ];

//       const uploadedDocuments = [];

//       for (const item of fileMap) {
//         if (files && files[item.key] && files[item.key][0]) {
//           const file = files[item.key][0];

//           uploadedDocuments.push({
//             admissionId,
//             documentType: item.type,
//             fileName: file.originalname,
//             filePath: normalizeFilePath(file.path),
//             mimeType: file.mimetype
//           });
//         }
//       }

//       const savedAdmissionData = {
//         id: admissionId,
//         admissionId,
//         applicationNo: body.applicationNo,
//         courseName: body.courseName,
//         fullName: body.fullName,
//         mobile: body.mobile,
//         email: body.email,
//         academicLevel: body.academicLevel,
//         status: "Pending",
//         documents: uploadedDocuments,
//         ...body
//       };

//       try {
//         await sendAdminAdmissionNotification(savedAdmissionData);
//         console.log("Admin admission notification email sent successfully.");
//       } catch (emailError) {
//         console.error("Admin admission notification email failed:", emailError);
//       }

//       resolve(savedAdmissionData);
//     });
//   });
// };

// const getAllAdmissions = () => {
//   return new Promise((resolve, reject) => {
//     fetchAdmissions((err, results) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       resolve(results);
//     });
//   });
// };

// const getAdmissionDetails = (id) => {
//   return new Promise((resolve, reject) => {
//     fetchAdmissionById(id, (err, admissionResult) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       if (!admissionResult || !admissionResult.length) {
//         resolve(null);
//         return;
//       }

//       fetchAdmissionDocuments(id, (docErr, documentResult) => {
//         if (docErr) {
//           reject(docErr);
//           return;
//         }

//         const admission = admissionResult[0];

//         const documents = Array.isArray(documentResult)
//           ? documentResult.map((doc) => ({
//               ...doc,
//               filePath: normalizeFilePath(doc.filePath)
//             }))
//           : [];

//         resolve({
//           ...admission,
//           documents
//         });
//       });
//     });
//   });
// };

// const changeAdmissionStatus = (id, status) => {
//   return new Promise((resolve, reject) => {
//     fetchAdmissionById(id, (findErr, admissionResult) => {
//       if (findErr) {
//         reject(findErr);
//         return;
//       }

//       if (!admissionResult || !admissionResult.length) {
//         resolve(null);
//         return;
//       }

//       const admission = admissionResult[0];

//       updateStatus(id, status, async (updateErr) => {
//         if (updateErr) {
//           reject(updateErr);
//           return;
//         }

//         const updatedAdmission = {
//           ...admission,
//           id,
//           status,
//           applicationNo: getAdmissionApplicationNo(admission),
//           fullName: getAdmissionFullName(admission),
//           courseName: getAdmissionCourseName(admission)
//         };

//         if (status === "Approved" || status === "Rejected") {
//           try {
//             await sendAdmissionStatusEmail(updatedAdmission, status);
//             console.log("Admission status email sent to user successfully.");
//           } catch (emailError) {
//             console.error("Admission status email failed:", emailError);
//           }
//         }

//         resolve(updatedAdmission);
//       });
//     });
//   });
// };

// module.exports = {
//   saveAdmission,
//   getAllAdmissions,
//   getAdmissionDetails,
//   changeAdmissionStatus
// };




const {
  insertAdmission,
  insertAdmissionDocument,
  fetchAdmissions,
  fetchAdmissionById,
  fetchAdmissionDocuments,
  fetchAdmissionDocumentById,
  updateStatus,
  deleteAdmission
} = require("../query/admissionQuery");

const {
  uploadFileToDrive,
  deleteFileFromDrive
} = require("./driveService");

const debugLog =
  require("../utils/debugLog");


/* =====================================================
   NORMALIZE FILE PATH
===================================================== */

const normalizeFilePath = (
  filePath
) => {
  if (!filePath) {
    return null;
  }

  return filePath.replace(
    /\\/g,
    "/"
  );
};


/* =====================================================
   HELPER VALUES
===================================================== */

const getAdmissionCourseName = (
  admission
) => {
  return (
    admission.courseName ||
    admission.educationCourse ||
    "-"
  );
};


const getAdmissionFullName = (
  admission
) => {
  return (
    admission.fullName ||
    "Student"
  );
};


const getAdmissionApplicationNo = (
  admission
) => {
  return (
    admission.applicationNo ||
    "-"
  );
};


/* =====================================================
   BRANCH VALIDATION
===================================================== */

const allowedBranches = [
  "Thiruvallur",
  "Salai",
  "Poonamallee",
  "Ennore",
  "Kanchipuram",
  "Thiruthani",
  "Nemilicherry",
  "Pudur",
  "Nagapattinam"
];


/* =====================================================
   SAVE ADMISSION
===================================================== */

const saveAdmission = async (
  body,
  files
) => {

  /* ---------------------------------------------
     REQUIRED FILE VALIDATION
  --------------------------------------------- */

  if (
    !files ||
    !files.photoUpload ||
    !files.photoUpload[0]
  ) {
    throw new Error(
      "Photo upload is required"
    );
  }


  if (
    !files ||
    !files.aadhaarUpload ||
    !files.aadhaarUpload[0]
  ) {
    throw new Error(
      "Aadhaar card upload is required"
    );
  }


  if (
    !files ||
    !files.educationCertificateUpload ||
    !files.educationCertificateUpload[0]
  ) {
    throw new Error(
      "Education certificate upload is required"
    );
  }


  if (
    !files ||
    !files.parentSignature ||
    !files.parentSignature[0]
  ) {
    throw new Error(
      "Parent signature upload is required"
    );
  }


  /* ---------------------------------------------
     LOG FILES
  --------------------------------------------- */

  debugLog(
    "Received uploaded files:"
  );

  debugLog(
    "- photoUpload:",
    files.photoUpload?.[0]
      ?.filename ||
      "Not provided"
  );

  debugLog(
    "- aadhaarUpload:",
    files.aadhaarUpload?.[0]
      ?.filename ||
      "Not provided"
  );

  debugLog(
    "- educationCertificateUpload:",
    files.educationCertificateUpload?.[0]
      ?.filename ||
      "Not provided"
  );

  debugLog(
    "- parentSignature:",
    files.parentSignature?.[0]
      ?.filename ||
      "Not provided"
  );


  /* ---------------------------------------------
     BRANCH VALIDATION
  --------------------------------------------- */

  const rawBranch =
    body.branch_name ||
    body.branchName ||
    body.branch;

  const branchName =
    typeof rawBranch === "string"
      ? rawBranch.trim()
      : "";

  debugLog(
    "Student Admission branch value received:",
    branchName || "NOT RECEIVED"
  );

  if (
    !branchName ||
    !allowedBranches.includes(
      branchName
    )
  ) {
    throw new Error(
      "Please select a valid Branch Name"
    );
  }


  /* ---------------------------------------------
     UPLOAD DOCUMENTS TO GOOGLE DRIVE

     Files are uploaded BEFORE the admission row
     is inserted. If any required upload fails,
     no admission record is created, so an
     application can never appear submitted
     without its documents being stored.

     If a later upload fails, earlier Drive
     files are deleted as orphans.
  --------------------------------------------- */

  const fileMap = [
    {
      key:
        "photoUpload",

      type:
        "Passport Size Photo"
    },

    {
      key:
        "aadhaarUpload",

      type:
        "Aadhaar Card"
    },

    {
      key:
        "educationCertificateUpload",

      type:
        "Education Certificate"
    },

    {
      key:
        "parentSignature",

      type:
        "Parent / Guardian Signature"
    }
  ];


  const driveUploads =
    {};

  const uploadedFileIds =
    [];


  try {
    for (
      const item of fileMap
    ) {
      const file =
        files[item.key][0];

      const driveFile =
        await uploadFileToDrive(
          file
        );

      if (
        !driveFile ||
        !driveFile.fileId
      ) {
        throw new Error(
          `${item.type} could not be stored. Please try again.`
        );
      }

      uploadedFileIds.push(
        driveFile.fileId
      );

      driveUploads[item.key] =
        driveFile;
    }
  } catch (uploadError) {
    for (
      const fileId of uploadedFileIds
    ) {
      await deleteFileFromDrive(
        fileId
      );
    }

    throw uploadError;
  }


  /* ---------------------------------------------
     CREATE ADMISSION DATA
  --------------------------------------------- */

  const admissionData = {
    ...body,

    branch_name: branchName,

    photoPath:
      `drive:${driveUploads.photoUpload.fileId}`,

    aadhaarPath:
      `drive:${driveUploads.aadhaarUpload.fileId}`,

    educationCertificatePath:
      `drive:${driveUploads.educationCertificateUpload.fileId}`,

    parentSignaturePath:
      `drive:${driveUploads.parentSignature.fileId}`,

    status: "Pending"
  };


  debugLog(
    "ADMISSION DATA BEFORE INSERT:",
    admissionData
  );


  /* ---------------------------------------------
     INSERT MAIN ADMISSION
  --------------------------------------------- */

  const insertResult =
    await new Promise(
      (resolve, reject) => {

        insertAdmission(
          admissionData,
          (err, result) => {

            if (err) {
              console.error(
                "INSERT ADMISSION ERROR:",
                err
              );

              reject(err);

              return;
            }

            resolve(result);
          }
        );

      }
    );


  const admissionId =
    insertResult.insertId;


  debugLog(
    "Admission inserted successfully. ID:",
    admissionId
  );


  const uploadedDocuments =
    [];


  /* ---------------------------------------------
     INSERT DOCUMENT RECORDS

     file_path stores the Google Drive reference
     in the format "drive:<fileId>".
  --------------------------------------------- */

  for (
    const item of fileMap
  ) {
    if (
      files?.[item.key]?.[0]
    ) {
      const file =
        files[item.key][0];

      const driveFile =
        driveUploads[item.key];


      const documentData = {
        admissionId:
          admissionId,

        documentType:
          item.type,

        fileName:
          file.originalname,

        filePath:
          `drive:${driveFile.fileId}`,

        mimeType:
          file.mimetype
      };


      try {
        await new Promise(
          (resolve, reject) => {

            insertAdmissionDocument(
              documentData,
              (err, result) => {

                if (err) {
                  reject(err);

                  return;
                }

                resolve(result);
              }
            );

          }
        );


        uploadedDocuments.push(
          documentData
        );

      } catch (documentError) {
        console.error(
          "ADMISSION DOCUMENT INSERT ERROR:",
          documentError
        );

        /*
          Do not delete successful admission
          just because document metadata failed.
        */
      }
    }
  }


  /* ---------------------------------------------
     RETURN SAVED ADMISSION
  --------------------------------------------- */

  const savedAdmissionData = {
    id:
      admissionId,

    admissionId:
      admissionId,

    applicationNo:
      body.applicationNo,

    courseName:
      body.courseName,

    fullName:
      body.fullName,

    mobile:
      body.mobile,

    email:
      body.email,

    academicLevel:
      body.academicLevel,

    state:
      body.state,

    district:
      body.district,

    status:
      "Pending",

    createdAt:
      new Date().toISOString(),

    documents:
      uploadedDocuments,

    ...body,

    branch_name: branchName,
    branchName: branchName
  };


  return savedAdmissionData;
};


/* =====================================================
   GET ALL ADMISSIONS
===================================================== */

const getAllAdmissions = () => {
  return new Promise(
    (resolve, reject) => {

      fetchAdmissions(
        (err, results) => {

          if (err) {
            reject(err);

            return;
          }

          resolve(results);
        }
      );

    }
  );
};


/* =====================================================
   GET ADMISSION DETAILS
===================================================== */

const getAdmissionDetails = (
  id
) => {
  return new Promise(
    (resolve, reject) => {

      fetchAdmissionById(
        id,
        (
          err,
          admissionResult
        ) => {

          if (err) {
            reject(err);

            return;
          }


          if (
            !admissionResult ||
            !admissionResult.length
          ) {
            resolve(null);

            return;
          }


          fetchAdmissionDocuments(
            id,
            (
              docErr,
              documentResult
            ) => {

              const admission =
                admissionResult[0];


              if (docErr) {
                console.error(
                  "Fetch admission documents error:",
                  docErr
                );

                resolve({
                  ...admission,
                  documents: []
                });

                return;
              }


              const documents =
                Array.isArray(
                  documentResult
                )
                  ? documentResult.map(
                      (doc) => ({
                        ...doc,

                        filePath:
                          normalizeFilePath(
                            doc.filePath
                          )
                      })
                    )
                  : [];


              resolve({
                ...admission,
                documents
              });

            }
          );

        }
      );

    }
  );
};


/* =====================================================
   GET SINGLE ADMISSION DOCUMENT
===================================================== */

const getAdmissionDocumentById = (
  documentId
) => {
  return new Promise(
    (resolve, reject) => {

      fetchAdmissionDocumentById(
        documentId,
        (
          err,
          result
        ) => {

          if (err) {
            reject(err);

            return;
          }


          if (
            !result ||
            !result.length
          ) {
            resolve(null);

            return;
          }


          resolve(
            result[0]
          );

        }
      );

    }
  );
};


/* =====================================================
   CHANGE ADMISSION STATUS
===================================================== */

const changeAdmissionStatus = (
  id,
  status
) => {
  return new Promise(
    (resolve, reject) => {

      fetchAdmissionById(
        id,
        (
          findErr,
          admissionResult
        ) => {

          if (findErr) {
            reject(findErr);

            return;
          }


          if (
            !admissionResult ||
            !admissionResult.length
          ) {
            resolve(null);

            return;
          }


          const admission =
            admissionResult[0];

          const previousStatus =
            admission.status;


          updateStatus(
            id,
            status,
            (updateErr) => {

              if (updateErr) {
                reject(
                  updateErr
                );

                return;
              }


              const updatedAdmission = {
                ...admission,

                id:
                  id,

                status:
                  status,

                previousStatus:
                  previousStatus,

                applicationNo:
                  getAdmissionApplicationNo(
                    admission
                  ),

                fullName:
                  getAdmissionFullName(
                    admission
                  ),

                courseName:
                  getAdmissionCourseName(
                    admission
                  )
              };


              resolve(
                updatedAdmission
              );

            }
          );

        }
      );

    }
  );
};


/* =====================================================
   DELETE ADMISSION
===================================================== */

const removeAdmission = (
  id
) => {
  return new Promise(
    (resolve, reject) => {

      deleteAdmission(
        id,
        (deleteErr, deleteResult) => {

          if (deleteErr) {
            reject(deleteErr);

            return;
          }


          if (
            !deleteResult ||
            deleteResult.affectedRows === 0
          ) {
            resolve(null);

            return;
          }


          resolve({
            id,
            affectedRows:
              deleteResult.affectedRows
          });

        }
      );

    }
  );
};


/* =====================================================
   EXPORTS
===================================================== */

module.exports = {
  saveAdmission,
  getAllAdmissions,
  getAdmissionDetails,
  getAdmissionDocumentById,
  changeAdmissionStatus,
  removeAdmission
};