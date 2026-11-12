// const {
//   saveAdmission,
//   getAllAdmissions,
//   getAdmissionDetails,
//   changeAdmissionStatus
// } = require("../services/admissionService");

// const createAdmission = async (req, res) => {
//   try {
//     const result = await saveAdmission(req.body, req.files);

//     res.status(201).json({
//       success: true,
//       message: "Admission form submitted successfully. Admin notification email sent.",
//       data: result
//     });
//   } catch (error) {
//     console.error("Admission submit error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to submit admission form."
//     });
//   }
// };

// const getAdmissions = async (req, res) => {
//   try {
//     const admissions = await getAllAdmissions();

//     res.status(200).json({
//       success: true,
//       data: admissions
//     });
//   } catch (error) {
//     console.error("Fetch admissions error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch admission forms."
//     });
//   }
// };

// const getAdmissionById = async (req, res) => {
//   try {
//     const admission = await getAdmissionDetails(req.params.id);

//     if (!admission) {
//       return res.status(404).json({
//         success: false,
//         message: "Admission form not found."
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: admission
//     });
//   } catch (error) {
//     console.error("Fetch admission details error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch admission details."
//     });
//   }
// };

// const updateAdmissionStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!["Pending", "Approved", "Rejected"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status value."
//       });
//     }

//     const result = await changeAdmissionStatus(req.params.id, status);

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "Admission form not found."
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message:
//         status === "Approved"
//           ? "Admission approved and email sent to user."
//           : status === "Rejected"
//           ? "Admission rejected and email sent to user."
//           : "Admission status updated successfully.",
//       data: result
//     });
//   } catch (error) {
//     console.error("Update admission status error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to update admission status."
//     });
//   }
// };

// module.exports = {
//   createAdmission,
//   getAdmissions,
//   getAdmissionById,
//   updateAdmissionStatus
// };

const path = require("path");
const fs = require("fs");

const {
  saveAdmission,
  getAllAdmissions,
  getAdmissionDetails,
  getAdmissionDocumentById,
  changeAdmissionStatus,
  removeAdmission
} = require("../services/admissionService");

const {
  getDriveFileStream
} = require("../services/driveService");

const debugLog =
  require("../utils/debugLog");

const {
  sendAdminAdmissionNotification,
  sendAdminAdmissionApprovalNotification,
  sendAdmissionStatusEmail
} = require("../services/admissionEmailService");


/* =====================================================
   CREATE ADMISSION
===================================================== */

const createAdmission = async (req, res) => {
  try {
    debugLog(
      "ADMISSION REQUEST BODY:",
      req.body
    );

    debugLog(
      "ADMISSION REQUEST FILES:",
      req.files
        ? Object.keys(req.files)
        : []
    );

    const result =
      await saveAdmission(
        req.body,
        req.files
      );


    /* ---------------------------------------------
       SEND ADMIN EMAIL
       Do not fail admission if email fails.
    --------------------------------------------- */

    let adminEmailSent = false;

    try {
      await sendAdminAdmissionNotification({
        ...result,

        applicationNo:
          result.applicationNo ||
          req.body.applicationNo,

        fullName:
          result.fullName ||
          req.body.fullName,

        courseName:
          result.courseName ||
          req.body.courseName,

        mobile:
          result.mobile ||
          req.body.mobile,

        email:
          result.email ||
          req.body.email,

        academicLevel:
          result.academicLevel ||
          req.body.academicLevel,

        state:
          result.state ||
          req.body.state,

        district:
          result.district ||
          req.body.district
      });

      adminEmailSent = true;

      console.log(
        "Admin admission notification email sent successfully."
      );

    } catch (emailError) {
      console.error(
        "Admin admission notification email failed:",
        emailError
      );
    }


    result.adminEmailSent = adminEmailSent;


    return res.status(201).json({
      success: true,

      message:
        "Admission form submitted successfully.",

      data: result
    });

  } catch (error) {
    console.error(
      "Admission submit error:",
      error
    );


    if (
      error.message &&
      (
        error.message.includes(
          "Photo upload is required"
        ) ||

        error.message.includes(
          "Aadhaar card upload is required"
        ) ||

        error.message.includes(
          "Education certificate upload is required"
        ) ||

        error.message.includes(
          "Parent signature upload is required"
        ) ||

        error.message.includes(
          "Please select a valid Branch Name"
        ) ||

        error.message.includes(
          "Please select a valid Branch Category"
        )
      )
    ) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }


    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to submit admission form."
    });
  }
};


/* =====================================================
   GET ALL ADMISSIONS
===================================================== */

const getAdmissions = async (req, res) => {
  try {
    const admissions =
      await getAllAdmissions();

    return res.status(200).json({
      success: true,
      data: admissions
    });

  } catch (error) {
    console.error(
      "Fetch admissions error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch admission forms."
    });
  }
};


/* =====================================================
   GET ADMISSION BY ID
===================================================== */

const getAdmissionById = async (
  req,
  res
) => {
  try {
    const admission =
      await getAdmissionDetails(
        req.params.id
      );

    if (!admission) {
      return res.status(404).json({
        success: false,
        message:
          "Admission form not found."
      });
    }

    return res.status(200).json({
      success: true,
      data: admission
    });

  } catch (error) {
    console.error(
      "Fetch admission details error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch admission details."
    });
  }
};


/* =====================================================
   UPDATE ADMISSION STATUS
===================================================== */

const updateAdmissionStatus = async (
  req,
  res
) => {
  try {
    const {
      status
    } = req.body;


    if (
      ![
        "Pending",
        "Approved",
        "Rejected"
      ].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid status value."
      });
    }


    const result =
      await changeAdmissionStatus(
        req.params.id,
        status
      );


    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Admission form not found."
      });
    }


    /* ---------------------------------------------
       SEND STATUS EMAIL
       Approval emails are sent only when the
       status changes from Pending to Approved,
       and only once. Email failures are logged
       but do not affect the database status.
    --------------------------------------------- */

    let applicantEmailSent = false;

    const isApprovingFromPending =
      status === "Approved" &&
      String(result.previousStatus).toLowerCase() === "pending";

    if (
      result.email &&
      result.previousStatus !== status &&
      (status === "Approved" ||
        status === "Rejected")
    ) {
      if (isApprovingFromPending || status === "Rejected") {
        try {
          await sendAdmissionStatusEmail(
            result,
            status
          );

          applicantEmailSent = true;

          console.log(
            "Admission status email sent successfully."
          );

        } catch (emailError) {
          console.error(
            "Admission status email failed:",
            emailError
          );
        }
      } else {
        console.log(
          "Approval email skipped: application was not previously Pending or is already approved."
        );
      }
    } else {
      console.log(
        "Admission status email skipped: no email address, no status change, or not Approved/Rejected."
      );
    }

    if (isApprovingFromPending) {
      try {
        await sendAdminAdmissionApprovalNotification(result);

        console.log(
          "Admin admission approval notification email sent successfully."
        );

      } catch (adminEmailError) {
        console.error(
          "Admin admission approval notification email failed:",
          adminEmailError
        );
      }
    }


    result.applicantEmailSent = applicantEmailSent;


    return res.status(200).json({
      success: true,

      message:
        status === "Approved"
          ? "Admission approved successfully."
          : status === "Rejected"
          ? "Admission rejected successfully."
          : "Admission status updated successfully.",

      data: result
    });

  } catch (error) {
    console.error(
      "Update admission status error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to update admission status."
    });
  }
};


/* =====================================================
   DELETE ADMISSION
===================================================== */

const deleteAdmission = async (
  req,
  res
) => {
  try {
    const result =
      await removeAdmission(
        req.params.id
      );

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Admission not found"
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Admission deleted successfully"
    });

  } catch (error) {
    console.error(
      "Delete admission error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete admission application."
    });
  }
};


/* =====================================================
   STREAM ADMISSION DOCUMENT

   GET /api/admissions/documents/:documentId/file

   - "drive:<fileId>" references are streamed
     from Google Drive through the backend, so
     private student documents are never exposed
     through public Drive links.
   - Legacy local file paths under uploads/ are
     still served for historical records.
===================================================== */

const streamAdmissionDocument = async (
  req,
  res
) => {
  try {
    const documentId =
      Number(req.params.documentId);

    if (
      !Number.isInteger(documentId) ||
      documentId <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid document id."
      });
    }

    const document =
      await getAdmissionDocumentById(
        documentId
      );

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found."
      });
    }

    const filePath =
      String(document.filePath || "");

    const fileName =
      String(
        document.fileName || "document"
      ).replace(/"/g, "");

    /* ---------------------------------------------
       GOOGLE DRIVE FILE
    --------------------------------------------- */

    if (filePath.startsWith("drive:")) {
      const fileId = filePath.slice(6);

      const driveFile =
        await getDriveFileStream(fileId);

      /*
        Some historical Drive uploads committed a
        file record without any content (0 bytes).
        Streaming it would produce an empty PDF
        viewer, so report a clear error instead.
      */
      if (
        driveFile.size !== undefined &&
        Number(driveFile.size) === 0
      ) {
        return res.status(410).json({
          success: false,
          message:
            "This file was not stored correctly " +
            "(empty upload). Please ask the student " +
            "to submit the document again."
        });
      }

      res.setHeader(
        "Content-Type",
        document.mimeType ||
          driveFile.mimeType ||
          "application/octet-stream"
      );

      res.setHeader(
        "Content-Disposition",
        `inline; filename="${fileName}"`
      );

      driveFile.stream.on(
        "error",
        () => {
          if (!res.headersSent) {
            res.status(500).end();
          } else {
            res.destroy();
          }
        }
      );

      driveFile.stream.pipe(res);

      return;
    }

    /* ---------------------------------------------
       LEGACY LOCAL FILE
    --------------------------------------------- */

    const normalizedPath =
      filePath.replace(/\\/g, "/");

    const uploadsIndex =
      normalizedPath.indexOf("uploads/");

    const relativePath =
      uploadsIndex !== -1
        ? normalizedPath.substring(
            uploadsIndex + "uploads/".length
          )
        : path.basename(normalizedPath);

    const uploadsRoot = path.resolve(
      process.cwd(),
      "uploads"
    );

    const localPath = path.resolve(
      uploadsRoot,
      relativePath
    );

    if (
      !localPath.startsWith(
        uploadsRoot + path.sep
      ) ||
      !fs.existsSync(localPath)
    ) {
      return res.status(404).json({
        success: false,
        message:
          "File is no longer available on the server."
      });
    }

    if (
      fs.statSync(localPath).size === 0
    ) {
      return res.status(410).json({
        success: false,
        message:
          "This file was not stored correctly " +
          "(empty upload). Please ask the student " +
          "to submit the document again."
      });
    }

    res.setHeader(
      "Content-Type",
      document.mimeType ||
        "application/octet-stream"
    );

    return res.sendFile(localPath);

  } catch (error) {
    console.error(
      "Stream admission document error:",
      error.message
    );

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to load document."
      });
    }
  }
};


module.exports = {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
  deleteAdmission,
  streamAdmissionDocument
};