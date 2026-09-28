document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     ADMIN LOGIN CHECK
  ===================================================== */

  const isLoggedIn =
    localStorage.getItem("adminLoggedIn");

  const adminToken =
    localStorage.getItem("adminToken");

  if (
    isLoggedIn !== "true" ||
    !adminToken
  ) {
    window.location.href =
      "admin-login.html";
    return;
  }


  /* =====================================================
     API CONFIG
  ===================================================== */

  const API_BASE_URL =
    "https://backend-production-c5cb.up.railway.app/api";

  const BASE_URL =
    API_BASE_URL.replace("/api", "");


  /* =====================================================
     ADMIN AUTH

     The server issues a signed token at login.
     Every admin-only API request must send it in the
     Authorization header. On a 401 the session is
     cleared and the user is sent back to login.
  ===================================================== */

  function getAdminToken() {
    return localStorage.getItem("adminToken") || "";
  }

  function clearAdminSession() {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminToken");
  }

  async function adminFetch(url, options = {}) {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${getAdminToken()}`
    };

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401) {
      clearAdminSession();
      window.location.href = "admin-login.html";
      throw new Error("Admin session expired. Please log in again.");
    }

    return response;
  }

  /*
    Fetch a protected file as a blob and return an
    object URL that can be used for <img>, viewing,
    or downloading.
  */
  async function fetchProtectedBlobUrl(url) {
    const response = await adminFetch(url);

    if (!response.ok) {
      throw new Error("File could not be loaded.");
    }

    const blob = await response.blob();
    return window.URL.createObjectURL(blob);
  }

  /*
    After modal HTML is rendered, load any images that
    point at protected backend routes.
  */
  async function hydrateProtectedMedia(root) {
    if (!root) {
      return;
    }

    const elements = root.querySelectorAll("[data-auth-src]");

    for (const el of elements) {
      const url = el.getAttribute("data-auth-src");

      if (!url) {
        continue;
      }

      try {
        el.src = await fetchProtectedBlobUrl(url);
      } catch (error) {
        console.error("Protected file load failed:", error);
        el.replaceWith(
          Object.assign(document.createElement("p"), {
            textContent: "File could not be loaded."
          })
        );
      }
    }
  }


  /* =====================================================
     EXISTING ADMISSION ELEMENTS
  ===================================================== */

  const applicationsTableBody =
    document.getElementById(
      "applicationsTableBody"
    );

  const searchInput =
    document.getElementById(
      "searchInput"
    );

  const detailsModal =
    document.getElementById(
      "detailsModal"
    );

  const detailsContent =
    document.getElementById(
      "detailsContent"
    );

  const closeModalBtn =
    document.getElementById(
      "closeModalBtn"
    );

  const logoutBtn =
    document.getElementById(
      "logoutBtn"
    );


  let applications = [];


  /* =====================================================
     INTERNSHIP VARIABLES
  ===================================================== */

  let internshipApplications = [];

  let internshipSection = null;

  let internshipTableBody = null;

  let internshipSearchInput = null;


  /* =====================================================
     COMMON HELPERS
  ===================================================== */

  function getStatusClass(status) {

    if (status === "Approved") {
      return "status-approved";
    }

    if (status === "Rejected") {
      return "status-rejected";
    }

    return "status-pending";
  }


  function formatDate(value) {

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
      return value;
    }

    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    );
  }


  function safeValue(value) {

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "-";
    }

    return value;
  }


  function getValue(
    item,
    camelCaseKey,
    snakeCaseKey
  ) {

    return (
      item?.[camelCaseKey] ??
      item?.[snakeCaseKey] ??
      ""
    );
  }


  function getInternshipDate(
    item
  ) {

    const dateKeys = [
      "createdAt",
      "created_at",
      "submittedAt",
      "submitted_at",
      "applicationDate",
      "application_date",
      "date"
    ];


    for (
      let i = 0;
      i < dateKeys.length;
      i++
    ) {

      const value =
        item?.[dateKeys[i]];

      if (
        value
      ) {
        return value;
      }
    }

    return "";
  }


  function formatDateShort(
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
      return "-";
    }


    const day =
      String(
        date.getDate()
      ).padStart(
        2,
        "0"
      );

    const month =
      String(
        date.getMonth() + 1
      ).padStart(
        2,
        "0"
      );

    const year =
      date.getFullYear();


    return `${day}/${month}/${year}`;
  }


  /* =====================================================
     ESCAPE HTML
     Prevent broken HTML when displaying user data
  ===================================================== */

  function escapeHtml(value) {

    if (
      value === null ||
      value === undefined
    ) {
      return "";
    }

    return String(value)
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


  /* =====================================================
     DASHBOARD MESSAGE
  ===================================================== */

  function showDashboardMessage(
    message,
    type = "success"
  ) {

    let messageBox =
      document.getElementById(
        "dashboardMessage"
      );


    if (!messageBox) {

      messageBox =
        document.createElement(
          "div"
        );

      messageBox.id =
        "dashboardMessage";

      messageBox.className =
        "dashboard-message";


      const wrapper =
        document.querySelector(
          ".dashboard-wrapper"
        );


      if (wrapper) {

        wrapper.prepend(
          messageBox
        );

      }

    }


    messageBox.textContent =
      message;

    messageBox.className =
      `dashboard-message ${type}`;


    setTimeout(
      function () {

        messageBox.textContent =
          "";

        messageBox.className =
          "dashboard-message";

      },
      4000
    );
  }


  /* =====================================================
     MODAL MESSAGE
  ===================================================== */

  function showModalMessage(
    message,
    type = "success"
  ) {

    let messageBox =
      document.getElementById(
        "modalStatusMessage"
      );


    if (!messageBox) {

      messageBox =
        document.createElement(
          "p"
        );

      messageBox.id =
        "modalStatusMessage";

      messageBox.className =
        "modal-status-message";


      if (detailsContent) {

        detailsContent.prepend(
          messageBox
        );

      }

    }


    messageBox.textContent =
      message;

    messageBox.className =
      `modal-status-message ${type}`;
  }


  /* =====================================================
     READ JSON RESPONSE
  ===================================================== */

  async function readJsonResponse(
    response,
    fallbackMessage
  ) {

    const text =
      await response.text();


    try {

      return JSON.parse(
        text
      );

    } catch (error) {

      console.log(
        "NON JSON RESPONSE:",
        text
      );

      throw new Error(
        fallbackMessage
      );
    }
  }


  /* =====================================================
     ADMISSION STATS
  ===================================================== */

  function updateStats() {

    const totalCount =
      document.getElementById(
        "totalCount"
      );

    const pendingCount =
      document.getElementById(
        "pendingCount"
      );

    const approvedCount =
      document.getElementById(
        "approvedCount"
      );

    const rejectedCount =
      document.getElementById(
        "rejectedCount"
      );


    if (totalCount) {

      totalCount.textContent =
        applications.length;
    }


    if (pendingCount) {

      pendingCount.textContent =
        applications.filter(
          function (item) {

            return (
              item.status ===
              "Pending"
            );

          }
        ).length;
    }


    if (approvedCount) {

      approvedCount.textContent =
        applications.filter(
          function (item) {

            return (
              item.status ===
              "Approved"
            );

          }
        ).length;
    }


    if (rejectedCount) {

      rejectedCount.textContent =
        applications.filter(
          function (item) {

            return (
              item.status ===
              "Rejected"
            );

          }
        ).length;
    }
  }


  /* =====================================================
     INTERNSHIP STATS
  ===================================================== */

  function updateInternshipStats() {

    const internshipTotalCount =
      document.getElementById(
        "internshipTotalCount"
      );

    const internshipPendingCount =
      document.getElementById(
        "internshipPendingCount"
      );

    const internshipApprovedCount =
      document.getElementById(
        "internshipApprovedCount"
      );

    const internshipRejectedCount =
      document.getElementById(
        "internshipRejectedCount"
      );


    const total =
      internshipApplications.length;

    const pending =
      internshipApplications.filter(
        function (item) {

          return (
            (item.status || "Pending") ===
            "Pending"
          );

        }
      ).length;

    const approved =
      internshipApplications.filter(
        function (item) {

          return (
            item.status ===
            "Approved"
          );

        }
      ).length;

    const rejected =
      internshipApplications.filter(
        function (item) {

          return (
            item.status ===
            "Rejected"
          );

        }
      ).length;


    if (internshipTotalCount) {

      internshipTotalCount.textContent =
        total;
    }


    if (internshipPendingCount) {

      internshipPendingCount.textContent =
        pending;
    }


    if (internshipApprovedCount) {

      internshipApprovedCount.textContent =
        approved;
    }


    if (internshipRejectedCount) {

      internshipRejectedCount.textContent =
        rejected;
    }
  }


  /* =====================================================
     ADMISSION TABLE
  ===================================================== */

  function renderTable(data) {

    if (!applicationsTableBody) {
      return;
    }


    applicationsTableBody.innerHTML =
      "";


    if (!data.length) {

      applicationsTableBody.innerHTML = `
        <tr>
          <td
            colspan="10"
            style="text-align:center;">
            No admission forms found.
          </td>
        </tr>
      `;

      return;
    }


    data.forEach(
      function (item, index) {

        const applicationNo =
          getValue(
            item,
            "applicationNo",
            "application_no"
          );


        const courseName =
          getValue(
            item,
            "courseName",
            "course_name"
          );


        const fullName =
          getValue(
            item,
            "fullName",
            "full_name"
          );


        const createdAt =
          getValue(
            item,
            "createdAt",
            "created_at"
          ) ||
          item.submittedAt;


        applicationsTableBody.innerHTML += `
          <tr>

            <td>
              ${index + 1}
            </td>

            <td>
              ${escapeHtml(
                safeValue(
                  applicationNo
                )
              )}
            </td>

            <td>
              ${escapeHtml(
                safeValue(
                  item.title
                )
              )}
              ${escapeHtml(
                safeValue(
                  fullName
                )
              )}
            </td>

            <td>
              ${escapeHtml(
                safeValue(
                  courseName
                )
              )}
            </td>

            <td>
              ${escapeHtml(
                safeValue(
                  item.mobile
                )
              )}
            </td>

            <td>
              ${escapeHtml(
                safeValue(
                  item.email
                )
              )}
            </td>

            <td>

              <span
                class="status-badge ${getStatusClass(
                  item.status
                )}">
                ${escapeHtml(
                  safeValue(
                    item.status ||
                    "Pending"
                  )
                )}
              </span>

            </td>

            <td>
              ${escapeHtml(
                formatDate(
                  createdAt
                )
              )}
            </td>

            <td>

              <button
                type="button"
                class="action-btn"
                data-id="${escapeHtml(
                  item.id
                )}">
                View
              </button>

            </td>

            <td>

              <button
                type="button"
                class="delete-btn"
                data-delete-id="${escapeHtml(
                  item.id
                )}"
                title="Delete application">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>

            </td>

          </tr>
        `;
      }
    );
  }


  /* =====================================================
     FETCH ADMISSIONS
  ===================================================== */

  async function fetchAdmissions() {

    if (!applicationsTableBody) {
      return;
    }


    try {

      applicationsTableBody.innerHTML = `
        <tr>
          <td
            colspan="10"
            style="text-align:center;">
            Loading admission forms...
          </td>
        </tr>
      `;


      const response =
        await adminFetch(
          `${API_BASE_URL}/admissions`
        );


      const result =
        await readJsonResponse(
          response,
          "Admissions API returned an invalid response."
        );


      if (
        !response.ok ||
        !result.success
      ) {

        throw new Error(
          result.message ||
          "Failed to fetch admission forms."
        );
      }


      applications =
        Array.isArray(
          result.data
        )
          ? result.data
          : [];


      updateStats();

      renderTable(
        applications
      );


    } catch (error) {

      console.error(
        "Fetch admissions error:",
        error
      );


      applicationsTableBody.innerHTML = `
        <tr>
          <td
            colspan="10"
            style="
              text-align:center;
              color:#c30000;
            ">
            ${escapeHtml(
              error.message
            )}
          </td>
        </tr>
      `;
    }
  }


  /* =====================================================
     DELETE ADMISSION
  ===================================================== */

  async function deleteApplication(id) {

    if (
      !confirm(
        "Are you sure you want to delete this application?"
      )
    ) {
      return;
    }


    try {

      const response =
        await adminFetch(
          `${API_BASE_URL}/admissions/${id}`,
          {
            method: "DELETE"
          }
        );


      if (response.status === 204) {

        showDashboardMessage(
          "Application deleted successfully.",
          "success"
        );


        await fetchAdmissions();


        return;
      }


      const result =
        await readJsonResponse(
          response,
          "Delete application API returned an invalid response."
        );


      if (
        !response.ok ||
        !result.success
      ) {

        throw new Error(
          result.message ||
          "Failed to delete application."
        );
      }


      applications =
        applications.filter(
          function (item) {
            return (
              String(item.id) !==
              String(id)
            );
          }
        );

      updateStats();
      renderTable(applications);

      showDashboardMessage(
        result.message ||
        "Application deleted successfully.",
        "success"
      );


    } catch (error) {

      console.error(
        "Delete application error:",
        error
      );


      showDashboardMessage(
        error.message ||
        "Failed to delete application.",
        "error"
      );
    }
  }


  /* =====================================================
     CREATE DETAIL ITEM
  ===================================================== */

  function createDetailItem(
    label,
    value
  ) {

    let displayValue =
      value;


    if (
      typeof value ===
      "object" &&
      value !== null
    ) {

      displayValue =
        JSON.stringify(
          value,
          null,
          2
        );
    }


    return `
      <div class="detail-item">

        <strong>
          ${escapeHtml(
            label
          )}
        </strong>

        <span>
          ${escapeHtml(
            safeValue(
              displayValue
            )
          )}
        </span>

      </div>
    `;
  }


  /* =====================================================
     NORMALIZE FILE URL
  ===================================================== */

  function normalizeFileUrl(
    filePath
  ) {

    if (!filePath) {
      return "";
    }


    let normalizedPath =
      String(filePath)
        .replace(
          /\\/g,
          "/"
        );


    const uploadIndex =
      normalizedPath.indexOf(
        "uploads/"
      );


    if (
      uploadIndex !==
      -1
    ) {

      normalizedPath =
        normalizedPath.substring(
          uploadIndex
        );
    }


    if (
      normalizedPath.startsWith(
        "http://"
      ) ||
      normalizedPath.startsWith(
        "https://"
      )
    ) {

      return normalizedPath;
    }


    if (
      normalizedPath.startsWith(
        "/uploads"
      )
    ) {

      return (
        `${BASE_URL}` +
        normalizedPath
      );
    }


    if (
      normalizedPath.startsWith(
        "uploads"
      )
    ) {

      return (
        `${BASE_URL}/` +
        normalizedPath
      );
    }


    return (
      `${BASE_URL}/uploads/admissions/` +
      normalizedPath
    );
  }


  /* =====================================================
     IMAGE FILE CHECK
  ===================================================== */

  function isImageFile(
    fileUrl,
    mimeType
  ) {

    const url =
      String(
        fileUrl || ""
      ).toLowerCase();


    const type =
      String(
        mimeType || ""
      ).toLowerCase();


    return (
      type.startsWith(
        "image/"
      ) ||
      url.includes(
        ".jpg"
      ) ||
      url.includes(
        ".jpeg"
      ) ||
      url.includes(
        ".png"
      ) ||
      url.includes(
        ".webp"
      )
    );
  }


  /* =====================================================
     FIND DOCUMENT BY TYPE
  ===================================================== */

  function findDocumentByType(
    documents,
    expectedType
  ) {

    if (
      !Array.isArray(
        documents
      )
    ) {

      return null;
    }


    return documents.find(
      function (doc) {

        const documentType =
          doc.documentType ||
          doc.document_type ||
          doc.type ||
          "";


        return (
          documentType
            .toLowerCase() ===
          expectedType
            .toLowerCase()
        );
      }
    );
  }


  /* =====================================================
     GET DOCUMENT FILE PATH
  ===================================================== */

  function getDocumentFilePath(
    item,
    documentType,
    camelCaseKey,
    snakeCaseKey
  ) {

    const document =
      findDocumentByType(
        item.documents,
        documentType
      );


    if (document) {

      return {

        documentId:
          document.id ||
          document.documentId ||
          "",

        filePath:
          document.filePath ||
          document.file_path ||
          document.path ||
          "",

        fileName:
          document.fileName ||
          document.file_name ||
          "Uploaded File",

        mimeType:
          document.mimeType ||
          document.mime_type ||
          ""
      };
    }


    const directFilePath =
      getValue(
        item,
        camelCaseKey,
        snakeCaseKey
      );


    if (directFilePath) {

      return {

        filePath:
          directFilePath,

        fileName:
          "Uploaded File",

        mimeType:
          ""
      };
    }


    return null;
  }


  /* =====================================================
     SANITIZE FILE NAME
  ===================================================== */

  function sanitizeFileName(
    fileName
  ) {

    return String(
      fileName ||
      "downloaded-file"
    )
      .replace(
        /[\\/:\*?"<>|]/g,
        "-"
      )
      .trim();
  }


  /* =====================================================
     CREATE FILE CARD
  ===================================================== */

  function createFileCard(
    title,
    fileData
  ) {

    if (
      !fileData ||
      !fileData.filePath
    ) {

      return `
        <div class="file-card">

          <h4>
            ${escapeHtml(
              title
            )}
          </h4>

          <p>
            No file uploaded
          </p>

        </div>
      `;
    }


    /*
      Every stored document (Google Drive or legacy
      local file) is served through the authenticated
      document endpoint — /uploads is no longer public.
    */
    const isProtected =
      Boolean(fileData.documentId);


    const fileUrl =
      isProtected
        ? `${API_BASE_URL}/admissions/documents/${encodeURIComponent(
            fileData.documentId
          )}/file`
        : normalizeFileUrl(
            fileData.filePath
          );


    const fileName =
      sanitizeFileName(
        fileData.fileName ||
        title
      );


    const imageFile =
      isImageFile(
        fileUrl,
        fileData.mimeType
      );


    return `
      <div class="file-card">

        <h4>
          ${escapeHtml(
            title
          )}
        </h4>

        ${
          imageFile

            ? isProtected
              ? `
                <img
                  data-auth-src="${escapeHtml(
                    fileUrl
                  )}"
                  alt="${escapeHtml(
                    title
                  )}" />
              `
              : `
                <img
                  src="${escapeHtml(
                    fileUrl
                  )}"
                  alt="${escapeHtml(
                    title
                  )}" />
              `

            : `
              <p class="pdf-file-text">
                PDF / Document uploaded
              </p>
            `
        }


        <p class="uploaded-file-name">
          ${escapeHtml(
            fileName
          )}
        </p>


        <div class="file-actions">

          ${
            isProtected
              ? `
                <a
                  href="#"
                  class="view-file-btn"
                  data-protected-url="${escapeHtml(
                    fileUrl
                  )}">
                  View
                </a>
              `
              : `
                <a
                  href="${escapeHtml(
                    fileUrl
                  )}"
                  target="_blank"
                  rel="noopener"
                  class="view-file-btn">
                  View
                </a>
              `
          }


          <button
            type="button"
            class="download-file-btn"
            data-file-url="${escapeHtml(
              fileUrl
            )}"
            data-protected="${isProtected ? "1" : "0"}"
            data-file-name="${escapeHtml(
              fileName
            )}">
            Download
          </button>

        </div>

      </div>
    `;
  }


  /* =====================================================
     DOWNLOAD FILE
  ===================================================== */

  async function downloadFile(
    fileUrl,
    fileName,
    isProtected
  ) {

    try {

      if (!fileUrl) {

        throw new Error(
          "File URL is missing."
        );
      }


      const response =
        isProtected
          ? await adminFetch(fileUrl)
          : await fetch(
              fileUrl
            );


      if (!response.ok) {

        throw new Error(
          "File download failed."
        );
      }


      const blob =
        await response.blob();


      const blobUrl =
        window.URL.createObjectURL(
          blob
        );


      const downloadLink =
        document.createElement(
          "a"
        );


      downloadLink.href =
        blobUrl;


      downloadLink.download =
        sanitizeFileName(
          fileName ||
          "downloaded-file"
        );


      document.body.appendChild(
        downloadLink
      );


      downloadLink.click();


      document.body.removeChild(
        downloadLink
      );


      window.URL.revokeObjectURL(
        blobUrl
      );


    } catch (error) {

      console.error(
        "Download error:",
        error
      );


      alert(
        "Unable to download the file. Please try again."
      );
    }
  }


  /* =====================================================
     OPEN ADMISSION DETAILS
  ===================================================== */

  async function openDetails(
    id
  ) {

    try {

      detailsContent.innerHTML =
        `<p>Loading application details...</p>`;


      detailsModal.classList.add(
        "show"
      );


      const response =
        await adminFetch(
          `${API_BASE_URL}/admissions/${id}`
        );


      const result =
        await readJsonResponse(
          response,
          "Admission details API returned an invalid response."
        );


      if (
        !response.ok ||
        !result.success
      ) {

        throw new Error(
          result.message ||
          "Failed to fetch admission details."
        );
      }


      const item =
        result.data;


      const applicationNo =
        getValue(
          item,
          "applicationNo",
          "application_no"
        );


      const courseName =
        getValue(
          item,
          "courseName",
          "course_name"
        );


      const fullName =
        getValue(
          item,
          "fullName",
          "full_name"
        );


      const hasAadhaar =
        getValue(
          item,
          "hasAadhaar",
          "has_aadhaar"
        );


      const aadhaarNumber =
        getValue(
          item,
          "aadhaarNumber",
          "aadhaar_number"
        );


      const parentName =
        getValue(
          item,
          "parentName",
          "parent_name"
        );


      const otherCaste =
        getValue(
          item,
          "otherCaste",
          "other_caste"
        );


      const presentAddress =
        getValue(
          item,
          "presentAddress",
          "present_address"
        );


      const pinCode =
        getValue(
          item,
          "pinCode",
          "pin_code"
        );


      const permanentAddress =
        getValue(
          item,
          "permanentAddress",
          "permanent_address"
        );


      const academicLevel =
        getValue(
          item,
          "academicLevel",
          "academic_level"
        );


      const educationCourse =
        getValue(
          item,
          "educationCourse",
          "education_course"
        );


      const educationBoard =
        getValue(
          item,
          "educationBoard",
          "education_board"
        );


      const educationSubjects =
        getValue(
          item,
          "educationSubjects",
          "education_subjects"
        );


      const educationYear =
        getValue(
          item,
          "educationYear",
          "education_year"
        );


      const educationGrade =
        getValue(
          item,
          "educationGrade",
          "education_grade"
        );


      const createdAt =
        getValue(
          item,
          "createdAt",
          "created_at"
        ) ||
        item.submittedAt;


      const photoUpload =
        getDocumentFilePath(
          item,
          "Passport Size Photo",
          "photoUpload",
          "photo_upload"
        );


      const aadhaarUpload =
        getDocumentFilePath(
          item,
          "Aadhaar Card",
          "aadhaarUpload",
          "aadhaar_upload"
        );


      const educationCertificateUpload =
        getDocumentFilePath(
          item,
          "Education Certificate",
          "educationCertificateUpload",
          "education_certificate_upload"
        );


      const parentSignature =
        getDocumentFilePath(
          item,
          "Parent / Guardian Signature",
          "parentSignature",
          "parent_signature"
        );


      detailsContent.innerHTML = `

        <div class="details-grid">

          ${createDetailItem(
            "Application No.",
            applicationNo
          )}

          ${createDetailItem(
            "Status",
            item.status
          )}

          ${createDetailItem(
            "Course",
            courseName
          )}

          ${createDetailItem(
            "Branch",
            item?.branch_name ||
            item?.branchName ||
            item?.branch ||
            "-"
          )}

          ${createDetailItem(
            "Name",
            `${safeValue(
              item.title
            )} ${safeValue(
              fullName
            )}`
          )}

          ${createDetailItem(
            "Date of Birth",
            item.dob
          )}

          ${createDetailItem(
            "Age",
            item.age
          )}

          ${createDetailItem(
            "Gender",
            item.gender
          )}

          ${createDetailItem(
            "Aadhaar Available",
            hasAadhaar
          )}

          ${createDetailItem(
            "Aadhaar Number",
            aadhaarNumber
          )}

          ${createDetailItem(
            "Parent / Guardian Name",
            parentName
          )}

          ${createDetailItem(
            "Nationality",
            item.nationality
          )}

          ${createDetailItem(
            "Caste",
            item.caste
          )}

          ${createDetailItem(
            "Other Caste",
            otherCaste
          )}

          ${createDetailItem(
            "Present Address",
            presentAddress
          )}

          ${createDetailItem(
            "State",
            item.state
          )}

          ${createDetailItem(
            "District",
            item.district
          )}

          ${createDetailItem(
            "Pin Code",
            pinCode
          )}

          ${createDetailItem(
            "Permanent Address",
            permanentAddress
          )}

          ${createDetailItem(
            "Mobile",
            item.mobile
          )}

          ${createDetailItem(
            "Alternate Contact 1",
            getValue(
              item,
              "alternateOne",
              "alternate_one"
            )
          )}

          ${createDetailItem(
            "Email",
            item.email
          )}

          ${createDetailItem(
            "Academic Level",
            academicLevel
          )}

          ${createDetailItem(
            "Qualification / Course",
            educationCourse
          )}

          ${createDetailItem(
            "University / Board",
            educationBoard
          )}

          ${createDetailItem(
            "Subjects",
            educationSubjects
          )}

          ${createDetailItem(
            "Year of Passing",
            educationYear
          )}

          ${createDetailItem(
            "Grade / Percentage",
            educationGrade
          )}

          ${createDetailItem(
            "Declaration Date",
            getValue(
              item,
              "declarationDate",
              "declaration_date"
            )
          )}

          ${createDetailItem(
            "Place",
            item.place
          )}

          ${createDetailItem(
            "Submitted At",
            formatDate(
              createdAt
            )
          )}

        </div>


        <h3>
          Uploaded Documents
        </h3>


        <div class="file-grid">

          ${createFileCard(
            "Passport Size Photo",
            photoUpload
          )}

          ${createFileCard(
            "Aadhaar Card",
            aadhaarUpload
          )}

          ${createFileCard(
            "Education Certificate",
            educationCertificateUpload
          )}

          ${createFileCard(
            "Parent / Guardian Signature",
            parentSignature
          )}

        </div>


        <div
          id="modalStatusMessage"
          class="modal-status-message">
        </div>


        <div class="status-actions">

          <button
            type="button"
            class="approve-btn"
            data-status="Approved"
            data-id="${escapeHtml(
              item.id
            )}">
            Approve
          </button>


          <button
            type="button"
            class="reject-btn"
            data-status="Rejected"
            data-id="${escapeHtml(
              item.id
            )}">
            Reject
          </button>

        </div>
      `;


      hydrateProtectedMedia(
        detailsContent
      );


    } catch (error) {

      console.error(
        "Open details error:",
        error
      );


      detailsContent.innerHTML = `
        <p
          style="
            color:#c30000;
            font-family:Arial,sans-serif;
            font-weight:700;
          ">
          ${escapeHtml(
            error.message
          )}
        </p>
      `;
    }
  }


  /* =====================================================
     ADMISSION STATUS UPDATE
  ===================================================== */

  async function updateStatus(
    id,
    status
  ) {

    try {

      showModalMessage(
        `Updating application status to ${status}...`,
        "info"
      );


      const response =
        await adminFetch(
          `${API_BASE_URL}/admissions/${id}/status`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                status
              })
          }
        );


      const result =
        await readJsonResponse(
          response,
          "Status update API returned an invalid response."
        );


      if (
        !response.ok ||
        !result.success
      ) {

        throw new Error(
          result.message ||
          "Failed to update admission status."
        );
      }


      showModalMessage(
        result.message ||
        `Application ${status} successfully.`,
        "success"
      );


      showDashboardMessage(
        result.message ||
        `Application ${status} successfully.`,
        "success"
      );


      await fetchAdmissions();


      setTimeout(
        function () {

          detailsModal.classList.remove(
            "show"
          );

        },
        1800
      );


    } catch (error) {

      console.error(
        "Update status error:",
        error
      );


      showModalMessage(
        error.message ||
        "Failed to update admission status.",
        "error"
      );
    }
  }


  /* =====================================================
     CREATE INTERNSHIP SECTION
  ===================================================== */

  function createInternshipSection() {

    if (internshipSection) {
      return;
    }


    internshipSection =
      document.createElement(
        "section"
      );


    internshipSection.id =
      "internshipApplicationsSection";


    internshipSection.style.cssText = `
      display:none;
      margin:25px 20px;
      background:#ffffff;
      border-radius:18px;
      padding:28px;
      box-shadow:0 4px 20px rgba(0,0,0,0.08);
      border:1px solid #dbeaf2;
    `;


    internshipSection.innerHTML = `

      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:20px;
          flex-wrap:wrap;
          margin-bottom:20px;
        ">

        <div>

          <div
            style="
              color:#0084bd;
              font-size:14px;
              font-weight:800;
              letter-spacing:1px;
              text-transform:uppercase;
              margin-bottom:6px;
            ">
            INTERNSHIP
          </div>


          <h2
            style="
              margin:0;
              color:#063b5b;
              font-size:28px;
            ">
            Internship Applications
          </h2>


          <p
            style="
              margin:7px 0 0;
              color:#64748b;
            ">
            View and manage internship applications.
          </p>

        </div>


        <input
          type="text"
          id="internshipSearchInput"
          placeholder="Search name, email, phone, enrolment..."
          style="
            width:330px;
            max-width:100%;
            padding:13px 16px;
            border:1px solid #b9d7e5;
            border-radius:10px;
            font-size:15px;
            outline:none;
          "
        />

      </div>


      <div
        class="stats-grid"
        style="
          margin-bottom:20px;
        ">

        <article class="stat-card">
          <span class="stat-label">Total Applications</span>
          <strong id="internshipTotalCount">0</strong>
        </article>

        <article class="stat-card">
          <span class="stat-label">Pending</span>
          <strong id="internshipPendingCount">0</strong>
        </article>

        <article class="stat-card">
          <span class="stat-label">Approved</span>
          <strong id="internshipApprovedCount">0</strong>
        </article>

        <article class="stat-card">
          <span class="stat-label">Rejected</span>
          <strong id="internshipRejectedCount">0</strong>
        </article>

      </div>


      <div
        id="internshipLoadingMessage"
        style="
          display:none;
          text-align:center;
          padding:20px;
          color:#64748b;
        ">
      </div>


      <div
        style="
          overflow-x:auto;
          width:100%;
        ">

        <table
          style="
            width:100%;
            border-collapse:collapse;
            min-width:950px;
          ">

          <thead>

            <tr
              style="
                background:#eaf7fc;
                color:#063b5b;
              ">

              <th
                style="
                  padding:13px;
                  text-align:left;
                ">
                S.No
              </th>


              <th
                style="
                  padding:13px;
                  text-align:left;
                ">
                Enrolment No.
              </th>


              <th
                style="
                  padding:13px;
                  text-align:left;
                ">
                Student Name
              </th>


              <th
                style="
                  padding:13px;
                  text-align:left;
                ">
                Centre Code
              </th>


              <th
                style="
                  padding:13px;
                  text-align:left;
                ">
                Phone
              </th>


              <th
                style="
                  padding:13px;
                  text-align:left;
                ">
                Email
              </th>


              <th
                style="
                  padding:13px;
                  text-align:left;
                ">
                Status
              </th>


              <th
                style="
                  padding:13px;
                  text-align:left;
                ">
                Date
              </th>


              <th
                style="
                  padding:13px;
                  text-align:left;
                ">
                Action
              </th>


              <th
                style="
                  padding:13px;
                  text-align:left;
                ">
                Delete
              </th>

            </tr>

          </thead>


          <tbody
            id="internshipTableBody">
          </tbody>

        </table>

      </div>


      <div
        id="internshipEmptyMessage"
        style="
          display:none;
          text-align:center;
          padding:25px;
          color:#64748b;
        ">
      </div>
    `;


    const wrapper =
      document.querySelector(
        ".dashboard-wrapper"
      );


    if (wrapper) {

      const existingStudentSection =
        applicationsTableBody
          ? applicationsTableBody.closest(
              "section"
            )
          : null;


      if (
        existingStudentSection
      ) {

        wrapper.insertBefore(
          internshipSection,
          existingStudentSection
        );

      } else {

        wrapper.appendChild(
          internshipSection
        );
      }

    } else {

      document.body.appendChild(
        internshipSection
      );
    }


    internshipTableBody =
      document.getElementById(
        "internshipTableBody"
      );


    internshipSearchInput =
      document.getElementById(
        "internshipSearchInput"
      );


    if (internshipSearchInput) {

      internshipSearchInput.addEventListener(
        "input",
        function () {

          renderInternshipTable(
            filterInternships(
              this.value
            )
          );
        }
      );
    }


    if (internshipTableBody) {

      internshipTableBody.addEventListener(
        "click",
        function (event) {

          const viewBtn =
            event.target.closest(
              ".internship-view-btn"
            );


          if (!viewBtn) {
            return;
          }


          const id =
            viewBtn.getAttribute(
              "data-internship-id"
            );


          if (!id) {
            return;
          }


          openInternshipDetails(
            id
          );
        }
      );
    }


    if (internshipTableBody) {

      internshipTableBody.addEventListener(
        "click",
        function (event) {

          const deleteBtn =
            event.target.closest(
              ".internship-delete-btn"
            );


          if (!deleteBtn) {
            return;
          }


          const id =
            deleteBtn.getAttribute(
              "data-internship-id"
            );


          if (!id) {
            return;
          }


          deleteInternship(
            id
          );
        }
      );
    }
  }


  /* =====================================================
     SHOW ADMISSION SECTION
  ===================================================== */

  function showAdmissionSection() {

    const contentCard =
      document.querySelector(
        ".content-card"
      );

    const statsGrid =
      document.querySelector(
        ".stats-grid"
      );


    if (contentCard) {
      contentCard.style.display = "";
    }


    if (statsGrid) {
      statsGrid.style.display = "";
    }


    if (internshipSection) {
      internshipSection.style.display =
        "none";
    }


    document
      .querySelectorAll(
        ".module-card"
      )
      .forEach(function (card) {
        card.classList.remove(
          "active"
        );
      });


    const admissionCard =
      document.querySelector(
        '[data-form-type="admission"]'
      );


    if (admissionCard) {
      admissionCard.classList.add(
        "active"
      );
    }


    fetchAdmissions();
  }


  /* =====================================================
     SHOW INTERNSHIP SECTION
  ===================================================== */

  function showInternshipSection() {

    createInternshipSection();


    const contentCard =
      document.querySelector(
        ".content-card"
      );

    const statsGrid =
      document.querySelector(
        ".stats-grid"
      );


    if (contentCard) {
      contentCard.style.display = "none";
    }


    if (statsGrid) {
      statsGrid.style.display = "none";
    }


    document
      .querySelectorAll(
        ".module-card"
      )
      .forEach(function (card) {
        card.classList.remove(
          "active"
        );
      });


    const internshipCard =
      document.querySelector(
        '[data-form-type="internship"]'
      );


    if (internshipCard) {
      internshipCard.classList.add(
        "active"
      );
    }


    internshipSection.style.display =
      "block";


    internshipSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    fetchInternships();
  }


  /* =====================================================
     FETCH INTERNSHIPS
  ===================================================== */

  async function fetchInternships() {

    if (!internshipTableBody) {
      createInternshipSection();
    }


    const loadingMessage =
      document.getElementById(
        "internshipLoadingMessage"
      );


    const emptyMessage =
      document.getElementById(
        "internshipEmptyMessage"
      );


    if (loadingMessage) {

      loadingMessage.style.display =
        "block";

      loadingMessage.textContent =
        "Loading internship applications...";
    }


    if (emptyMessage) {

      emptyMessage.style.display =
        "none";
    }


    if (internshipTableBody) {

      internshipTableBody.innerHTML =
        "";
    }


    try {

      const response =
        await adminFetch(
          `${API_BASE_URL}/internships`
        );


      const result =
        await readJsonResponse(
          response,
          "Internship API returned an invalid response."
        );


      if (
        !response.ok ||
        !result.success
      ) {

        throw new Error(
          result.message ||
          "Failed to fetch internship applications."
        );
      }


      internshipApplications =
        Array.isArray(
          result.data
        )
          ? result.data
          : [];


      updateInternshipStats();

      renderInternshipTable(
        internshipApplications
      );


    } catch (error) {

      console.error(
        "Fetch internships error:",
        error
      );


      internshipApplications = [];

      updateInternshipStats();


      if (internshipTableBody) {

        internshipTableBody.innerHTML = `
          <tr>

            <td
              colspan="10"
              style="
                text-align:center;
                padding:25px;
                color:#c30000;
              ">

              ${escapeHtml(
                error.message
              )}

            </td>

          </tr>
        `;
      }


    } finally {

      if (loadingMessage) {

        loadingMessage.style.display =
          "none";
      }
    }
  }


  /* =====================================================
     INTERNSHIP FILTER
  ===================================================== */

  function filterInternships(
    searchValue
  ) {

    const search =
      String(
        searchValue || ""
      )
        .toLowerCase()
        .trim();


    if (!search) {

      return internshipApplications;
    }


    return internshipApplications.filter(
      function (item) {

        const enrolmentNumber =
          getValue(
            item,
            "enrolmentNumber",
            "enrolment_number"
          );


        const centreCode =
          getValue(
            item,
            "centreCode",
            "centre_code"
          );


        const studentName =
          getValue(
            item,
            "studentName",
            "student_name"
          );


        const phoneNumber =
          getValue(
            item,
            "phoneNumber",
            "phone_number"
          );


        const email =
          getValue(
            item,
            "email",
            "email"
          );


        return (

          String(
            enrolmentNumber
          )
            .toLowerCase()
            .includes(
              search
            ) ||

          String(
            centreCode
          )
            .toLowerCase()
            .includes(
              search
            ) ||

          String(
            studentName
          )
            .toLowerCase()
            .includes(
              search
            ) ||

          String(
            phoneNumber
          )
            .toLowerCase()
            .includes(
              search
            ) ||

          String(
            email
          )
            .toLowerCase()
            .includes(
              search
            )
        );
      }
    );
  }


  /* =====================================================
     INTERNSHIP TABLE
  ===================================================== */

  function renderInternshipTable(
    data
  ) {

    if (!internshipTableBody) {
      return;
    }


    internshipTableBody.innerHTML =
      "";


    const emptyMessage =
      document.getElementById(
        "internshipEmptyMessage"
      );


    if (!data.length) {

      if (emptyMessage) {

        emptyMessage.style.display =
          "block";

        emptyMessage.textContent =
          "No internship applications found.";
      }


      return;
    }


    if (emptyMessage) {

      emptyMessage.style.display =
        "none";
    }


    data.forEach(
      function (item, index) {

        const enrolmentNumber =
          getValue(
            item,
            "enrolmentNumber",
            "enrolment_number"
          );


        const centreCode =
          getValue(
            item,
            "centreCode",
            "centre_code"
          );


        const studentName =
          getValue(
            item,
            "studentName",
            "student_name"
          );


        const phoneNumber =
          getValue(
            item,
            "phoneNumber",
            "phone_number"
          );


        const email =
          getValue(
            item,
            "email",
            "email"
          );


        const createdAt =
          item.created_at || "";


        const status =
          item.status ||
          "Pending";

        internshipTableBody.innerHTML += `

          <tr
            style="
              border-bottom:1px solid #e5edf2;
            ">

            <td
              style="padding:13px;">
              ${index + 1}
            </td>


            <td
              style="padding:13px;">
              ${escapeHtml(
                safeValue(
                  enrolmentNumber
                )
              )}
            </td>


            <td
              style="
                padding:13px;
                font-weight:600;
              ">
              ${escapeHtml(
                safeValue(
                  studentName
                )
              )}
            </td>


            <td
              style="padding:13px;">
              ${escapeHtml(
                safeValue(
                  centreCode
                )
              )}
            </td>


            <td
              style="padding:13px;">
              ${escapeHtml(
                safeValue(
                  phoneNumber
                )
              )}
            </td>


            <td
              style="padding:13px;">
              ${escapeHtml(
                safeValue(
                  email
                )
              )}
            </td>


            <td
              style="padding:13px;">

              <span
                class="status-badge ${getStatusClass(
                  status
                )}">

                ${escapeHtml(
                  safeValue(
                    status
                  )
                )}

              </span>

            </td>


            <td
              style="padding:13px;">
              ${escapeHtml(
                formatDateShort(
                  createdAt
                )
              )}
            </td>


            <td
              style="padding:13px;">

              <button
                type="button"
                class="action-btn internship-view-btn"
                data-internship-id="${escapeHtml(
                  item.id
                )}">
                View
              </button>

            </td>


            <td
              style="padding:13px;">

              <button
                type="button"
                class="delete-btn internship-delete-btn"
                data-internship-id="${escapeHtml(
                  item.id
                )}"
                title="Delete internship application">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>

            </td>

          </tr>
        `;
      }
    );
  }


  /* =====================================================
     DELETE INTERNSHIP
  ===================================================== */

  async function deleteInternship(id) {

    if (
      !confirm(
        "Are you sure you want to delete this application?"
      )
    ) {
      return;
    }


    try {

      const response =
        await adminFetch(
          `${API_BASE_URL}/internships/${id}`,
          {
            method: "DELETE"
          }
        );


      if (response.status === 204) {

        showDashboardMessage(
          "Internship application deleted successfully.",
          "success"
        );


        await fetchInternships();


        return;
      }


      const result =
        await readJsonResponse(
          response,
          "Delete internship API returned an invalid response."
        );


      if (
        !response.ok ||
        !result.success
      ) {

        throw new Error(
          result.message ||
          "Failed to delete internship application."
        );
      }


      showDashboardMessage(
        result.message ||
        "Internship application deleted successfully.",
        "success"
      );


      await fetchInternships();


    } catch (error) {

      console.error(
        "Delete internship error:",
        error
      );


      showDashboardMessage(
        error.message ||
        "Failed to delete internship application.",
        "error"
      );
    }
  }


  /* =====================================================
     OPEN INTERNSHIP DETAILS
  ===================================================== */

  async function openInternshipDetails(
    id
  ) {

    try {

      detailsContent.innerHTML =
        `<p>Loading internship details...</p>`;


      detailsModal.classList.add(
        "show"
      );


      const response =
        await adminFetch(
          `${API_BASE_URL}/internships/${id}`
        );


      const result =
        await readJsonResponse(
          response,
          "Internship details API returned an invalid response."
        );


      if (
        !response.ok ||
        !result.success
      ) {

        throw new Error(
          result.message ||
          "Failed to fetch internship details."
        );
      }


      const item =
        result.data;


      const enrolmentNumber =
        getValue(
          item,
          "enrolmentNumber",
          "enrolment_number"
        );


      const centreCode =
        getValue(
          item,
          "centreCode",
          "centre_code"
        );


      const studentName =
        getValue(
          item,
          "studentName",
          "student_name"
        );


      const fatherName =
        getValue(
          item,
          "fatherName",
          "father_name"
        );


      const sex =
        getValue(
          item,
          "sex",
          "sex"
        );


      const dateOfBirth =
        getValue(
          item,
          "dateOfBirth",
          "date_of_birth"
        );


      const address =
        getValue(
          item,
          "address",
          "address"
        );


      const pinCode =
        getValue(
          item,
          "pinCode",
          "pin_code"
        );


      const phoneNumber =
        getValue(
          item,
          "phoneNumber",
          "phone_number"
        );


      const email =
        getValue(
          item,
          "email",
          "email"
        );


      const employmentDetails =
        getValue(
          item,
          "employmentDetails",
          "employment_details"
        );


      const candidateSignature =
        getValue(
          item,
          "candidateSignature",
          "candidate_signature"
        );


      const createdAt =
        item.created_at || "";


      let employmentDisplay =
        employmentDetails;


      if (
        typeof employmentDetails ===
        "object" &&
        employmentDetails !== null
      ) {

        employmentDisplay =
          JSON.stringify(
            employmentDetails,
            null,
            2
          );
      }


      /*
        Both Drive-backed and legacy local signatures
        are served through the authenticated signature
        endpoint — /uploads is no longer public.
      */
      const signatureIsProtected =
        Boolean(candidateSignature);


      const signatureUrl =
        candidateSignature
          ? `${API_BASE_URL}/internships/${encodeURIComponent(
              item.id
            )}/signature`
          : "";


      detailsContent.innerHTML = `

        <div class="details-grid">

          ${createDetailItem(
            "Enrolment Number",
            enrolmentNumber
          )}

          ${createDetailItem(
            "Centre Code",
            centreCode
          )}

          ${createDetailItem(
            "Student Name",
            studentName
          )}

          ${createDetailItem(
            "Father Name",
            fatherName
          )}

          ${createDetailItem(
            "Sex",
            sex
          )}

          ${createDetailItem(
            "Date of Birth",
            dateOfBirth
          )}

          ${createDetailItem(
            "Address",
            address
          )}

          ${createDetailItem(
            "Pin Code",
            pinCode
          )}

          ${createDetailItem(
            "Phone Number",
            phoneNumber
          )}

          ${createDetailItem(
            "Email",
            email
          )}

          ${createDetailItem(
            "Employment Details",
            employmentDisplay
          )}

          ${createDetailItem(
            "Status",
            item.status ||
            "Pending"
          )}

          ${createDetailItem(
            "Submitted At",
            formatDateShort(
              createdAt
            )
          )}

        </div>


        <h3>
          Candidate Signature
        </h3>


        <div
          style="
            margin-top:15px;
            margin-bottom:20px;
          ">

          ${
            signatureUrl

              ? `
                <div
                  style="
                    border:1px solid #dbe5ea;
                    border-radius:10px;
                    padding:15px;
                    display:inline-block;
                    background:#fafafa;
                  ">

                  ${
                    signatureIsProtected
                      ? `
                        <img
                          data-auth-src="${escapeHtml(
                            signatureUrl
                          )}"
                          alt="Candidate Signature"
                          style="
                            max-width:350px;
                            max-height:180px;
                            object-fit:contain;
                            display:block;
                          "
                        />
                      `
                      : `
                        <img
                          src="${escapeHtml(
                            signatureUrl
                          )}"
                          alt="Candidate Signature"
                          style="
                            max-width:350px;
                            max-height:180px;
                            object-fit:contain;
                            display:block;
                          "
                        />
                      `
                  }


                  <br>


                  ${
                    signatureIsProtected
                      ? `
                        <a
                          href="#"
                          class="view-file-btn"
                          data-protected-url="${escapeHtml(
                            signatureUrl
                          )}"
                          style="
                            display:inline-block;
                            margin-top:10px;
                          ">
                          View Signature
                        </a>
                      `
                      : `
                        <a
                          href="${escapeHtml(
                            signatureUrl
                          )}"
                          target="_blank"
                          rel="noopener"
                          style="
                            display:inline-block;
                            margin-top:10px;
                          ">
                          View Signature
                        </a>
                      `
                  }

                </div>
              `

              : `
                <p>
                  No candidate signature uploaded.
                </p>
              `
          }

        </div>


        <div
          id="modalStatusMessage"
          class="modal-status-message">
        </div>


        <div class="status-actions">

          <button
            type="button"
            class="approve-btn"
            data-internship-status="Approved"
            data-internship-id="${escapeHtml(
              item.id
            )}">
            Approve
          </button>


          <button
            type="button"
            class="reject-btn"
            data-internship-status="Rejected"
            data-internship-id="${escapeHtml(
              item.id
            )}">
            Reject
          </button>

        </div>
      `;


      hydrateProtectedMedia(
        detailsContent
      );


    } catch (error) {

      console.error(
        "Open internship details error:",
        error
      );


      detailsContent.innerHTML = `
        <p
          style="
            color:#c30000;
            font-family:Arial,sans-serif;
            font-weight:700;
          ">

          ${escapeHtml(
            error.message
          )}

        </p>
      `;
    }
  }


  /* =====================================================
     INTERNSHIP STATUS UPDATE
  ===================================================== */

  async function updateInternshipStatus(
    id,
    status
  ) {

    try {

      showModalMessage(
        `Updating internship application status to ${status}...`,
        "info"
      );


      const response =
        await adminFetch(
          `${API_BASE_URL}/internships/${id}/status`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                status
              })
          }
        );


      const result =
        await readJsonResponse(
          response,
          "Internship status update API returned an invalid response."
        );


      if (
        !response.ok ||
        !result.success
      ) {

        throw new Error(
          result.message ||
          "Failed to update internship status."
        );
      }


      showModalMessage(
        result.message ||
        `Internship application ${status} successfully.`,
        "success"
      );


      showDashboardMessage(
        result.message ||
        `Internship application ${status} successfully.`,
        "success"
      );


      await fetchInternships();

      updateInternshipStats();

      setTimeout(
        function () {

          detailsModal.classList.remove(
            "show"
          );

        },
        1800
      );


    } catch (error) {

      console.error(
        "Update internship status error:",
        error
      );


      showModalMessage(
        error.message ||
        "Failed to update internship status.",
        "error"
      );
    }
  }


  /* =====================================================
     FIND INTERNSHIP CARD
  ===================================================== */

  function findInternshipCard() {

    const possibleElements =
      Array.from(
        document.querySelectorAll(
          "a, button, div, article"
        )
      );


    return possibleElements.find(
      function (element) {

        const text =
          String(
            element.textContent ||
            ""
          )
            .replace(
              /\s+/g,
              " "
            )
            .trim()
            .toLowerCase();


        return (
          text ===
            "internship" ||

          text.includes(
            "review internship applications"
          )
        );
      }
    );
  }


  /* =====================================================
     INTERNSHIP CARD CLICK
  ===================================================== */

  function setupInternshipCard() {

    const card =
      document.querySelector(
        '[data-form-type="internship"]'
      );


    if (!card) {

      console.warn(
        "Internship dashboard card was not found."
      );

      return;
    }


    card.style.cursor =
      "pointer";


    card.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        event.stopPropagation();


        showInternshipSection();
      }
    );
  }


  /* =====================================================
     ADMISSION CARD CLICK
  ===================================================== */

  function setupAdmissionCard() {

    const card =
      document.querySelector(
        '[data-form-type="admission"]'
      );


    if (!card) {

      console.warn(
        "Admission dashboard card was not found."
      );

      return;
    }


    card.style.cursor =
      "pointer";


    card.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        event.stopPropagation();


        showAdmissionSection();
      }
    );
  }


  /* =====================================================
     EXISTING EVENTS
  ===================================================== */

  function setupEvents() {


    /* ---------------------------------------------
       ADMISSION VIEW
    --------------------------------------------- */

    if (applicationsTableBody) {

      applicationsTableBody.addEventListener(
        "click",
        function (event) {

          const viewBtn =
            event.target.closest(
              ".action-btn"
            );


          if (!viewBtn) {
            return;
          }


          if (
            viewBtn.classList.contains(
              "internship-view-btn"
            )
          ) {

            return;
          }


          const id =
            viewBtn.getAttribute(
              "data-id"
            );


          if (!id) {
            return;
          }


          openDetails(
            id
          );
        }
      );
    }


    /* ---------------------------------------------
       ADMISSION DELETE
    --------------------------------------------- */

    if (applicationsTableBody) {

      applicationsTableBody.addEventListener(
        "click",
        function (event) {

          const deleteBtn =
            event.target.closest(
              ".delete-btn"
            );


          if (!deleteBtn) {
            return;
          }


          const id =
            deleteBtn.getAttribute(
              "data-delete-id"
            );


          if (!id) {
            return;
          }


          deleteApplication(
            id
          );
        }
      );
    }


    /* ---------------------------------------------
       DOCUMENT DOWNLOAD
    --------------------------------------------- */

    if (detailsContent) {

      detailsContent.addEventListener(
        "click",
        function (event) {

          const downloadBtn =
            event.target.closest(
              ".download-file-btn"
            );


          if (!downloadBtn) {
            return;
          }


          const fileUrl =
            downloadBtn.getAttribute(
              "data-file-url"
            );


          const fileName =
            downloadBtn.getAttribute(
              "data-file-name"
            );


          const isProtected =
            downloadBtn.getAttribute(
              "data-protected"
            ) === "1";


          downloadFile(
            fileUrl,
            fileName,
            isProtected
          );
        }
      );


      /* -------------------------------------------
         PROTECTED DOCUMENT VIEW

         Drive-backed files cannot be opened with a
         plain link because the backend requires an
         Authorization header. Fetch the file with
         the admin token, then open the blob URL.
      ------------------------------------------- */

      detailsContent.addEventListener(
        "click",
        async function (event) {

          const viewBtn =
            event.target.closest(
              ".view-file-btn[data-protected-url]"
            );


          if (!viewBtn) {
            return;
          }


          event.preventDefault();


          const fileUrl =
            viewBtn.getAttribute(
              "data-protected-url"
            );


          try {
            const blobUrl =
              await fetchProtectedBlobUrl(
                fileUrl
              );

            window.open(
              blobUrl,
              "_blank",
              "noopener"
            );
          } catch (error) {
            console.error(
              "Protected view error:",
              error
            );

            alert(
              "Unable to open the file. Please log in again."
            );
          }
        }
      );


      /* -------------------------------------------
         INTERNSHIP STATUS + ADMISSION STATUS
      ------------------------------------------- */

      detailsContent.addEventListener(
        "click",
        function (event) {


          const internshipStatusBtn =
            event.target.closest(
              "[data-internship-status]"
            );


          if (
            internshipStatusBtn
          ) {

            const id =
              internshipStatusBtn.getAttribute(
                "data-internship-id"
              );


            const status =
              internshipStatusBtn.getAttribute(
                "data-internship-status"
              );


            if (
              id &&
              status
            ) {

              updateInternshipStatus(
                id,
                status
              );
            }


            return;
          }


          const statusBtn =
            event.target.closest(
              "[data-status]"
            );


          if (!statusBtn) {
            return;
          }


          const id =
            statusBtn.getAttribute(
              "data-id"
            );


          const status =
            statusBtn.getAttribute(
              "data-status"
            );


          if (
            id &&
            status
          ) {

            updateStatus(
              id,
              status
            );
          }
        }
      );
    }


    /* ---------------------------------------------
       CLOSE MODAL
    --------------------------------------------- */

    if (closeModalBtn) {

      closeModalBtn.addEventListener(
        "click",
        function () {

          detailsModal.classList.remove(
            "show"
          );
        }
      );
    }


    /* ---------------------------------------------
       CLICK OUTSIDE MODAL
    --------------------------------------------- */

    if (detailsModal) {

      detailsModal.addEventListener(
        "click",
        function (event) {

          if (
            event.target ===
            detailsModal
          ) {

            detailsModal.classList.remove(
              "show"
            );
          }
        }
      );
    }


    /* ---------------------------------------------
       ADMISSION SEARCH
    --------------------------------------------- */

    if (searchInput) {

      searchInput.addEventListener(
        "input",
        function () {

          const searchValue =
            this.value
              .toLowerCase()
              .trim();


          const filteredApplications =
            applications.filter(
              function (item) {

                const applicationNo =
                  getValue(
                    item,
                    "applicationNo",
                    "application_no"
                  );


                const courseName =
                  getValue(
                    item,
                    "courseName",
                    "course_name"
                  );


                const fullName =
                  getValue(
                    item,
                    "fullName",
                    "full_name"
                  );


                return (

                  String(
                    fullName ||
                    ""
                  )
                    .toLowerCase()
                    .includes(
                      searchValue
                    ) ||

                  String(
                    item.mobile ||
                    ""
                  )
                    .toLowerCase()
                    .includes(
                      searchValue
                    ) ||

                  String(
                    item.email ||
                    ""
                  )
                    .toLowerCase()
                    .includes(
                      searchValue
                    ) ||

                  String(
                    courseName ||
                    ""
                  )
                    .toLowerCase()
                    .includes(
                      searchValue
                    ) ||

                  String(
                    applicationNo ||
                    ""
                  )
                    .toLowerCase()
                    .includes(
                      searchValue
                    )
                );
              }
            );


          renderTable(
            filteredApplications
          );
        }
      );
    }


    /* ---------------------------------------------
       LOGOUT
    --------------------------------------------- */

    if (logoutBtn) {

      logoutBtn.addEventListener(
        "click",
        function () {

          clearAdminSession();


          window.location.href =
            "admin-login.html";
        }
      );
    }
  }


  /* =====================================================
     INITIALIZE
  ===================================================== */

  function initialize() {

    /* ---------------------------------------------
       EXISTING ADMISSION DASHBOARD
    --------------------------------------------- */

    updateStats();

    renderTable([]);

    setupEvents();

    fetchAdmissions();


    /* ---------------------------------------------
       INTERNSHIP
    --------------------------------------------- */

    createInternshipSection();

    setupInternshipCard();


    /* ---------------------------------------------
       ADMISSION CARD
    --------------------------------------------- */

    setupAdmissionCard();
  }


  initialize();

});