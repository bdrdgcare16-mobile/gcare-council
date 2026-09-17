// const db = require("../config/db").promise();

// /* =====================================================
//    HELPER
// ===================================================== */

// function safeJsonParse(value) {
//   if (!value) {
//     return [];
//   }

//   if (typeof value === "object") {
//     return value;
//   }

//   try {
//     return JSON.parse(value);
//   } catch (error) {
//     return [];
//   }
// }

// /* =====================================================
//    AGE CALCULATION
// ===================================================== */

// function calculateAge(dateOfBirth) {
//   const dob =
//     new Date(
//       dateOfBirth + "T00:00:00"
//     );

//   const today =
//     new Date();

//   let age =
//     today.getFullYear() -
//     dob.getFullYear();

//   const monthDifference =
//     today.getMonth() -
//     dob.getMonth();

//   if (
//     monthDifference < 0 ||
//     (
//       monthDifference === 0 &&
//       today.getDate() <
//       dob.getDate()
//     )
//   ) {
//     age--;
//   }

//   return age;
// }

// /* =====================================================
//    CREATE INTERNSHIP APPLICATION
// ===================================================== */

// const createInternship =
// async (req, res) => {

//   try {

//     const {
//       enrolmentNumber,
//       centreCode,
//       studentName,
//       fatherName,
//       sex,
//       dateOfBirth,
//       address,
//       pinCode,
//       phoneNumber,
//       email,
//       employmentDetails
//     } = req.body;


//     /* ===============================================
//        REQUIRED FIELD VALIDATION
//     =============================================== */

//     if (
//       !enrolmentNumber ||
//       !enrolmentNumber.trim()
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Enrolment Number is required."
//         });
//     }


//     if (
//       !centreCode ||
//       !centreCode.trim()
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Centre Code is required."
//         });
//     }


//     if (
//       !studentName ||
//       !studentName.trim()
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Student Name is required."
//         });
//     }


//     if (
//       !fatherName ||
//       !fatherName.trim()
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Father's Name is required."
//         });
//     }


//     if (
//       !["Male", "Female"].includes(
//         sex
//       )
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Please select a valid sex."
//         });
//     }


//     if (!dateOfBirth) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Date of Birth is required."
//         });
//     }


//     if (
//       !address ||
//       !address.trim()
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Address is required."
//         });
//     }


//     /* ===============================================
//        DOB AGE VALIDATION
//        ALLOWED: 15 TO 20
//     =============================================== */

//     const age =
//       calculateAge(
//         dateOfBirth
//       );


//     if (
//       Number.isNaN(age) ||
//       age < 15 ||
//       age > 20
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Age must be between 15 and 20 years."
//         });
//     }


//     /* ===============================================
//        TAMIL NADU PIN VALIDATION
//        - 6 digits
//        - starts with 6
//     =============================================== */

//     const pin =
//       String(
//         pinCode || ""
//       ).trim();


//     if (
//       !/^6[0-9]{5}$/.test(
//         pin
//       )
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Enter a valid 6-digit Tamil Nadu Pin Code starting with 6."
//         });
//     }


//     /* ===============================================
//        INDIAN MOBILE VALIDATION
//     =============================================== */

//     const phone =
//       String(
//         phoneNumber || ""
//       ).trim();


//     if (
//       !/^[6-9][0-9]{9}$/.test(
//         phone
//       )
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Enter a valid 10-digit Indian mobile number."
//         });
//     }


//     /* Reject repeated numbers */

//     if (
//       /^(\d)\1{9}$/.test(
//         phone
//       )
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Repeated digits are not accepted as a valid mobile number."
//         });
//     }


//     const blockedNumbers = [
//       "1234567890",
//       "9876543210"
//     ];


//     if (
//       blockedNumbers.includes(
//         phone
//       )
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Enter a valid Indian mobile number."
//         });
//     }


//     /* ===============================================
//        EMAIL VALIDATION
//     =============================================== */

//     const normalizedEmail =
//       String(
//         email || ""
//       ).trim();


//     if (!normalizedEmail) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Email ID is required."
//         });
//     }


//     /*
//       Lowercase only
//     */

//     if (
//       /[A-Z]/.test(
//         normalizedEmail
//       )
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Capital letters are not allowed in Email ID."
//         });
//     }


//     /*
//       Only:
//       letters
//       numbers
//       @
//       .
//     */

//     if (
//       /[^a-z0-9@.]/.test(
//         normalizedEmail
//       )
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Only letters, numbers, @ and . are allowed in Email ID."
//         });
//     }


//     const atCount =
//       (
//         normalizedEmail.match(
//           /@/g
//         ) || []
//       ).length;


//     if (
//       atCount !== 1
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Email ID must contain exactly one @ symbol."
//         });
//     }


//     const emailPattern =
//       /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/;


//     if (
//       !emailPattern.test(
//         normalizedEmail
//       )
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Enter a valid Email ID."
//         });
//     }


//     /* ===============================================
//        CANDIDATE SIGNATURE
//     =============================================== */

//     let candidateSignature =
//       null;


//     if (
//       req.file
//     ) {
//       candidateSignature =
//         `/uploads/internships/${req.file.filename}`;
//     }


//     if (
//       !candidateSignature
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message:
//             "Candidate Signature is required."
//         });
//     }


//     const parsedEmploymentDetails =
//       safeJsonParse(
//         employmentDetails
//       );


//     const sql = `
//       INSERT INTO internship_applications
//       (
//         enrolment_number,
//         centre_code,
//         student_name,
//         father_name,
//         sex,
//         date_of_birth,
//         address,
//         pin_code,
//         phone_number,
//         email,
//         employment_details,
//         candidate_signature,
//         status
//       )
//       VALUES
//       (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;


//     const values = [
//       enrolmentNumber.trim(),
//       centreCode.trim(),
//       studentName.trim(),
//       fatherName.trim(),
//       sex,
//       dateOfBirth,
//       address.trim(),
//       pin,
//       phone,
//       normalizedEmail,
//       JSON.stringify(
//         parsedEmploymentDetails
//       ),
//       candidateSignature,
//       "Pending"
//     ];


//     const [result] =
//       await db.execute(
//         sql,
//         values
//       );


//     const [rows] =
//       await db.execute(
//         `
//         SELECT *
//         FROM internship_applications
//         WHERE id = ?
//         `,
//         [
//           result.insertId
//         ]
//       );


//     const application =
//       rows[0];


//     if (
//       application &&
//       typeof application.employment_details ===
//       "string"
//     ) {
//       application.employment_details =
//         safeJsonParse(
//           application.employment_details
//         );
//     }


//     return res
//       .status(201)
//       .json({
//         success: true,

//         message:
//           "Internship application submitted successfully.",

//         data:
//           application
//       });


//   } catch (error) {

//     console.error(
//       "CREATE INTERNSHIP ERROR:",
//       error
//     );


//     return res
//       .status(500)
//       .json({
//         success: false,

//         message:
//           "Unable to submit internship application.",

//         error:
//           error.message
//       });

//   }

// };


// /* =====================================================
//    GET ALL INTERNSHIPS
// ===================================================== */

// const getAllInternships =
// async (req, res) => {

//   try {

//     const [rows] =
//       await db.execute(
//         `
//         SELECT *
//         FROM internship_applications
//         ORDER BY id DESC
//         `
//       );


//     const data =
//       rows.map(
//         function (row) {

//           if (
//             typeof row.employment_details ===
//             "string"
//           ) {
//             row.employment_details =
//               safeJsonParse(
//                 row.employment_details
//               );
//           }

//           return row;

//         }
//       );


//     return res
//       .status(200)
//       .json({
//         success: true,

//         count:
//           data.length,

//         data
//       });


//   } catch (error) {

//     console.error(
//       "GET INTERNSHIPS ERROR:",
//       error
//     );


//     return res
//       .status(500)
//       .json({
//         success: false,

//         message:
//           "Unable to fetch internship applications."
//       });

//   }

// };


// /* =====================================================
//    GET INTERNSHIP BY ID
// ===================================================== */

// const getInternshipById =
// async (req, res) => {

//   try {

//     const {
//       id
//     } = req.params;


//     const [rows] =
//       await db.execute(
//         `
//         SELECT *
//         FROM internship_applications
//         WHERE id = ?
//         LIMIT 1
//         `,
//         [id]
//       );


//     if (
//       !rows.length
//     ) {
//       return res
//         .status(404)
//         .json({
//           success: false,

//           message:
//             "Internship application not found."
//         });
//     }


//     const application =
//       rows[0];


//     if (
//       typeof application.employment_details ===
//       "string"
//     ) {
//       application.employment_details =
//         safeJsonParse(
//           application.employment_details
//         );
//     }


//     return res
//       .status(200)
//       .json({
//         success: true,

//         data:
//           application
//       });


//   } catch (error) {

//     console.error(
//       "GET INTERNSHIP ERROR:",
//       error
//     );


//     return res
//       .status(500)
//       .json({
//         success: false,

//         message:
//           "Unable to fetch internship application."
//       });

//   }

// };


// /* =====================================================
//    UPDATE INTERNSHIP STATUS
// ===================================================== */

// const updateInternshipStatus =
// async (req, res) => {

//   try {

//     const {
//       id
//     } = req.params;


//     const {
//       status
//     } = req.body;


//     const validStatuses = [
//       "Pending",
//       "Approved",
//       "Rejected"
//     ];


//     if (
//       !validStatuses.includes(
//         status
//       )
//     ) {
//       return res
//         .status(400)
//         .json({
//           success: false,

//           message:
//             "Invalid status."
//         });
//     }


//     const [result] =
//       await db.execute(
//         `
//         UPDATE internship_applications
//         SET status = ?
//         WHERE id = ?
//         `,
//         [
//           status,
//           id
//         ]
//       );


//     if (
//       result.affectedRows === 0
//     ) {
//       return res
//         .status(404)
//         .json({
//           success: false,

//           message:
//             "Internship application not found."
//         });
//     }


//     return res
//       .status(200)
//       .json({
//         success: true,

//         message:
//           "Internship application status updated successfully."
//       });


//   } catch (error) {

//     console.error(
//       "UPDATE STATUS ERROR:",
//       error
//     );


//     return res
//       .status(500)
//       .json({
//         success: false,

//         message:
//           "Unable to update internship status."
//       });

//   }

// };


// /* =====================================================
//    DELETE INTERNSHIP
// ===================================================== */

// const deleteInternship =
// async (req, res) => {

//   try {

//     const {
//       id
//     } = req.params;


//     const [result] =
//       await db.execute(
//         `
//         DELETE
//         FROM internship_applications
//         WHERE id = ?
//         `,
//         [id]
//       );


//     if (
//       result.affectedRows === 0
//     ) {
//       return res
//         .status(404)
//         .json({
//           success: false,

//           message:
//             "Internship application not found."
//         });
//     }


//     return res
//       .status(200)
//       .json({
//         success: true,

//         message:
//           "Internship application deleted successfully."
//       });


//   } catch (error) {

//     console.error(
//       "DELETE INTERNSHIP ERROR:",
//       error
//     );


//     return res
//       .status(500)
//       .json({
//         success: false,

//         message:
//           "Unable to delete internship application."
//       });

//   }

// };


// /* =====================================================
//    EXPORT
// ===================================================== */

// module.exports = {
//   createInternship,
//   getAllInternships,
//   getInternshipById,
//   updateInternshipStatus,
//   deleteInternship
// };


const db =
  require("../config/db").promise();


const {
  sendInternshipUserEmail,
  sendInternshipAdminEmail,
  sendInternshipStatusUserEmail,
  sendInternshipStatusAdminEmail
} =
  require(
    "../services/internshipEmailService"
  );


/* =====================================================
   JSON HELPER
===================================================== */

function safeJsonParse(
  value
) {
  if (!value) {
    return [];
  }

  if (
    typeof value ===
    "object"
  ) {
    return value;
  }

  try {
    return JSON.parse(
      value
    );
  } catch (error) {
    return [];
  }
}


/* =====================================================
   AGE CALCULATION
===================================================== */

function calculateAge(
  dateOfBirth
) {
  const dob =
    new Date(
      dateOfBirth +
      "T00:00:00"
    );

  const today =
    new Date();

  let age =
    today.getFullYear() -
    dob.getFullYear();

  const monthDifference =
    today.getMonth() -
    dob.getMonth();

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() <
      dob.getDate()
    )
  ) {
    age--;
  }

  return age;
}


/* =====================================================
   SEND SUBMISSION EMAILS
===================================================== */

async function sendInternshipSubmissionEmails(
  application
) {
  const results =
    await Promise.allSettled([
      sendInternshipUserEmail(
        application
      ),

      sendInternshipAdminEmail(
        application
      )
    ]);

  const userResult =
    results[0];

  const adminResult =
    results[1];

  if (
    userResult.status ===
    "fulfilled"
  ) {
    console.log(
      "INTERNSHIP USER EMAIL SENT:",
      application.email
    );
  } else {
    console.error(
      "INTERNSHIP USER EMAIL FAILED:",
      userResult.reason
    );
  }

  if (
    adminResult.status ===
    "fulfilled"
  ) {
    console.log(
      "INTERNSHIP ADMIN EMAIL SENT:",
      process.env.ADMIN_EMAIL ||
      "info@gcarecouncil.in"
    );
  } else {
    console.error(
      "INTERNSHIP ADMIN EMAIL FAILED:",
      adminResult.reason
    );
  }

  return {
    userEmailSent:
      userResult.status ===
      "fulfilled",

    adminEmailSent:
      adminResult.status ===
      "fulfilled"
  };
}


/* =====================================================
   SEND STATUS EMAILS
===================================================== */

async function sendInternshipStatusEmails(
  application
) {
  const results =
    await Promise.allSettled([
      sendInternshipStatusUserEmail(
        application
      ),

      sendInternshipStatusAdminEmail(
        application
      )
    ]);

  const userResult =
    results[0];

  const adminResult =
    results[1];

  if (
    userResult.status ===
    "fulfilled"
  ) {
    console.log(
      `INTERNSHIP ${application.status} USER EMAIL SENT:`,
      application.email
    );
  } else {
    console.error(
      `INTERNSHIP ${application.status} USER EMAIL FAILED:`,
      userResult.reason
    );
  }

  if (
    adminResult.status ===
    "fulfilled"
  ) {
    console.log(
      `INTERNSHIP ${application.status} ADMIN EMAIL SENT:`,
      process.env.ADMIN_EMAIL ||
      "info@gcarecouncil.in"
    );
  } else {
    console.error(
      `INTERNSHIP ${application.status} ADMIN EMAIL FAILED:`,
      adminResult.reason
    );
  }

  return {
    userEmailSent:
      userResult.status ===
      "fulfilled",

    adminEmailSent:
      adminResult.status ===
      "fulfilled"
  };
}


/* =====================================================
   CREATE INTERNSHIP
===================================================== */

const createInternship =
async (
  req,
  res
) => {
  try {
    const {
      enrolmentNumber,
      centreCode,
      studentName,
      fatherName,
      sex,
      dateOfBirth,
      address,
      pinCode,
      phoneNumber,
      email,
      employmentDetails
    } =
      req.body;


    if (
      !enrolmentNumber ||
      !enrolmentNumber.trim()
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Enrolment Number is required."
        });
    }


    if (
      !centreCode ||
      !centreCode.trim()
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Centre Code is required."
        });
    }


    if (
      !studentName ||
      !studentName.trim()
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Student Name is required."
        });
    }


    if (
      !fatherName ||
      !fatherName.trim()
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Father's Name is required."
        });
    }


    if (
      ![
        "Male",
        "Female"
      ].includes(
        sex
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Please select a valid sex."
        });
    }


    if (!dateOfBirth) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Date of Birth is required."
        });
    }


    if (
      !address ||
      !address.trim()
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Address is required."
        });
    }


    const age =
      calculateAge(
        dateOfBirth
      );


    if (
      Number.isNaN(age) ||
      age < 15 ||
      age > 20
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Age must be between 15 and 20 years."
        });
    }


    const pin =
      String(
        pinCode || ""
      ).trim();


    if (
      !/^6[0-9]{5}$/.test(
        pin
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Enter a valid 6-digit Tamil Nadu Pin Code starting with 6."
        });
    }


    const phone =
      String(
        phoneNumber || ""
      ).trim();


    if (
      !/^[6-9][0-9]{9}$/.test(
        phone
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Enter a valid 10-digit Indian mobile number."
        });
    }


    if (
      /^(\d)\1{9}$/.test(
        phone
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Repeated digits are not accepted as a valid mobile number."
        });
    }


    const blockedNumbers = [
      "1234567890",
      "9876543210"
    ];


    if (
      blockedNumbers.includes(
        phone
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Enter a valid Indian mobile number."
        });
    }


    const normalizedEmail =
      String(
        email || ""
      ).trim();


    if (!normalizedEmail) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Email ID is required."
        });
    }


    if (
      /[A-Z]/.test(
        normalizedEmail
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Capital letters are not allowed in Email ID."
        });
    }


    if (
      /[^a-z0-9@.]/.test(
        normalizedEmail
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Only letters, numbers, @ and . are allowed in Email ID."
        });
    }


    const atCount =
      (
        normalizedEmail.match(
          /@/g
        ) || []
      ).length;


    if (
      atCount !== 1
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Email ID must contain exactly one @ symbol."
        });
    }


    const emailPattern =
      /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/;


    if (
      !emailPattern.test(
        normalizedEmail
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Enter a valid Email ID."
        });
    }


    let candidateSignature =
      null;


    if (
      req.file
    ) {
      candidateSignature =
        `/uploads/internships/${req.file.filename}`;
    }


    if (
      !candidateSignature
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Candidate Signature is required."
        });
    }


    const parsedEmploymentDetails =
      safeJsonParse(
        employmentDetails
      );


    const sql = `
      INSERT INTO internship_applications
      (
        enrolment_number,
        centre_code,
        student_name,
        father_name,
        sex,
        date_of_birth,
        address,
        pin_code,
        phone_number,
        email,
        employment_details,
        candidate_signature,
        status
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const values = [
      enrolmentNumber.trim(),
      centreCode.trim(),
      studentName.trim(),
      fatherName.trim(),
      sex,
      dateOfBirth,
      address.trim(),
      pin,
      phone,
      normalizedEmail,
      JSON.stringify(
        parsedEmploymentDetails
      ),
      candidateSignature,
      "Pending"
    ];


    const [result] =
      await db.execute(
        sql,
        values
      );


    const [rows] =
      await db.execute(
        `
          SELECT *
          FROM internship_applications
          WHERE id = ?
          LIMIT 1
        `,
        [
          result.insertId
        ]
      );


    const application =
      rows[0];


    if (!application) {
      throw new Error(
        "Internship application was saved but could not be retrieved."
      );
    }


    if (
      typeof application
        .employment_details ===
      "string"
    ) {
      application.employment_details =
        safeJsonParse(
          application
            .employment_details
        );
    }


    let emailStatus = {
      userEmailSent:
        false,

      adminEmailSent:
        false
    };


    try {
      emailStatus =
        await sendInternshipSubmissionEmails(
          application
        );
    } catch (emailError) {
      console.error(
        "INTERNSHIP EMAIL PROCESS ERROR:",
        emailError
      );
    }


    return res
      .status(201)
      .json({
        success:
          true,

        message:
          "Internship application submitted successfully.",

        email: {
          userEmailSent:
            emailStatus.userEmailSent,

          adminEmailSent:
            emailStatus.adminEmailSent
        },

        data:
          application
      });

  } catch (error) {
    console.error(
      "CREATE INTERNSHIP ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success:
          false,

        message:
          "Unable to submit internship application.",

        error:
          error.message
      });
  }
};


/* =====================================================
   GET ALL INTERNSHIPS
===================================================== */

const getAllInternships =
async (
  req,
  res
) => {
  try {
    const [rows] =
      await db.execute(
        `
          SELECT *
          FROM internship_applications
          ORDER BY id DESC
        `
      );

    const data =
      rows.map(
        function (row) {
          if (
            typeof row
              .employment_details ===
            "string"
          ) {
            row.employment_details =
              safeJsonParse(
                row.employment_details
              );
          }

          return row;
        }
      );

    return res
      .status(200)
      .json({
        success: true,
        count: data.length,
        data
      });

  } catch (error) {
    console.error(
      "GET INTERNSHIPS ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,
        message:
          "Unable to fetch internship applications."
      });
  }
};


/* =====================================================
   GET INTERNSHIP BY ID
===================================================== */

const getInternshipById =
async (
  req,
  res
) => {
  try {
    const {
      id
    } =
      req.params;

    const [rows] =
      await db.execute(
        `
          SELECT *
          FROM internship_applications
          WHERE id = ?
          LIMIT 1
        `,
        [
          id
        ]
      );

    if (
      !rows.length
    ) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Internship application not found."
        });
    }

    const application =
      rows[0];

    if (
      typeof application
        .employment_details ===
      "string"
    ) {
      application.employment_details =
        safeJsonParse(
          application
            .employment_details
        );
    }

    return res
      .status(200)
      .json({
        success: true,
        data: application
      });

  } catch (error) {
    console.error(
      "GET INTERNSHIP ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,
        message:
          "Unable to fetch internship application."
      });
  }
};


/* =====================================================
   UPDATE INTERNSHIP STATUS
===================================================== */

const updateInternshipStatus =
async (
  req,
  res
) => {
  try {
    const {
      id
    } =
      req.params;

    const {
      status
    } =
      req.body;

    const validStatuses = [
      "Pending",
      "Approved",
      "Rejected"
    ];


    if (
      !validStatuses.includes(
        status
      )
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Invalid status."
        });
    }


    const [existingRows] =
      await db.execute(
        `
          SELECT *
          FROM internship_applications
          WHERE id = ?
          LIMIT 1
        `,
        [
          id
        ]
      );


    if (
      !existingRows.length
    ) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Internship application not found."
        });
    }


    const existingApplication =
      existingRows[0];


    if (
      existingApplication.status ===
      status
    ) {
      return res
        .status(200)
        .json({
          success: true,

          message:
            `Internship application is already ${status}.`,

          email: {
            userEmailSent: false,
            adminEmailSent: false
          },

          data:
            existingApplication
        });
    }


    await db.execute(
      `
        UPDATE internship_applications
        SET status = ?
        WHERE id = ?
      `,
      [
        status,
        id
      ]
    );


    const [updatedRows] =
      await db.execute(
        `
          SELECT *
          FROM internship_applications
          WHERE id = ?
          LIMIT 1
        `,
        [
          id
        ]
      );


    if (
      !updatedRows.length
    ) {
      throw new Error(
        "Updated internship application could not be retrieved."
      );
    }


    const application =
      updatedRows[0];


    if (
      typeof application
        .employment_details ===
      "string"
    ) {
      application.employment_details =
        safeJsonParse(
          application
            .employment_details
        );
    }


    let emailStatus = {
      userEmailSent:
        false,

      adminEmailSent:
        false
    };


    if (
      status === "Approved" ||
      status === "Rejected"
    ) {
      try {
        emailStatus =
          await sendInternshipStatusEmails(
            application
          );
      } catch (emailError) {
        console.error(
          "INTERNSHIP STATUS EMAIL ERROR:",
          emailError
        );
      }
    }


    return res
      .status(200)
      .json({
        success:
          true,

        message:
          status === "Approved"
            ? "Internship application approved successfully."
            : status === "Rejected"
              ? "Internship application rejected successfully."
              : "Internship application status updated successfully.",

        email: {
          userEmailSent:
            emailStatus.userEmailSent,

          adminEmailSent:
            emailStatus.adminEmailSent
        },

        data:
          application
      });

  } catch (error) {
    console.error(
      "UPDATE INTERNSHIP STATUS ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,
        message:
          "Unable to update internship status.",
        error:
          error.message
      });
  }
};


/* =====================================================
   DELETE INTERNSHIP
===================================================== */

const deleteInternship =
async (
  req,
  res
) => {
  try {
    const {
      id
    } =
      req.params;

    const [result] =
      await db.execute(
        `
          DELETE
          FROM internship_applications
          WHERE id = ?
        `,
        [
          id
        ]
      );

    if (
      result.affectedRows ===
      0
    ) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Internship application not found."
        });
    }

    return res
      .status(200)
      .json({
        success: true,
        message:
          "Internship application deleted successfully."
      });

  } catch (error) {
    console.error(
      "DELETE INTERNSHIP ERROR:",
      error
    );

    return res
      .status(500)
      .json({
        success: false,
        message:
          "Unable to delete internship application."
      });
  }
};


/* =====================================================
   EXPORT
===================================================== */

module.exports = {
  createInternship,
  getAllInternships,
  getInternshipById,
  updateInternshipStatus,
  deleteInternship
};