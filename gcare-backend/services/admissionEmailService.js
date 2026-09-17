const getValue = (data, camelCaseKey, fallback = "-") => {
  if (!data) return fallback;
  return data[camelCaseKey] || fallback;
};

const getCourseName = (admissionData) => {
  return (
    admissionData.courseName ||
    admissionData.educationCourse ||
    "-"
  );
};

const getSenderEmail = () => {
  return (
    process.env.BREVO_SENDER_EMAIL ||
    process.env.EMAIL_FROM ||
    process.env.EMAIL_USER
  );
};

const sendBrevoEmail = async ({ toEmail, toName, subject, htmlContent, textContent }) => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is missing in Render environment variables.");
  }

  const senderEmail = getSenderEmail();

  if (!senderEmail) {
    throw new Error("Sender email is missing. Please set BREVO_SENDER_EMAIL or EMAIL_FROM.");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      sender: {
        name: process.env.SENDER_NAME || "G Care Council Admission",
        email: senderEmail
      },
      to: [
        {
          email: toEmail,
          name: toName || ""
        }
      ],
      subject,
      htmlContent,
      textContent
    })
  });

  const result = await response.json();

  if (!response.ok) {
    console.log("BREVO ADMISSION EMAIL ERROR:", result);
    throw new Error(result.message || "Brevo admission email sending failed.");
  }

  console.log("Admission email sent successfully using Brevo:", result);
  return result;
};

const sendAdminAdmissionNotification = async (admissionData) => {
  try {
    const adminEmail = "info@gcarecouncil.in";

    const applicationNo = getValue(
      admissionData,
      "applicationNo"
    );

    const fullName = getValue(admissionData, "fullName", "Student");
    const courseName = getCourseName(admissionData);
    const branchName = admissionData.branch_name || "-";
    const submissionDate = admissionData.createdAt || admissionData.created_at || new Date().toISOString();

    const subject = "New Student Admission Application Submitted";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
        <h2 style="color: #005b96;">New Student Admission Application</h2>

        <p>Dear Admin,</p>

        <p>
          A new student admission application has been submitted successfully
          through the G Care Council website. The applicant has completed OTP
          verification and the application is waiting for admin review.
        </p>

        <table style="border-collapse: collapse; width: 100%; max-width: 650px;">
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Application No.</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${applicationNo}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Branch</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${branchName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Course Name</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${courseName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Applicant Name</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${fullName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Mobile</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${admissionData.mobile || "-"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Email</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${admissionData.email || "-"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Academic Level</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${admissionData.academicLevel || "-"}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Submission Date</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${submissionDate}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Status</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">Pending</td>
          </tr>
        </table>

        <p>Please review the application in the Admin Dashboard.</p>

        <p>
          Regards,<br/>
          <strong>G Care Council Admission Team</strong>
        </p>
      </div>
    `;

    const textContent = `
Dear Admin,

A new student admission application has been submitted successfully through the G Care Council website.

Application No: ${applicationNo}
Branch: ${branchName}
Course Name: ${courseName}
Applicant Name: ${fullName}
Mobile: ${admissionData.mobile || "-"}
Email: ${admissionData.email || "-"}
Academic Level: ${admissionData.academicLevel || "-"}
Submission Date: ${submissionDate}
Status: Pending

Please review the application in the Admin Dashboard.

Regards,
G Care Council Admission Team
`;

    await sendBrevoEmail({
      toEmail: adminEmail,
      toName: "Admin",
      subject,
      htmlContent,
      textContent
    });
  } catch (error) {
    console.log("ADMIN ADMISSION NOTIFICATION ERROR:", error);
    throw new Error(error.message || "Admin admission notification email failed.");
  }
};

const sendAdmissionStatusEmail = async (admissionData, status) => {
  try {
    if (!admissionData || !admissionData.email) {
      console.log("User email is not available. Status email skipped.");
      return;
    }

    const applicationNo = getValue(
      admissionData,
      "applicationNo"
    );

    const fullName = getValue(admissionData, "fullName", "Student");
    const courseName = getCourseName(admissionData);
    const branchName = admissionData.branch_name || "-";

    const normalizedStatus = status === "Approved" ? "Approved" : "Rejected";

    const subject =
      normalizedStatus === "Approved"
        ? `Student Admission Application Approved - ${applicationNo}`
        : "Admission Application Update - G Care Council";

    const htmlContent =
      normalizedStatus === "Approved"
        ? `
          <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
            <h2 style="color: #008a3d;">Admission Application Approved</h2>

            <p>Dear ${fullName},</p>

            <p>
              We are pleased to inform you that your Student Admission application has been
              <strong>approved</strong> by G Care Council.
            </p>

            <table style="border-collapse: collapse; width: 100%; max-width: 650px;">
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Application No.</strong></td>
                <td style="border: 1px solid #d1d5db; padding: 10px;">${applicationNo}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Branch</strong></td>
                <td style="border: 1px solid #d1d5db; padding: 10px;">${branchName}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Course Name</strong></td>
                <td style="border: 1px solid #d1d5db; padding: 10px;">${courseName}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Status</strong></td>
                <td style="border: 1px solid #d1d5db; padding: 10px;">Approved</td>
              </tr>
            </table>

            <p>
              Our admission team will contact you regarding the next steps in the
              admission process.
            </p>

            <p>
              Regards,<br/>
              <strong>G Care Council Admission Team</strong>
            </p>
          </div>
        `
        : `
          <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
            <h2 style="color: #c0392b;">Admission Application Update</h2>

            <p>Dear ${fullName},</p>

            <p>
              Thank you for submitting your admission application to G Care Council.
              After review, your application has been marked as
              <strong>rejected</strong>.
            </p>

            <table style="border-collapse: collapse; width: 100%; max-width: 650px;">
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Application No.</strong></td>
                <td style="border: 1px solid #d1d5db; padding: 10px;">${applicationNo}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Course Name</strong></td>
                <td style="border: 1px solid #d1d5db; padding: 10px;">${courseName}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Status</strong></td>
                <td style="border: 1px solid #d1d5db; padding: 10px;">Rejected</td>
              </tr>
            </table>

            <p>
              For more details, please contact the G Care Council admission team.
            </p>

            <p>
              Regards,<br/>
              <strong>G Care Council Admission Team</strong>
            </p>
          </div>
        `;

    const textContent =
      normalizedStatus === "Approved"
        ? `
Dear ${fullName},

Your Student Admission application has been approved.

Application No: ${applicationNo}
Branch: ${branchName}
Course Name: ${courseName}
Status: Approved

Our admission team will contact you regarding the next steps in the admission process.

Regards,
G Care Council Admission Team
`
        : `
Dear ${fullName},

Thank you for submitting your admission application to G Care Council. After review, your application has been marked as rejected.

Application No: ${applicationNo}
Course Name: ${courseName}
Status: Rejected

For more details, please contact the G Care Council admission team.

Regards,
G Care Council Admission Team
`;

    await sendBrevoEmail({
      toEmail: admissionData.email,
      toName: fullName,
      subject,
      htmlContent,
      textContent
    });
  } catch (error) {
    console.log("ADMISSION STATUS EMAIL ERROR:", error);
    throw new Error(error.message || "Admission status email failed.");
  }
};

const sendAdminAdmissionApprovalNotification = async (admissionData) => {
  try {
    const adminEmail = "info@gcarecouncil.in";

    const applicationNo = getValue(
      admissionData,
      "applicationNo"
    );

    const fullName = getValue(admissionData, "fullName", "Student");
    const courseName = getCourseName(admissionData);
    const branchName = admissionData.branch_name || "-";

    const subject = `Student Admission Application Approved - ${applicationNo}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
        <h2 style="color: #008a3d;">Student Admission Application Approved</h2>

        <p>Dear Admin,</p>

        <p>
          A student admission application has been <strong>approved</strong> by the admin.
        </p>

        <table style="border-collapse: collapse; width: 100%; max-width: 650px;">
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Application No.</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${applicationNo}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Branch</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${branchName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Course Name</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${courseName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Applicant Name</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${fullName}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;"><strong>Status</strong></td>
            <td style="border: 1px solid #d1d5db; padding: 10px;">Approved</td>
          </tr>
        </table>

        <p>
          Regards,<br/>
          <strong>G Care Council Admission Team</strong>
        </p>
      </div>
    `;

    const textContent = `
Dear Admin,

A student admission application has been approved.

Application No: ${applicationNo}
Branch: ${branchName}
Course Name: ${courseName}
Applicant Name: ${fullName}
Status: Approved

Regards,
G Care Council Admission Team
`;

    await sendBrevoEmail({
      toEmail: adminEmail,
      toName: "Admin",
      subject,
      htmlContent,
      textContent
    });
  } catch (error) {
    console.log("ADMIN ADMISSION APPROVAL NOTIFICATION ERROR:", error);
    throw new Error(error.message || "Admin admission approval notification email failed.");
  }
};

module.exports = {
  sendAdminAdmissionNotification,
  sendAdminAdmissionApprovalNotification,
  sendAdmissionStatusEmail
};