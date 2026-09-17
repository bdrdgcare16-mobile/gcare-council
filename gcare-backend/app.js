// const express =
//   require("express");

// const cors =
//   require("cors");

// const path =
//   require("path");

// const dotenv =
//   require("dotenv");


// /* =====================================================
//    LOAD ENVIRONMENT VARIABLES
// ===================================================== */

// if (
//   process.env.NODE_ENV !==
//   "production"
// ) {
//   dotenv.config();
// }


// const app =
//   express();


// /* =====================================================
//    CORS CONFIGURATION
// ===================================================== */

// const allowedOrigins = [

//   "http://127.0.0.1:5500",

//   "http://localhost:5500",

//   "http://localhost:3000",

//   "https://gcarecouncil.in",

//   "https://www.gcarecouncil.in"

// ];


// const corsOptions = {

//   origin:
//     function (
//       origin,
//       callback
//     ) {

//       if (
//         !origin ||
//         origin === "null" ||
//         allowedOrigins.includes(
//           origin
//         )
//       ) {

//         return callback(
//           null,
//           true
//         );

//       }


//       console.error(
//         "CORS BLOCKED ORIGIN:",
//         origin
//       );


//       const corsError =
//         new Error(
//           `This origin is not allowed by CORS: ${origin}`
//         );


//       corsError.status =
//         403;


//       return callback(
//         corsError
//       );

//     },


//   methods: [
//     "GET",
//     "POST",
//     "PUT",
//     "PATCH",
//     "DELETE",
//     "OPTIONS"
//   ],


//   allowedHeaders: [
//     "Content-Type",
//     "Authorization"
//   ],


//   credentials:
//     false,


//   optionsSuccessStatus:
//     204

// };


// app.use(
//   cors(
//     corsOptions
//   )
// );


// app.options(
//   /.*/,
//   cors(
//     corsOptions
//   )
// );


// /* =====================================================
//    BODY PARSER
// ===================================================== */

// app.use(
//   express.json({
//     limit:
//       "2mb"
//   })
// );


// app.use(
//   express.urlencoded({
//     extended:
//       true,

//     limit:
//       "2mb"
//   })
// );


// /* =====================================================
//    REQUEST LOGGER
// ===================================================== */

// app.use(
//   function (
//     req,
//     res,
//     next
//   ) {

//     console.log(
//       `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
//     );


//     next();

//   }
// );


// /* =====================================================
//    ENVIRONMENT CHECK
// ===================================================== */

// console.log(
//   "========================================"
// );

// console.log(
//   "G CARE BACKEND ENVIRONMENT CHECK"
// );

// console.log(
//   "========================================"
// );


// console.log(
//   "NODE_ENV:",
//   process.env.NODE_ENV ||
//   "development"
// );


// console.log(
//   "PORT:",
//   process.env.PORT ||
//   "3000"
// );


// console.log(
//   "DB_HOST:",
//   process.env.DB_HOST
//     ? "Configured"
//     : "Not configured"
// );


// console.log(
//   "DB_NAME:",
//   process.env.DB_NAME ||
//   "Not configured"
// );


// console.log(
//   "DB_USER:",
//   process.env.DB_USER
//     ? "Configured"
//     : "Not configured"
// );


// console.log(
//   "DB_PASSWORD:",
//   process.env.DB_PASSWORD
//     ? "Configured"
//     : "Not configured"
// );


// console.log(
//   "ADMIN_EMAIL:",
//   process.env.ADMIN_EMAIL ||
//   "Not configured"
// );


// /* =====================================================
//    BREVO CONFIG
// ===================================================== */

// console.log(
//   "BREVO_API_KEY:",
//   process.env.BREVO_API_KEY
//     ? "Configured"
//     : "Not configured"
// );


// console.log(
//   "BREVO_SENDER_EMAIL:",
//   process.env.BREVO_SENDER_EMAIL ||
//   process.env.EMAIL_FROM ||
//   "Not configured"
// );


// console.log(
//   "BREVO_SENDER_NAME:",
//   process.env.BREVO_SENDER_NAME ||
//   process.env.SENDER_NAME ||
//   "G Care Council"
// );


// /* =====================================================
//    FAST2SMS CONFIG
// ===================================================== */

// console.log(
//   "FAST2SMS_API_KEY:",
//   process.env.FAST2SMS_API_KEY
//     ? "Configured"
//     : "Not configured"
// );


// console.log(
//   "FAST2SMS_ROUTE:",
//   process.env.FAST2SMS_ROUTE ||
//   "dlt"
// );


// console.log(
//   "FAST2SMS_SENDER_ID:",
//   process.env.FAST2SMS_SENDER_ID ||
//   "Not configured"
// );


// console.log(
//   "FAST2SMS_TEMPLATE_ID:",
//   process.env.FAST2SMS_TEMPLATE_ID ||
//   "Not configured"
// );


// console.log(
//   "========================================"
// );


// /* =====================================================
//    STATIC FILE ACCESS
// ===================================================== */

// app.use(
//   "/uploads",
//   express.static(
//     path.join(
//       __dirname,
//       "uploads"
//     )
//   )
// );


// /* =====================================================
//    OTP ROUTES
// ===================================================== */

// const otpRoutes =
//   require(
//     "./routes/otp"
//   );


// app.use(
//   "/api",
//   otpRoutes
// );


// /* =====================================================
//    CONTACT ROUTES
// ===================================================== */

// const contactRoutes =
//   require(
//     "./routes/contactRoutes"
//   );


// app.use(
//   "/api/contact",
//   contactRoutes
// );


// /* =====================================================
//    ADMISSION ROUTES
// ===================================================== */

// const admissionRoutes =
//   require(
//     "./routes/admissionRoutes"
//   );


// app.use(
//   "/api/admissions",
//   admissionRoutes
// );

// console.log(
//   "Admissions routes loaded"
// );


// /* =====================================================
//    INTERNSHIP ROUTES
// ===================================================== */

// const internshipRoutes =
//   require(
//     "./routes/internshipRoutes"
//   );


// app.use(
//   "/api/internships",
//   internshipRoutes
// );


// /* =====================================================
//    AFFILIATION ROUTES
// ===================================================== */

// const affiliationRoutes =
//   require(
//     "./routes/affiliationRoutes"
//   );


// app.use(
//   "/api/affiliations",
//   affiliationRoutes
// );

// console.log(
//   "Affiliation routes loaded"
// );


// /* =====================================================
//    HEALTH CHECK
// ===================================================== */

// app.get(
//   "/",
//   function (
//     req,
//     res
//   ) {

//     return res
//       .status(200)
//       .json({

//         success:
//           true,

//         message:
//           "G Care Council backend server is running."

//       });

//   }
// );


// app.get(
//   "/test",
//   function (
//     req,
//     res
//   ) {

//     return res
//       .status(200)
//       .json({

//         success:
//           true,

//         message:
//           "Backend is working successfully."

//       });

//   }
// );


// /* =====================================================
//    OTP + EMAIL CONFIG STATUS
// ===================================================== */

// app.get(
//   "/api/otp-config-status",
//   function (
//     req,
//     res
//   ) {

//     const brevoConfigured =
//       Boolean(

//         process.env.BREVO_API_KEY &&

//         (
//           process.env.BREVO_SENDER_EMAIL ||
//           process.env.EMAIL_FROM ||
//           process.env.EMAIL_USER
//         )

//       );


//     const internshipEmailConfigured =
//       Boolean(

//         process.env.BREVO_API_KEY &&

//         (
//           process.env.BREVO_SENDER_EMAIL ||
//           process.env.EMAIL_FROM ||
//           process.env.EMAIL_USER
//         ) &&

//         (
//           process.env.ADMIN_EMAIL ||
//           "info@gcarecouncil.in"
//         )

//       );


//     const fast2SmsConfigured =
//       Boolean(

//         process.env.FAST2SMS_API_KEY &&

//         process.env.FAST2SMS_SENDER_ID &&

//         process.env.FAST2SMS_TEMPLATE_ID

//       );


//     return res
//       .status(200)
//       .json({

//         success:
//           true,


//         emailOtp: {

//           provider:
//             "Brevo",

//           configured:
//             brevoConfigured,

//           senderEmailConfigured:
//             Boolean(
//               process.env.BREVO_SENDER_EMAIL ||
//               process.env.EMAIL_FROM ||
//               process.env.EMAIL_USER
//             ),

//           senderName:
//             process.env.BREVO_SENDER_NAME ||
//             process.env.SENDER_NAME ||
//             "G Care Council"

//         },


//         internshipEmail: {

//           provider:
//             "Brevo",

//           configured:
//             internshipEmailConfigured,

//           adminEmail:
//             process.env.ADMIN_EMAIL ||
//             "info@gcarecouncil.in"

//         },


//         mobileOtp: {

//           provider:
//             "Fast2SMS",

//           configured:
//             fast2SmsConfigured,

//           route:
//             process.env.FAST2SMS_ROUTE ||
//             "dlt",

//           senderIdConfigured:
//             Boolean(
//               process.env.FAST2SMS_SENDER_ID
//             ),

//           templateIdConfigured:
//             Boolean(
//               process.env.FAST2SMS_TEMPLATE_ID
//             )

//         }

//       });

//   }
// );


// /* =====================================================
//    CONTACT DEBUG
// ===================================================== */

// app.post(
//   "/api/debug/contact",
//   function (
//     req,
//     res
//   ) {

//     console.log(
//       "DEBUG CONTACT BODY:",
//       req.body
//     );


//     return res
//       .status(200)
//       .json({

//         success:
//           true,

//         message:
//           "Contact payload received successfully.",

//         data:
//           req.body

//       });

//   }
// );


// /* =====================================================
//    404
// ===================================================== */

// app.use(
//   function (
//     req,
//     res
//   ) {

//     return res
//       .status(404)
//       .json({

//         success:
//           false,

//         message:
//           `API route not found: ${req.method} ${req.originalUrl}`

//       });

//   }
// );


// /* =====================================================
//    GLOBAL ERROR HANDLER
// ===================================================== */

// app.use(
//   function (
//     error,
//     req,
//     res,
//     next
//   ) {

//     console.error(
//       "GLOBAL SERVER ERROR:",
//       error
//     );


//     return res
//       .status(
//         error.status ||
//         500
//       )
//       .json({

//         success:
//           false,

//         message:
//           error.message ||
//           "Internal server error."

//       });

//   }
// );


// /* =====================================================
//    START SERVER
// ===================================================== */

// const PORT =
//   process.env.PORT ||
//   3000;


// app.listen(
//   PORT,
//   "0.0.0.0",
//   function () {

//     console.log(
//       `G Care Council backend server is running on port ${PORT}`
//     );


//     console.log(
//       `Health check: http://localhost:${PORT}/test`
//     );


//     console.log(
//       `OTP / Email config: http://localhost:${PORT}/api/otp-config-status`
//     );

//   }
// );



require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

/* =====================================================
   CREATE EXPRESS APP
===================================================== */

const app = express();

/* =====================================================
   CORS CONFIGURATION
===================================================== */

const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:3000",
  "https://gcarecouncil.in",
  "https://www.gcarecouncil.in"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      origin === "null" ||
      allowedOrigins.includes(origin)
    ) {
      return callback(null, true);
    }

    console.error("CORS BLOCKED ORIGIN:", origin);

    const corsError = new Error(
      `This origin is not allowed by CORS: ${origin}`
    );

    corsError.status = 403;

    return callback(corsError);
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],

  credentials: false,

  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.options(/.*/, cors(corsOptions));

/* =====================================================
   BODY PARSER
===================================================== */

app.use(
  express.json({
    limit: "2mb"
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "2mb"
  })
);

/* =====================================================
   REQUEST LOGGER
===================================================== */

app.use(function (req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );

  next();
});

/* =====================================================
   ENVIRONMENT CHECK
===================================================== */

console.log("========================================");
console.log("G CARE BACKEND ENVIRONMENT CHECK");
console.log("========================================");

console.log(
  "NODE_ENV:",
  process.env.NODE_ENV || "development"
);

console.log(
  "PORT:",
  process.env.PORT || "3000"
);

console.log(
  "DB_HOST:",
  process.env.DB_HOST
    ? "Configured"
    : "Not configured"
);

console.log(
  "DB_PORT:",
  process.env.DB_PORT || "3306"
);

console.log(
  "DB_NAME:",
  process.env.DB_NAME || "Not configured"
);

console.log(
  "DB_USER:",
  process.env.DB_USER
    ? "Configured"
    : "Not configured"
);

console.log(
  "DB_PASSWORD:",
  process.env.DB_PASSWORD
    ? "Configured"
    : "Not configured"
);

console.log(
  "ADMIN_EMAIL:",
  process.env.ADMIN_EMAIL ||
    "Not configured"
);

/* =====================================================
   BREVO CONFIG
===================================================== */

console.log(
  "BREVO_API_KEY:",
  process.env.BREVO_API_KEY
    ? "Configured"
    : "Not configured"
);

console.log(
  "BREVO_SENDER_EMAIL:",
  process.env.BREVO_SENDER_EMAIL ||
    process.env.EMAIL_FROM ||
    "Not configured"
);

console.log(
  "BREVO_SENDER_NAME:",
  process.env.BREVO_SENDER_NAME ||
    process.env.SENDER_NAME ||
    "G Care Council"
);

/* =====================================================
   FAST2SMS CONFIG
===================================================== */

console.log(
  "FAST2SMS_API_KEY:",
  process.env.FAST2SMS_API_KEY
    ? "Configured"
    : "Not configured"
);

console.log(
  "FAST2SMS_ROUTE:",
  process.env.FAST2SMS_ROUTE || "dlt"
);

console.log(
  "FAST2SMS_SENDER_ID:",
  process.env.FAST2SMS_SENDER_ID ||
    "Not configured"
);

console.log(
  "FAST2SMS_TEMPLATE_ID:",
  process.env.FAST2SMS_TEMPLATE_ID ||
    "Not configured"
);

console.log("========================================");

/* =====================================================
   STATIC FILE ACCESS
===================================================== */

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* =====================================================
   OTP ROUTES
===================================================== */

const otpRoutes = require("./routes/otp");

app.use("/api", otpRoutes);

/* =====================================================
   CONTACT ROUTES
===================================================== */

const contactRoutes =
  require("./routes/contactRoutes");

app.use(
  "/api/contact",
  contactRoutes
);

/* =====================================================
   ADMISSION ROUTES
===================================================== */

const admissionRoutes =
  require("./routes/admissionRoutes");

app.use(
  "/api/admissions",
  admissionRoutes
);

console.log(
  "Admissions routes loaded"
);

/* =====================================================
   INTERNSHIP ROUTES
===================================================== */

const internshipRoutes =
  require("./routes/internshipRoutes");

app.use(
  "/api/internships",
  internshipRoutes
);

console.log(
  "Internship routes loaded"
);

/* =====================================================
   AFFILIATION ROUTES
===================================================== */

const affiliationRoutes =
  require("./routes/affiliationRoutes");

app.use(
  "/api/affiliations",
  affiliationRoutes
);

console.log(
  "Affiliation routes loaded"
);

/* =====================================================
   HEALTH CHECK
===================================================== */

app.get("/", function (req, res) {
  return res
    .status(200)
    .json({
      success: true,
      message:
        "G Care Council backend server is running."
    });
});

app.get("/test", function (req, res) {
  return res
    .status(200)
    .json({
      success: true,
      message:
        "Backend is working successfully."
    });
});

/* =====================================================
   OTP + EMAIL CONFIG STATUS
===================================================== */

app.get(
  "/api/otp-config-status",
  function (req, res) {
    const brevoConfigured =
      Boolean(
        process.env.BREVO_API_KEY &&
        (
          process.env.BREVO_SENDER_EMAIL ||
          process.env.EMAIL_FROM ||
          process.env.EMAIL_USER
        )
      );

    const internshipEmailConfigured =
      Boolean(
        process.env.BREVO_API_KEY &&
        (
          process.env.BREVO_SENDER_EMAIL ||
          process.env.EMAIL_FROM ||
          process.env.EMAIL_USER
        ) &&
        (
          process.env.ADMIN_EMAIL ||
          "info@gcarecouncil.in"
        )
      );

    const fast2SmsConfigured =
      Boolean(
        process.env.FAST2SMS_API_KEY &&
        process.env.FAST2SMS_SENDER_ID &&
        process.env.FAST2SMS_TEMPLATE_ID
      );

    return res
      .status(200)
      .json({
        success: true,

        emailOtp: {
          provider: "Brevo",

          configured:
            brevoConfigured,

          senderEmailConfigured:
            Boolean(
              process.env.BREVO_SENDER_EMAIL ||
              process.env.EMAIL_FROM ||
              process.env.EMAIL_USER
            ),

          senderName:
            process.env.BREVO_SENDER_NAME ||
            process.env.SENDER_NAME ||
            "G Care Council"
        },

        internshipEmail: {
          provider: "Brevo",

          configured:
            internshipEmailConfigured,

          adminEmail:
            process.env.ADMIN_EMAIL ||
            "info@gcarecouncil.in"
        },

        mobileOtp: {
          provider: "Fast2SMS",

          configured:
            fast2SmsConfigured,

          route:
            process.env.FAST2SMS_ROUTE ||
            "dlt",

          senderIdConfigured:
            Boolean(
              process.env.FAST2SMS_SENDER_ID
            ),

          templateIdConfigured:
            Boolean(
              process.env.FAST2SMS_TEMPLATE_ID
            )
        }
      });
  }
);

/* =====================================================
   CONTACT DEBUG
===================================================== */

app.post(
  "/api/debug/contact",
  function (req, res) {
    console.log(
      "DEBUG CONTACT BODY:",
      req.body
    );

    return res
      .status(200)
      .json({
        success: true,

        message:
          "Contact payload received successfully.",

        data: req.body
      });
  }
);

/* =====================================================
   404
===================================================== */

app.use(function (req, res) {
  return res
    .status(404)
    .json({
      success: false,

      message:
        `API route not found: ${req.method} ${req.originalUrl}`
    });
});

/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */

app.use(
  function (
    error,
    req,
    res,
    next
  ) {
    console.error(
      "GLOBAL SERVER ERROR:",
      error
    );

    return res
      .status(
        error.status || 500
      )
      .json({
        success: false,

        message:
          error.message ||
          "Internal server error."
      });
  }
);

/* =====================================================
   START SERVER
===================================================== */

const PORT =
  process.env.PORT || 3000;

app.listen(
  PORT,
  "0.0.0.0",
  function () {
    console.log(
      `G Care Council backend server is running on port ${PORT}`
    );

    console.log(
      `Health check: http://localhost:${PORT}/test`
    );

    console.log(
      `OTP / Email config: http://localhost:${PORT}/api/otp-config-status`
    );
  }
);