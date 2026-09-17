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

const {
  saveAdmission,
  getAllAdmissions,
  getAdmissionDetails,
  changeAdmissionStatus,
  removeAdmission
} = require("../services/admissionService");

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
    console.log(
      "ADMISSION REQUEST BODY:",
      req.body
    );

    console.log(
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


module.exports = {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
  deleteAdmission
};