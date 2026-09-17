// const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

// /* ---------------------------------------
//    EMAIL VALIDATION
// --------------------------------------- */
// const isValidEmail = (email) => {
//   return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email);
// };

// /* ---------------------------------------
//    SEND OTP EMAIL USING BREVO
// --------------------------------------- */
// const sendOtpEmail = async (email, otp) => {
//   try {
//     const recipientEmail = String(email || "")
//       .trim()
//       .toLowerCase();

//     const otpValue = String(otp || "").trim();

//     if (!recipientEmail) {
//       throw new Error("Recipient email address is required.");
//     }

//     if (!isValidEmail(recipientEmail)) {
//       throw new Error("Recipient email address is invalid.");
//     }

//     if (!/^[0-9]{6}$/.test(otpValue)) {
//       throw new Error("OTP must contain exactly 6 digits.");
//     }

//     if (!process.env.BREVO_API_KEY) {
//       throw new Error(
//         "BREVO_API_KEY is missing in environment variables."
//       );
//     }

//     const senderEmail =
//       process.env.BREVO_SENDER_EMAIL ||
//       process.env.EMAIL_FROM ||
//       process.env.EMAIL_USER;

//     const senderName =
//       process.env.SENDER_NAME ||
//       "G Care Council Admission";

//     if (!senderEmail) {
//       throw new Error(
//         "Sender email is missing. Set BREVO_SENDER_EMAIL in the .env file."
//       );
//     }

//     if (!isValidEmail(senderEmail)) {
//       throw new Error(
//         "The configured Brevo sender email is invalid."
//       );
//     }

//     const emailPayload = {
//       sender: {
//         name: senderName,
//         email: senderEmail
//       },

//       to: [
//         {
//           email: recipientEmail
//         }
//       ],

//       subject: "G Care Council - Admission OTP Verification",

//       htmlContent: `
//         <!DOCTYPE html>
//         <html lang="en">
//           <head>
//             <meta charset="UTF-8" />
//             <meta
//               name="viewport"
//               content="width=device-width, initial-scale=1.0"
//             />
//           </head>

//           <body
//             style="
//               margin: 0;
//               padding: 0;
//               background-color: #f3f6f9;
//               font-family: Arial, sans-serif;
//             "
//           >
//             <table
//               role="presentation"
//               width="100%"
//               cellspacing="0"
//               cellpadding="0"
//               border="0"
//               style="
//                 width: 100%;
//                 background-color: #f3f6f9;
//                 padding: 30px 15px;
//               "
//             >
//               <tr>
//                 <td align="center">
//                   <table
//                     role="presentation"
//                     width="100%"
//                     cellspacing="0"
//                     cellpadding="0"
//                     border="0"
//                     style="
//                       max-width: 580px;
//                       background-color: #ffffff;
//                       border-radius: 12px;
//                       overflow: hidden;
//                       box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
//                     "
//                   >
//                     <tr>
//                       <td
//                         style="
//                           background-color: #005b96;
//                           color: #ffffff;
//                           padding: 22px 26px;
//                           text-align: center;
//                         "
//                       >
//                         <h2
//                           style="
//                             margin: 0;
//                             font-size: 24px;
//                             line-height: 1.4;
//                           "
//                         >
//                           G Care Council Admission
//                         </h2>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td
//                         style="
//                           padding: 30px 26px;
//                           color: #1f2937;
//                           line-height: 1.7;
//                         "
//                       >
//                         <p style="margin-top: 0;">
//                           Dear Applicant,
//                         </p>

//                         <p>
//                           Your OTP for admission form email verification is:
//                         </p>

//                         <div
//                           style="
//                             margin: 24px 0;
//                             padding: 18px;
//                             background-color: #eef7ff;
//                             border: 1px solid #cfe8ff;
//                             border-radius: 10px;
//                             text-align: center;
//                             font-size: 34px;
//                             font-weight: bold;
//                             letter-spacing: 8px;
//                             color: #005b96;
//                           "
//                         >
//                           ${otpValue}
//                         </div>

//                         <p>
//                           This OTP is valid for
//                           <strong>5 minutes</strong>.
//                         </p>

//                         <p>
//                           Please do not share this OTP with anyone.
//                         </p>

//                         <p style="margin-bottom: 0;">
//                           Regards,<br />
//                           <strong>
//                             G Care Council Admission Team
//                           </strong>
//                         </p>
//                       </td>
//                     </tr>

//                     <tr>
//                       <td
//                         style="
//                           padding: 16px 24px;
//                           background-color: #f8fafc;
//                           color: #6b7280;
//                           font-size: 12px;
//                           text-align: center;
//                         "
//                       >
//                         This is an automated email. Please do not reply.
//                       </td>
//                     </tr>
//                   </table>
//                 </td>
//               </tr>
//             </table>
//           </body>
//         </html>
//       `,

//       textContent:
//         `G Care Council Admission OTP: ${otpValue}. ` +
//         `This OTP is valid for 5 minutes. ` +
//         `Do not share this OTP with anyone.`
//     };

//     const response = await fetch(BREVO_API_URL, {
//       method: "POST",

//       headers: {
//         accept: "application/json",
//         "api-key": process.env.BREVO_API_KEY,
//         "content-type": "application/json"
//       },

//       body: JSON.stringify(emailPayload)
//     });

//     let result;

//     try {
//       result = await response.json();
//     } catch (parseError) {
//       throw new Error(
//         "Brevo returned an invalid response."
//       );
//     }

//     if (!response.ok) {
//       console.error("BREVO EMAIL ERROR:", result);

//       throw new Error(
//         result?.message ||
//         "Brevo failed to send the email OTP."
//       );
//     }

//     console.log(
//       "OTP email sent successfully using Brevo:",
//       result
//     );

//     return result;
//   } catch (error) {
//     console.error("EMAIL OTP FULL ERROR:", error);

//     throw new Error(
//       error.message ||
//       "OTP email sending failed."
//     );
//   }
// };

// module.exports = {
//   sendOtpEmail
// };



const BREVO_API_URL =
  "https://api.brevo.com/v3/smtp/email";


/* =====================================================
   EMAIL VALIDATION
===================================================== */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(
    String(email || "").trim()
  );
}


/* =====================================================
   GET SENDER EMAIL
===================================================== */

function getSenderEmail() {
  return String(
    process.env.BREVO_SENDER_EMAIL ||
    process.env.EMAIL_FROM ||
    process.env.EMAIL_USER ||
    ""
  )
    .trim()
    .toLowerCase();
}


/* =====================================================
   GET SENDER NAME
===================================================== */

function getSenderName() {
  return String(
    process.env.BREVO_SENDER_NAME ||
    process.env.SENDER_NAME ||
    "G Care Council"
  ).trim();
}


/* =====================================================
   GENERIC BREVO EMAIL FUNCTION
===================================================== */

async function sendBrevoEmail({
  to,
  subject,
  htmlContent,
  textContent
}) {
  try {
    const recipientEmail =
      String(to || "")
        .trim()
        .toLowerCase();

    if (!recipientEmail) {
      throw new Error(
        "Recipient email address is required."
      );
    }

    if (
      !isValidEmail(
        recipientEmail
      )
    ) {
      throw new Error(
        `Invalid recipient email address: ${recipientEmail}`
      );
    }

    if (
      !process.env.BREVO_API_KEY
    ) {
      throw new Error(
        "BREVO_API_KEY is missing in environment variables."
      );
    }

    const senderEmail =
      getSenderEmail();

    const senderName =
      getSenderName();

    if (!senderEmail) {
      throw new Error(
        "BREVO_SENDER_EMAIL is missing in environment variables."
      );
    }

    if (
      !isValidEmail(
        senderEmail
      )
    ) {
      throw new Error(
        "The configured Brevo sender email is invalid."
      );
    }

    if (
      !subject ||
      !String(subject).trim()
    ) {
      throw new Error(
        "Email subject is required."
      );
    }

    const payload = {
      sender: {
        name: senderName,
        email: senderEmail
      },

      to: [
        {
          email: recipientEmail
        }
      ],

      subject:
        String(subject).trim(),

      htmlContent:
        htmlContent || "",

      textContent:
        textContent || ""
    };

    const response =
      await fetch(
        BREVO_API_URL,
        {
          method: "POST",

          headers: {
            accept:
              "application/json",

            "api-key":
              process.env.BREVO_API_KEY,

            "content-type":
              "application/json"
          },

          body:
            JSON.stringify(
              payload
            )
        }
      );

    let result = {};

    try {
      result =
        await response.json();
    } catch (parseError) {
      result = {};
    }

    if (
      !response.ok
    ) {
      console.error(
        "BREVO EMAIL ERROR:",
        {
          status:
            response.status,

          recipient:
            recipientEmail,

          result
        }
      );

      throw new Error(
        result?.message ||
        "Brevo failed to send the email."
      );
    }

    console.log(
      "BREVO EMAIL SENT SUCCESSFULLY:",
      {
        recipient:
          recipientEmail,

        subject,

        messageId:
          result?.messageId ||
          "Not returned"
      }
    );

    return result;

  } catch (error) {
    console.error(
      "SEND BREVO EMAIL ERROR:",
      error
    );

    throw error;
  }
}


/* =====================================================
   SEND OTP EMAIL
===================================================== */

async function sendOtpEmail(
  email,
  otp
) {
  try {
    const recipientEmail =
      String(email || "")
        .trim()
        .toLowerCase();

    const otpValue =
      String(otp || "")
        .trim();

    if (!recipientEmail) {
      throw new Error(
        "Recipient email address is required."
      );
    }

    if (
      !isValidEmail(
        recipientEmail
      )
    ) {
      throw new Error(
        "Recipient email address is invalid."
      );
    }

    if (
      !/^[0-9]{6}$/.test(
        otpValue
      )
    ) {
      throw new Error(
        "OTP must contain exactly 6 digits."
      );
    }

    const subject =
      "G Care Council - Admission OTP Verification";

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">

        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#f3f6f9;
            font-family:Arial,sans-serif;
          "
        >

          <table
            width="100%"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="
              background:#f3f6f9;
              padding:30px 15px;
            "
          >

            <tr>
              <td align="center">

                <table
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  style="
                    max-width:580px;
                    background:#ffffff;
                    border-radius:12px;
                    overflow:hidden;
                  "
                >

                  <tr>
                    <td
                      style="
                        background:#005b96;
                        color:#ffffff;
                        padding:22px 26px;
                        text-align:center;
                      "
                    >
                      <h2
                        style="
                          margin:0;
                          font-size:24px;
                        "
                      >
                        G Care Council Admission
                      </h2>
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:30px 26px;
                        color:#1f2937;
                        line-height:1.7;
                      "
                    >

                      <p>
                        Dear Applicant,
                      </p>

                      <p>
                        Your OTP for admission form
                        email verification is:
                      </p>

                      <div
                        style="
                          margin:24px 0;
                          padding:18px;
                          background:#eef7ff;
                          border:1px solid #cfe8ff;
                          border-radius:10px;
                          text-align:center;
                          font-size:34px;
                          font-weight:bold;
                          letter-spacing:8px;
                          color:#005b96;
                        "
                      >
                        ${otpValue}
                      </div>

                      <p>
                        This OTP is valid for
                        <strong>
                          5 minutes
                        </strong>.
                      </p>

                      <p>
                        Please do not share this OTP
                        with anyone.
                      </p>

                      <p>
                        Regards,<br />
                        <strong>
                          G Care Council Admission Team
                        </strong>
                      </p>

                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:16px 24px;
                        background:#f8fafc;
                        color:#6b7280;
                        font-size:12px;
                        text-align:center;
                      "
                    >
                      This is an automated email.
                      Please do not reply.
                    </td>
                  </tr>

                </table>

              </td>
            </tr>

          </table>

        </body>
      </html>
    `;

    const textContent =
      `G Care Council Admission OTP: ${otpValue}. ` +
      `This OTP is valid for 5 minutes. ` +
      `Do not share this OTP with anyone.`;

    return await sendBrevoEmail({
      to:
        recipientEmail,

      subject,

      htmlContent,

      textContent
    });

  } catch (error) {
    console.error(
      "EMAIL OTP ERROR:",
      error
    );

    throw error;
  }
}


/* =====================================================
   EXPORT
===================================================== */

module.exports = {
  sendBrevoEmail,
  sendOtpEmail,
  isValidEmail
};