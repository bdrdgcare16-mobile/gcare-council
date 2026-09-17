// const express = require("express");
// const router = express.Router();

// const { sendOtpEmail } = require("../services/emailService");
// const db = require("../models");

// const OTP_EXPIRY_TIME = 5 * 60 * 1000;

// /* ---------------------------------------
//    GENERATE 6-DIGIT OTP
// --------------------------------------- */
// const generateOtp = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };

// /* ---------------------------------------
//    VALIDATION FUNCTIONS
// --------------------------------------- */
// const normalizeEmail = (email) => {
//   return String(email || "").trim().toLowerCase();
// };

// const normalizeMobile = (mobile) => {
//   return String(mobile || "").replace(/\D/g, "").trim();
// };

// const normalizeOtp = (otp) => {
//   return String(otp || "").replace(/\D/g, "").trim();
// };

// const isValidEmail = (email) => {
//   return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email);
// };

// const isValidMobile = (mobile) => {
//   return /^[6-9][0-9]{9}$/.test(mobile);
// };

// const isValidOtp = (otp) => {
//   return /^[0-9]{6}$/.test(otp);
// };

// /* ---------------------------------------
//    ADD COLUMN IF IT DOES NOT EXIST
// --------------------------------------- */
// async function addColumnIfNotExists(
//   tableName,
//   columnName,
//   columnDefinition
// ) {
//   try {
//     await db.sequelize.query(`
//       ALTER TABLE ${tableName}
//       ADD COLUMN ${columnName} ${columnDefinition}
//     `);
//   } catch (error) {
//     if (error?.parent?.code !== "ER_DUP_FIELDNAME") {
//       throw error;
//     }
//   }
// }

// /* ---------------------------------------
//    CREATE OTP TABLE
// --------------------------------------- */
// async function createOtpTableIfNotExists() {
//   await db.sequelize.query(`
//     CREATE TABLE IF NOT EXISTS otps (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255) NULL,
//       mobile VARCHAR(20) NULL,
//       otp VARCHAR(10) NOT NULL,
//       expiresAt BIGINT NOT NULL,
//       isVerified BOOLEAN DEFAULT false,
//       otpType VARCHAR(30) DEFAULT 'email',
//       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//   `);

//   await addColumnIfNotExists(
//     "otps",
//     "email",
//     "VARCHAR(255) NULL"
//   );

//   await addColumnIfNotExists(
//     "otps",
//     "mobile",
//     "VARCHAR(20) NULL"
//   );

//   await addColumnIfNotExists(
//     "otps",
//     "isVerified",
//     "BOOLEAN DEFAULT false"
//   );

//   await addColumnIfNotExists(
//     "otps",
//     "otpType",
//     "VARCHAR(30) DEFAULT 'email'"
//   );
// }

// /* ---------------------------------------
//    SAVE OTP IN DATABASE
// --------------------------------------- */
// async function saveOtp({
//   email = null,
//   mobile = null,
//   otp,
//   otpType
// }) {
//   const expiresAt = Date.now() + OTP_EXPIRY_TIME;

//   await db.sequelize.query(
//     `
//       INSERT INTO otps
//       (
//         email,
//         mobile,
//         otp,
//         expiresAt,
//         isVerified,
//         otpType
//       )
//       VALUES (?, ?, ?, ?, false, ?)
//     `,
//     {
//       replacements: [
//         email,
//         mobile,
//         otp,
//         expiresAt,
//         otpType
//       ]
//     }
//   );
// }

// /* ---------------------------------------
//    GET LATEST EMAIL OTP
// --------------------------------------- */
// async function getLatestEmailOtp(email) {
//   const [rows] = await db.sequelize.query(
//     `
//       SELECT *
//       FROM otps
//       WHERE email = ?
//         AND otpType = 'email'
//       ORDER BY id DESC
//       LIMIT 1
//     `,
//     {
//       replacements: [email]
//     }
//   );

//   return rows && rows.length > 0 ? rows[0] : null;
// }

// /* ---------------------------------------
//    GET LATEST MOBILE OTP
// --------------------------------------- */
// async function getLatestMobileOtp(mobile) {
//   const [rows] = await db.sequelize.query(
//     `
//       SELECT *
//       FROM otps
//       WHERE mobile = ?
//         AND otpType = 'mobile'
//       ORDER BY id DESC
//       LIMIT 1
//     `,
//     {
//       replacements: [mobile]
//     }
//   );

//   return rows && rows.length > 0 ? rows[0] : null;
// }

// /* ---------------------------------------
//    MARK OTP AS VERIFIED
// --------------------------------------- */
// async function markOtpAsVerified(id) {
//   await db.sequelize.query(
//     `
//       UPDATE otps
//       SET isVerified = true
//       WHERE id = ?
//     `,
//     {
//       replacements: [id]
//     }
//   );
// }

// /* ---------------------------------------
//    SEND MOBILE OTP USING FAST2SMS
// --------------------------------------- */
// async function sendFast2SmsOtp(mobile, otp) {
//   const apiKey = process.env.FAST2SMS_API_KEY;
//   const route = process.env.FAST2SMS_ROUTE || "dlt";
//   const senderId = process.env.FAST2SMS_SENDER_ID;
//   const templateId = process.env.FAST2SMS_TEMPLATE_ID;

//   if (!apiKey) {
//     throw new Error(
//       "FAST2SMS_API_KEY is missing in the .env file."
//     );
//   }

//   if (!senderId) {
//     throw new Error(
//       "FAST2SMS_SENDER_ID is missing in the .env file."
//     );
//   }

//   if (!templateId) {
//     throw new Error(
//       "FAST2SMS_TEMPLATE_ID is missing in the .env file."
//     );
//   }

//   const params = new URLSearchParams({
//     authorization: apiKey,
//     route: route,
//     sender_id: senderId,
//     message: templateId,
//     variables_values: otp,
//     flash: "0",
//     numbers: mobile
//   });

//   const url =
//     `https://www.fast2sms.com/dev/bulkV2?${params.toString()}`;

//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       accept: "application/json"
//     }
//   });

//   let result;

//   try {
//     result = await response.json();
//   } catch (error) {
//     throw new Error(
//       "Fast2SMS returned an invalid response."
//     );
//   }

//   console.log("FAST2SMS RESPONSE:", result);

//   if (!response.ok || result?.return === false) {
//     const providerMessage = Array.isArray(result?.message)
//       ? result.message.join(", ")
//       : result?.message;

//     throw new Error(
//       providerMessage ||
//       "Failed to send the mobile OTP through Fast2SMS."
//     );
//   }

//   return result;
// }

// /* =====================================================
//    SEND EMAIL OTP
//    POST /api/send-email-otp
// ===================================================== */
// router.post("/send-email-otp", async (req, res) => {
//   try {
//     const email = normalizeEmail(req.body?.email);

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email address is required."
//       });
//     }

//     if (!isValidEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email address."
//       });
//     }

//     await createOtpTableIfNotExists();

//     const otp = generateOtp();

//     /*
//       First send the OTP.
//       Save it only after Brevo confirms that it was sent.
//     */
//     await sendOtpEmail(email, otp);

//     await saveOtp({
//       email: email,
//       mobile: null,
//       otp: otp,
//       otpType: "email"
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Email OTP sent successfully."
//     });
//   } catch (error) {
//     console.error("SEND EMAIL OTP ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message:
//         error.message ||
//         "Failed to send the email OTP."
//     });
//   }
// });

// /* =====================================================
//    VERIFY EMAIL OTP
//    POST /api/verify-email-otp
// ===================================================== */
// router.post("/verify-email-otp", async (req, res) => {
//   try {
//     const email = normalizeEmail(req.body?.email);
//     const otp = normalizeOtp(req.body?.otp);

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email address is required."
//       });
//     }

//     if (!isValidEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email address."
//       });
//     }

//     if (!otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Email OTP is required."
//       });
//     }

//     if (!isValidOtp(otp)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter the complete 6-digit email OTP."
//       });
//     }

//     await createOtpTableIfNotExists();

//     const record = await getLatestEmailOtp(email);

//     if (!record) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Email OTP was not found. Please send a new OTP."
//       });
//     }

//     if (record.isVerified) {
//       return res.status(200).json({
//         success: true,
//         message: "Email OTP is already verified."
//       });
//     }

//     if (Date.now() > Number(record.expiresAt)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Email OTP has expired. Please send a new OTP."
//       });
//     }

//     if (String(record.otp) !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email OTP."
//       });
//     }

//     await markOtpAsVerified(record.id);

//     return res.status(200).json({
//       success: true,
//       message: "Email OTP verified successfully."
//     });
//   } catch (error) {
//     console.error("VERIFY EMAIL OTP ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message:
//         error.message ||
//         "Failed to verify the email OTP."
//     });
//   }
// });

// /* =====================================================
//    SEND MOBILE OTP
//    POST /api/send-mobile-otp
// ===================================================== */
// router.post("/send-mobile-otp", async (req, res) => {
//   try {
//     const mobile = normalizeMobile(req.body?.mobile);

//     if (!mobile) {
//       return res.status(400).json({
//         success: false,
//         message: "Mobile number is required."
//       });
//     }

//     if (!isValidMobile(mobile)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9."
//       });
//     }

//     await createOtpTableIfNotExists();

//     const otp = generateOtp();

//     /*
//       First send the OTP.
//       Save it only after Fast2SMS confirms that it was sent.
//     */
//     await sendFast2SmsOtp(mobile, otp);

//     await saveOtp({
//       email: null,
//       mobile: mobile,
//       otp: otp,
//       otpType: "mobile"
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Mobile OTP sent successfully."
//     });
//   } catch (error) {
//     console.error("SEND MOBILE OTP ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message:
//         error.message ||
//         "Failed to send the mobile OTP."
//     });
//   }
// });

// /* =====================================================
//    VERIFY MOBILE OTP
//    POST /api/verify-mobile-otp
// ===================================================== */
// router.post("/verify-mobile-otp", async (req, res) => {
//   try {
//     const mobile = normalizeMobile(req.body?.mobile);
//     const otp = normalizeOtp(req.body?.otp);

//     if (!mobile) {
//       return res.status(400).json({
//         success: false,
//         message: "Mobile number is required."
//       });
//     }

//     if (!isValidMobile(mobile)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9."
//       });
//     }

//     if (!otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Mobile OTP is required."
//       });
//     }

//     if (!isValidOtp(otp)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please enter the complete 6-digit mobile OTP."
//       });
//     }

//     await createOtpTableIfNotExists();

//     const record = await getLatestMobileOtp(mobile);

//     if (!record) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Mobile OTP was not found. Please send a new OTP."
//       });
//     }

//     if (record.isVerified) {
//       return res.status(200).json({
//         success: true,
//         message: "Mobile OTP is already verified."
//       });
//     }

//     if (Date.now() > Number(record.expiresAt)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Mobile OTP has expired. Please send a new OTP."
//       });
//     }

//     if (String(record.otp) !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid mobile OTP."
//       });
//     }

//     await markOtpAsVerified(record.id);

//     return res.status(200).json({
//       success: true,
//       message: "Mobile OTP verified successfully."
//     });
//   } catch (error) {
//     console.error("VERIFY MOBILE OTP ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message:
//         error.message ||
//         "Failed to verify the mobile OTP."
//     });
//   }
// });

// /* =====================================================
//    OLD EMAIL ROUTE SUPPORT

//    These routes support older frontend code using:
//    /api/send-otp
//    /api/verify-otp
// ===================================================== */
// router.post("/send-otp", async (req, res) => {
//   try {
//     const email = normalizeEmail(req.body?.email);

//     if (!email || !isValidEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email address."
//       });
//     }

//     await createOtpTableIfNotExists();

//     const otp = generateOtp();

//     await sendOtpEmail(email, otp);

//     await saveOtp({
//       email: email,
//       mobile: null,
//       otp: otp,
//       otpType: "email"
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Email OTP sent successfully."
//     });
//   } catch (error) {
//     console.error("SEND OLD EMAIL OTP ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message:
//         error.message ||
//         "Failed to send the email OTP."
//     });
//   }
// });

// router.post("/verify-otp", async (req, res) => {
//   try {
//     const email = normalizeEmail(req.body?.email);
//     const otp = normalizeOtp(req.body?.otp);

//     if (!email || !isValidEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please enter a valid email address."
//       });
//     }

//     if (!isValidOtp(otp)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Please enter the complete 6-digit email OTP."
//       });
//     }

//     await createOtpTableIfNotExists();

//     const record = await getLatestEmailOtp(email);

//     if (!record) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Email OTP was not found. Please send a new OTP."
//       });
//     }

//     if (record.isVerified) {
//       return res.status(200).json({
//         success: true,
//         message: "Email OTP is already verified."
//       });
//     }

//     if (Date.now() > Number(record.expiresAt)) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Email OTP has expired. Please send a new OTP."
//       });
//     }

//     if (String(record.otp) !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email OTP."
//       });
//     }

//     await markOtpAsVerified(record.id);

//     return res.status(200).json({
//       success: true,
//       message: "Email OTP verified successfully."
//     });
//   } catch (error) {
//     console.error("VERIFY OLD EMAIL OTP ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message:
//         error.message ||
//         "Failed to verify the email OTP."
//     });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();

const { sendOtpEmail } = require("../services/emailService");
const db = require("../models");

const OTP_EXPIRY_TIME = 5 * 60 * 1000;

/* =====================================================
   GENERATE 6-DIGIT OTP
===================================================== */

const generateOtp = () => {
  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();
};

/* =====================================================
   NORMALIZATION
===================================================== */

const normalizeEmail = (email) => {
  return String(email || "")
    .trim()
    .toLowerCase();
};

const normalizeMobile = (mobile) => {
  return String(mobile || "")
    .replace(/\D/g, "")
    .trim();
};

const normalizeOtp = (otp) => {
  return String(otp || "")
    .replace(/\D/g, "")
    .trim();
};

/* =====================================================
   VALIDATION
===================================================== */

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email);
};

const isValidMobile = (mobile) => {
  return /^[6-9][0-9]{9}$/.test(mobile);
};

const isValidOtp = (otp) => {
  return /^[0-9]{6}$/.test(otp);
};

/* =====================================================
   ADD COLUMN IF NOT EXISTS
===================================================== */

async function addColumnIfNotExists(
  tableName,
  columnName,
  columnDefinition
) {
  try {
    await db.sequelize.query(`
      ALTER TABLE ${tableName}
      ADD COLUMN ${columnName} ${columnDefinition}
    `);
  } catch (error) {
    if (error?.parent?.code !== "ER_DUP_FIELDNAME") {
      throw error;
    }
  }
}

async function modifyColumnToNullable(
  tableName,
  columnName,
  columnDefinition
) {
  try {
    await db.sequelize.query(`
      ALTER TABLE ${tableName}
      MODIFY COLUMN ${columnName} ${columnDefinition}
    `);
  } catch (error) {
    if (error?.parent?.code !== "ER_CANT_DROP_FIELD_OR_KEY") {
      throw error;
    }
  }
}

/* =====================================================
   CREATE OTP TABLE
===================================================== */

async function createOtpTableIfNotExists() {
  await db.sequelize.query(`
    CREATE TABLE IF NOT EXISTS otps (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NULL,
      mobile VARCHAR(20) NULL,
      otp VARCHAR(10) NOT NULL,
      expiresAt BIGINT NOT NULL,
      isVerified BOOLEAN DEFAULT false,
      otpType VARCHAR(30) DEFAULT 'email',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await addColumnIfNotExists(
    "otps",
    "email",
    "VARCHAR(255) NULL"
  );

  await addColumnIfNotExists(
    "otps",
    "mobile",
    "VARCHAR(20) NULL"
  );

  await addColumnIfNotExists(
    "otps",
    "isVerified",
    "BOOLEAN DEFAULT false"
  );

  await addColumnIfNotExists(
    "otps",
    "otpType",
    "VARCHAR(30) DEFAULT 'email'"
  );

  await modifyColumnToNullable(
    "otps",
    "email",
    "VARCHAR(255) NULL"
  );
}

/* =====================================================
   SAVE OTP (EMAIL)
===================================================== */

async function saveOtp({
  email = null,
  mobile = null,
  otp,
  otpType
}) {
  const expiresAt =
    Date.now() + OTP_EXPIRY_TIME;

  await db.sequelize.query(
    `
      INSERT INTO otps
      (
        email,
        mobile,
        otp,
        expiresAt,
        isVerified,
        otpType
      )
      VALUES (?, ?, ?, ?, false, ?)
    `,
    {
      replacements: [
        email,
        mobile,
        otp,
        expiresAt,
        otpType
      ]
    }
  );
}

/* =====================================================
   SAVE MOBILE OTP (NO EMAIL FIELD)
===================================================== */

async function saveMobileOtp({
  mobile,
  otp,
  otpType
}) {
  const expiresAt =
    Date.now() + OTP_EXPIRY_TIME;

  await db.sequelize.query(
    `
      INSERT INTO otps
      (
        mobile,
        otp,
        expiresAt,
        isVerified,
        otpType
      )
      VALUES (?, ?, ?, false, ?)
    `,
    {
      replacements: [
        mobile,
        otp,
        expiresAt,
        otpType
      ]
    }
  );
}

/* =====================================================
   GET LATEST EMAIL OTP
===================================================== */

async function getLatestEmailOtp(email) {
  const [rows] =
    await db.sequelize.query(
      `
        SELECT *
        FROM otps
        WHERE email = ?
          AND otpType = 'email'
        ORDER BY id DESC
        LIMIT 1
      `,
      {
        replacements: [email]
      }
    );

  return rows && rows.length > 0
    ? rows[0]
    : null;
}

/* =====================================================
   GET LATEST MOBILE OTP
   IMPORTANT:
   MOBILE OTP DOES NOT REQUIRE EMAIL
===================================================== */

async function getLatestMobileOtp(mobile) {
  const [rows] =
    await db.sequelize.query(
      `
        SELECT *
        FROM otps
        WHERE mobile = ?
          AND otpType = 'mobile'
        ORDER BY id DESC
        LIMIT 1
      `,
      {
        replacements: [mobile]
      }
    );

  return rows && rows.length > 0
    ? rows[0]
    : null;
}

/* =====================================================
   MARK OTP VERIFIED
===================================================== */

async function markOtpAsVerified(id) {
  await db.sequelize.query(
    `
      UPDATE otps
      SET isVerified = true
      WHERE id = ?
    `,
    {
      replacements: [id]
    }
  );
}

/* =====================================================
   SEND MOBILE OTP USING FAST2SMS
===================================================== */

async function sendFast2SmsOtp(
  mobile,
  otp
) {
  const apiKey =
    process.env.FAST2SMS_API_KEY;

  const route =
    process.env.FAST2SMS_ROUTE || "dlt";

  const senderId =
    process.env.FAST2SMS_SENDER_ID;

  const templateId =
    process.env.FAST2SMS_TEMPLATE_ID;

  if (!apiKey) {
    throw new Error(
      "FAST2SMS_API_KEY is missing in environment variables."
    );
  }

  if (!senderId) {
    throw new Error(
      "FAST2SMS_SENDER_ID is missing in environment variables."
    );
  }

  if (!templateId) {
    throw new Error(
      "FAST2SMS_TEMPLATE_ID is missing in environment variables."
    );
  }

  const params =
    new URLSearchParams({
      authorization: apiKey,
      route: route,
      sender_id: senderId,
      message: templateId,
      variables_values: otp,
      flash: "0",
      numbers: mobile
    });

  const url =
    `https://www.fast2sms.com/dev/bulkV2?${params.toString()}`;

  const response =
    await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json"
      }
    });

  let result;

  try {
    result = await response.json();
  } catch (error) {
    throw new Error(
      "Fast2SMS returned an invalid response."
    );
  }

  console.log(
    "FAST2SMS RESPONSE:",
    result
  );

  if (
    !response.ok ||
    result?.return === false
  ) {
    const providerMessage =
      Array.isArray(result?.message)
        ? result.message.join(", ")
        : result?.message;

    throw new Error(
      providerMessage ||
      "Failed to send the mobile OTP through Fast2SMS."
    );
  }

  return result;
}

/* =====================================================
   SEND EMAIL OTP
   POST /api/send-email-otp
===================================================== */

router.post(
  "/send-email-otp",
  async (req, res) => {
    try {
      const email =
        normalizeEmail(
          req.body?.email
        );

      if (!email) {
        return res.status(400).json({
          success: false,
          message:
            "Email address is required."
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid email address."
        });
      }

      await createOtpTableIfNotExists();

      const otp =
        generateOtp();

      await sendOtpEmail(
        email,
        otp
      );

      await saveOtp({
        email: email,
        mobile: null,
        otp: otp,
        otpType: "email"
      });

      return res.status(200).json({
        success: true,
        message:
          "Email OTP sent successfully."
      });

    } catch (error) {
      console.error(
        "SEND EMAIL OTP ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to send the email OTP."
      });
    }
  }
);

/* =====================================================
   VERIFY EMAIL OTP
   POST /api/verify-email-otp
===================================================== */

router.post(
  "/verify-email-otp",
  async (req, res) => {
    try {
      const email =
        normalizeEmail(
          req.body?.email
        );

      const otp =
        normalizeOtp(
          req.body?.otp
        );

      if (!email) {
        return res.status(400).json({
          success: false,
          message:
            "Email address is required."
        });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid email address."
        });
      }

      if (!otp) {
        return res.status(400).json({
          success: false,
          message:
            "Email OTP is required."
        });
      }

      if (!isValidOtp(otp)) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter the complete 6-digit email OTP."
        });
      }

      await createOtpTableIfNotExists();

      const record =
        await getLatestEmailOtp(
          email
        );

      if (!record) {
        return res.status(400).json({
          success: false,
          message:
            "Email OTP was not found. Please send a new OTP."
        });
      }

      if (record.isVerified) {
        return res.status(200).json({
          success: true,
          message:
            "Email OTP is already verified."
        });
      }

      if (
        Date.now() >
        Number(record.expiresAt)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Email OTP has expired. Please send a new OTP."
        });
      }

      if (
        String(record.otp) !== otp
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid email OTP."
        });
      }

      await markOtpAsVerified(
        record.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Email OTP verified successfully."
      });

    } catch (error) {
      console.error(
        "VERIFY EMAIL OTP ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to verify the email OTP."
      });
    }
  }
);

/* =====================================================
   SEND MOBILE OTP
   POST /api/send-mobile-otp

   IMPORTANT:
   EMAIL IS NOT REQUIRED HERE
===================================================== */

router.post(
  "/send-mobile-otp",
  async (req, res) => {
    try {
      const mobile =
        normalizeMobile(
          req.body?.mobile
        );

      if (!mobile) {
        return res.status(400).json({
          success: false,
          message:
            "Mobile number is required."
        });
      }

      if (!isValidMobile(mobile)) {
        return res.status(400).json({
          success: false,
          message:
            "Enter a valid 10-digit Indian mobile number."
        });
      }

      if (/^(\d)\1{9}$/.test(mobile)) {
        return res.status(400).json({
          success: false,
          message:
            "Repeated digits are not accepted as a valid mobile number."
        });
      }

      if (mobile === "1234567890" || mobile === "9876543210") {
        return res.status(400).json({
          success: false,
          message:
            "This mobile number is not accepted."
        });
      }

      await createOtpTableIfNotExists();

      const otp =
        generateOtp();

      console.log(
        "GENERATED MOBILE OTP:",
        otp
      );

      await sendFast2SmsOtp(
        mobile,
        otp
      );

      /*
        IMPORTANT:
        Mobile OTP is saved WITHOUT email field.
        Uses saveMobileOtp which does not insert email.
      */

      await saveMobileOtp({
        mobile: mobile,
        otp: otp,
        otpType: "mobile"
      });

      return res.status(200).json({
        success: true,
        message:
          "Mobile OTP sent successfully."
      });

    } catch (error) {
      console.error(
        "SEND MOBILE OTP ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to send the mobile OTP."
      });
    }
  }
);

/* =====================================================
   VERIFY MOBILE OTP
   POST /api/verify-mobile-otp

   IMPORTANT:
   EMAIL IS NOT REQUIRED HERE
===================================================== */

router.post(
  "/verify-mobile-otp",
  async (req, res) => {
    try {
      const mobile =
        normalizeMobile(
          req.body?.mobile
        );

      const otp =
        normalizeOtp(
          req.body?.otp
        );

      if (!mobile) {
        return res.status(400).json({
          success: false,
          message:
            "Mobile number is required."
        });
      }

      if (!isValidMobile(mobile)) {
        return res.status(400).json({
          success: false,
          message:
            "Enter a valid 10-digit Indian mobile number."
        });
      }

      if (/^(\d)\1{9}$/.test(mobile)) {
        return res.status(400).json({
          success: false,
          message:
            "Repeated digits are not accepted as a valid mobile number."
        });
      }

      if (mobile === "1234567890" || mobile === "9876543210") {
        return res.status(400).json({
          success: false,
          message:
            "This mobile number is not accepted."
        });
      }

      if (!otp) {
        return res.status(400).json({
          success: false,
          message:
            "Mobile OTP is required."
        });
      }

      if (!isValidOtp(otp)) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter the complete 6-digit mobile OTP."
        });
      }

      await createOtpTableIfNotExists();

      const record =
        await getLatestMobileOtp(
          mobile
        );

      if (!record) {
        return res.status(400).json({
          success: false,
          message:
            "Mobile OTP was not found. Please send a new OTP."
        });
      }

      if (record.isVerified) {
        return res.status(200).json({
          success: true,
          message:
            "Mobile OTP is already verified."
        });
      }

      if (
        Date.now() >
        Number(record.expiresAt)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Mobile OTP has expired. Please send a new OTP."
        });
      }

      if (
        String(record.otp) !== otp
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid mobile OTP."
        });
      }

      await markOtpAsVerified(
        record.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Mobile number verified successfully."
      });

    } catch (error) {
      console.error(
        "VERIFY MOBILE OTP ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to verify the mobile OTP."
      });
    }
  }
);

/* =====================================================
   OLD EMAIL ROUTE
   POST /api/send-otp
===================================================== */

router.post(
  "/send-otp",
  async (req, res) => {
    try {
      const email =
        normalizeEmail(
          req.body?.email
        );

      if (
        !email ||
        !isValidEmail(email)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid email address."
        });
      }

      await createOtpTableIfNotExists();

      const otp =
        generateOtp();

      await sendOtpEmail(
        email,
        otp
      );

      await saveOtp({
        email: email,
        mobile: null,
        otp: otp,
        otpType: "email"
      });

      return res.status(200).json({
        success: true,
        message:
          "Email OTP sent successfully."
      });

    } catch (error) {
      console.error(
        "SEND OLD EMAIL OTP ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to send the email OTP."
      });
    }
  }
);

/* =====================================================
   OLD EMAIL VERIFY ROUTE
   POST /api/verify-otp
===================================================== */

router.post(
  "/verify-otp",
  async (req, res) => {
    try {
      const email =
        normalizeEmail(
          req.body?.email
        );

      const otp =
        normalizeOtp(
          req.body?.otp
        );

      if (
        !email ||
        !isValidEmail(email)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid email address."
        });
      }

      if (!isValidOtp(otp)) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter the complete 6-digit email OTP."
        });
      }

      await createOtpTableIfNotExists();

      const record =
        await getLatestEmailOtp(
          email
        );

      if (!record) {
        return res.status(400).json({
          success: false,
          message:
            "Email OTP was not found. Please send a new OTP."
        });
      }

      if (record.isVerified) {
        return res.status(200).json({
          success: true,
          message:
            "Email OTP is already verified."
        });
      }

      if (
        Date.now() >
        Number(record.expiresAt)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Email OTP has expired. Please send a new OTP."
        });
      }

      if (
        String(record.otp) !== otp
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid email OTP."
        });
      }

      await markOtpAsVerified(
        record.id
      );

      return res.status(200).json({
        success: true,
        message:
          "Email OTP verified successfully."
      });

    } catch (error) {
      console.error(
        "VERIFY OLD EMAIL OTP ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to verify the email OTP."
      });
    }
  }
);

module.exports = router;