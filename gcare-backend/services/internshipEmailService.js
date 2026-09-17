const {
  sendBrevoEmail
} =
  require("./emailService");


/* =====================================================
   HELPERS
===================================================== */

function safeValue(
  value,
  fallback = "-"
) {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return fallback;
  }

  return String(
    value
  ).trim();
}


function escapeHtml(
  value
) {
  return safeValue(value)
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}


function getApplicationValue(
  application,
  camelCaseKey,
  snakeCaseKey
) {
  if (!application) {
    return "";
  }

  return (
    application[camelCaseKey] ??
    application[snakeCaseKey] ??
    ""
  );
}


function formatDate(
  value
) {
  if (!value) {
    return "-";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return safeValue(
      value
    );
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day:
        "2-digit",

      month:
        "2-digit",

      year:
        "numeric"
    }
  );
}


/* =====================================================
   NORMALIZE APPLICATION
===================================================== */

function normalizeApplication(
  application
) {
  return {
    id:
      getApplicationValue(
        application,
        "id",
        "id"
      ),

    enrolmentNumber:
      getApplicationValue(
        application,
        "enrolmentNumber",
        "enrolment_number"
      ),

    centreCode:
      getApplicationValue(
        application,
        "centreCode",
        "centre_code"
      ),

    studentName:
      getApplicationValue(
        application,
        "studentName",
        "student_name"
      ),

    fatherName:
      getApplicationValue(
        application,
        "fatherName",
        "father_name"
      ),

    sex:
      getApplicationValue(
        application,
        "sex",
        "sex"
      ),

    dateOfBirth:
      getApplicationValue(
        application,
        "dateOfBirth",
        "date_of_birth"
      ),

    address:
      getApplicationValue(
        application,
        "address",
        "address"
      ),

    pinCode:
      getApplicationValue(
        application,
        "pinCode",
        "pin_code"
      ),

    phoneNumber:
      getApplicationValue(
        application,
        "phoneNumber",
        "phone_number"
      ),

    email:
      getApplicationValue(
        application,
        "email",
        "email"
      ),

    status:
      getApplicationValue(
        application,
        "status",
        "status"
      ) || "Pending"
  };
}


/* =====================================================
   TABLE ROW
===================================================== */

function tableRow(
  label,
  value
) {
  return `
    <tr>

      <td
        style="
          padding:10px;
          border:1px solid #e5e7eb;
          font-weight:bold;
          width:40%;
          vertical-align:top;
        "
      >
        ${escapeHtml(label)}
      </td>

      <td
        style="
          padding:10px;
          border:1px solid #e5e7eb;
          vertical-align:top;
        "
      >
        ${escapeHtml(value)}
      </td>

    </tr>
  `;
}


/* =====================================================
   USER SUBMISSION EMAIL
===================================================== */

async function sendInternshipUserEmail(
  application
) {
  const data =
    normalizeApplication(
      application
    );

  const recipientEmail =
    String(
      data.email || ""
    )
      .trim()
      .toLowerCase();

  if (!recipientEmail) {
    throw new Error(
      "Internship applicant email is missing."
    );
  }

  const subject =
    "G Care Council - Internship Application Received";

  const htmlContent = `
    <!DOCTYPE html>

    <html lang="en">

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
                style="
                  max-width:620px;
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
                      padding:24px;
                      text-align:center;
                    "
                  >

                    <h2
                      style="
                        margin:0;
                      "
                    >
                      G Care Council
                    </h2>

                    <p>
                      Internship Application
                    </p>

                  </td>

                </tr>

                <tr>

                  <td
                    style="
                      padding:30px;
                      color:#1f2937;
                      line-height:1.7;
                    "
                  >

                    <p>
                      Dear
                      <strong>
                        ${escapeHtml(
                          data.studentName
                        )}
                      </strong>,
                    </p>

                    <p>
                      Thank you for submitting your
                      internship application to
                      G Care Council.
                    </p>

                    <p>
                      Your application has been
                      received successfully and is
                      currently under review.
                    </p>

                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        border-collapse:collapse;
                        margin:24px 0;
                      "
                    >

                      ${tableRow(
                        "Application ID",
                        data.id
                      )}

                      ${tableRow(
                        "Enrolment Number",
                        data.enrolmentNumber
                      )}

                      ${tableRow(
                        "Centre Code",
                        data.centreCode
                      )}

                      ${tableRow(
                        "Student Name",
                        data.studentName
                      )}

                      ${tableRow(
                        "Phone Number",
                        data.phoneNumber
                      )}

                      ${tableRow(
                        "Email",
                        data.email
                      )}

                      ${tableRow(
                        "Status",
                        data.status
                      )}

                    </table>

                    <p>
                      Our team will review your
                      application and notify you
                      when the status changes.
                    </p>

                    <p>
                      Regards,<br />

                      <strong>
                        G Care Council
                      </strong>
                    </p>

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
    `Dear ${safeValue(data.studentName)},\n\n` +
    `Your internship application has been received successfully.\n\n` +
    `Application ID: ${safeValue(data.id)}\n` +
    `Enrolment Number: ${safeValue(data.enrolmentNumber)}\n` +
    `Centre Code: ${safeValue(data.centreCode)}\n` +
    `Status: ${safeValue(data.status)}\n\n` +
    `Regards,\nG Care Council`;

  return sendBrevoEmail({
    to:
      recipientEmail,

    subject,

    htmlContent,

    textContent
  });
}


/* =====================================================
   ADMIN SUBMISSION EMAIL
===================================================== */

async function sendInternshipAdminEmail(
  application
) {
  const data =
    normalizeApplication(
      application
    );

  const adminEmail =
    String(
      process.env.ADMIN_EMAIL ||
      "info@gcarecouncil.in"
    )
      .trim()
      .toLowerCase();

  const subject =
    `New Internship Application - ${safeValue(
      data.studentName
    )}`;

  const htmlContent = `
    <!DOCTYPE html>

    <html lang="en">

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
                style="
                  max-width:680px;
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
                      padding:24px;
                      text-align:center;
                    "
                  >

                    <h2>
                      New Internship Application
                    </h2>

                  </td>

                </tr>

                <tr>

                  <td
                    style="
                      padding:30px;
                      color:#1f2937;
                      line-height:1.7;
                    "
                  >

                    <p>
                      Dear Admin,
                    </p>

                    <p>
                      A new internship application
                      has been submitted.
                    </p>

                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        border-collapse:collapse;
                        margin:24px 0;
                      "
                    >

                      ${tableRow(
                        "Application ID",
                        data.id
                      )}

                      ${tableRow(
                        "Enrolment Number",
                        data.enrolmentNumber
                      )}

                      ${tableRow(
                        "Centre Code",
                        data.centreCode
                      )}

                      ${tableRow(
                        "Student Name",
                        data.studentName
                      )}

                      ${tableRow(
                        "Father's Name",
                        data.fatherName
                      )}

                      ${tableRow(
                        "Sex",
                        data.sex
                      )}

                      ${tableRow(
                        "Date of Birth",
                        formatDate(
                          data.dateOfBirth
                        )
                      )}

                      ${tableRow(
                        "Address",
                        data.address
                      )}

                      ${tableRow(
                        "Pin Code",
                        data.pinCode
                      )}

                      ${tableRow(
                        "Phone Number",
                        data.phoneNumber
                      )}

                      ${tableRow(
                        "Email",
                        data.email
                      )}

                      ${tableRow(
                        "Status",
                        data.status
                      )}

                    </table>

                    <p>
                      Please review the application
                      from the Admin Dashboard.
                    </p>

                    <p>
                      Regards,<br />

                      <strong>
                        G Care Council
                      </strong>
                    </p>

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
    `New Internship Application\n\n` +
    `Application ID: ${safeValue(data.id)}\n` +
    `Enrolment Number: ${safeValue(data.enrolmentNumber)}\n` +
    `Student Name: ${safeValue(data.studentName)}\n` +
    `Phone: ${safeValue(data.phoneNumber)}\n` +
    `Email: ${safeValue(data.email)}\n` +
    `Status: ${safeValue(data.status)}\n`;

  return sendBrevoEmail({
    to:
      adminEmail,

    subject,

    htmlContent,

    textContent
  });
}


/* =====================================================
   USER APPROVED / REJECTED EMAIL
===================================================== */

async function sendInternshipStatusUserEmail(
  application
) {
  const data =
    normalizeApplication(
      application
    );

  const recipientEmail =
    String(
      data.email || ""
    )
      .trim()
      .toLowerCase();

  if (!recipientEmail) {
    throw new Error(
      "Internship applicant email is missing."
    );
  }

  const status =
    safeValue(
      data.status
    );

  let message =
    "";

  let additionalMessage =
    "";

  if (
    status === "Approved"
  ) {
    message =
      "We are pleased to inform you that your internship application has been approved.";

    additionalMessage =
      "Please wait for further instructions regarding the internship programme.";

  } else if (
    status === "Rejected"
  ) {
    message =
      "We regret to inform you that your internship application has not been approved.";

    additionalMessage =
      "Thank you for your interest in the G Care Council internship programme.";

  } else {
    message =
      `Your internship application status has been updated to ${status}.`;
  }

  const subject =
    `G Care Council - Internship Application ${status}`;

  const htmlContent = `
    <!DOCTYPE html>

    <html lang="en">

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
                style="
                  max-width:620px;
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
                      padding:24px;
                      text-align:center;
                    "
                  >

                    <h2>
                      G Care Council
                    </h2>

                    <p>
                      Internship Application Status
                    </p>

                  </td>

                </tr>

                <tr>

                  <td
                    style="
                      padding:30px;
                      color:#1f2937;
                      line-height:1.7;
                    "
                  >

                    <p>
                      Dear
                      <strong>
                        ${escapeHtml(
                          data.studentName
                        )}
                      </strong>,
                    </p>

                    <p>
                      ${escapeHtml(
                        message
                      )}
                    </p>

                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        border-collapse:collapse;
                        margin:24px 0;
                      "
                    >

                      ${tableRow(
                        "Application ID",
                        data.id
                      )}

                      ${tableRow(
                        "Enrolment Number",
                        data.enrolmentNumber
                      )}

                      ${tableRow(
                        "Student Name",
                        data.studentName
                      )}

                      ${tableRow(
                        "Status",
                        data.status
                      )}

                    </table>

                    ${
                      additionalMessage
                        ? `
                          <p>
                            ${escapeHtml(
                              additionalMessage
                            )}
                          </p>
                        `
                        : ""
                    }

                    <p>
                      Regards,<br />

                      <strong>
                        G Care Council
                      </strong>
                    </p>

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
    `Dear ${safeValue(data.studentName)},\n\n` +
    `${message}\n\n` +
    `Application ID: ${safeValue(data.id)}\n` +
    `Enrolment Number: ${safeValue(data.enrolmentNumber)}\n` +
    `Status: ${status}\n\n` +
    `${additionalMessage}\n\n` +
    `Regards,\nG Care Council`;

  return sendBrevoEmail({
    to:
      recipientEmail,

    subject,

    htmlContent,

    textContent
  });
}


/* =====================================================
   ADMIN APPROVED / REJECTED EMAIL
===================================================== */

async function sendInternshipStatusAdminEmail(
  application
) {
  const data =
    normalizeApplication(
      application
    );

  const adminEmail =
    String(
      process.env.ADMIN_EMAIL ||
      "info@gcarecouncil.in"
    )
      .trim()
      .toLowerCase();

  const subject =
    `Internship Application ${safeValue(
      data.status
    )} - ${safeValue(
      data.studentName
    )}`;

  const htmlContent = `
    <!DOCTYPE html>

    <html lang="en">

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
                style="
                  max-width:650px;
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
                      padding:24px;
                      text-align:center;
                    "
                  >

                    <h2>
                      Internship Status Updated
                    </h2>

                  </td>

                </tr>

                <tr>

                  <td
                    style="
                      padding:30px;
                      color:#1f2937;
                      line-height:1.7;
                    "
                  >

                    <p>
                      Dear Admin,
                    </p>

                    <p>
                      The following internship
                      application status has been
                      updated.
                    </p>

                    <table
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                      style="
                        border-collapse:collapse;
                        margin:24px 0;
                      "
                    >

                      ${tableRow(
                        "Application ID",
                        data.id
                      )}

                      ${tableRow(
                        "Enrolment Number",
                        data.enrolmentNumber
                      )}

                      ${tableRow(
                        "Centre Code",
                        data.centreCode
                      )}

                      ${tableRow(
                        "Student Name",
                        data.studentName
                      )}

                      ${tableRow(
                        "Phone Number",
                        data.phoneNumber
                      )}

                      ${tableRow(
                        "Email",
                        data.email
                      )}

                      ${tableRow(
                        "Updated Status",
                        data.status
                      )}

                    </table>

                    <p>
                      The applicant has also been
                      notified through email.
                    </p>

                    <p>
                      Regards,<br />

                      <strong>
                        G Care Council
                      </strong>
                    </p>

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
    `Internship application status updated.\n\n` +
    `Application ID: ${safeValue(data.id)}\n` +
    `Enrolment Number: ${safeValue(data.enrolmentNumber)}\n` +
    `Student Name: ${safeValue(data.studentName)}\n` +
    `Email: ${safeValue(data.email)}\n` +
    `Updated Status: ${safeValue(data.status)}\n`;

  return sendBrevoEmail({
    to:
      adminEmail,

    subject,

    htmlContent,

    textContent
  });
}


/* =====================================================
   EXPORT
===================================================== */

module.exports = {
  sendInternshipUserEmail,
  sendInternshipAdminEmail,
  sendInternshipStatusUserEmail,
  sendInternshipStatusAdminEmail
};