

// document.addEventListener("DOMContentLoaded", function () {
//   const isLoggedIn = localStorage.getItem("adminLoggedIn");

//   if (isLoggedIn !== "true") {
//     window.location.href = "admin-login.html";
//     return;
//   }

//   const API_BASE_URL = "http://localhost:3000/api";
//   const BASE_URL = API_BASE_URL.replace("/api", "");

//   const applicationsTableBody = document.getElementById("applicationsTableBody");
//   const searchInput = document.getElementById("searchInput");
//   const detailsModal = document.getElementById("detailsModal");
//   const detailsContent = document.getElementById("detailsContent");
//   const closeModalBtn = document.getElementById("closeModalBtn");
//   const logoutBtn = document.getElementById("logoutBtn");

//   let applications = [];

//   function getStatusClass(status) {
//     if (status === "Approved") return "status-approved";
//     if (status === "Rejected") return "status-rejected";
//     return "status-pending";
//   }

//   function formatDate(value) {
//     if (!value) return "-";

//     const date = new Date(value);

//     if (Number.isNaN(date.getTime())) {
//       return value;
//     }

//     return date.toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit"
//     });
//   }

//   function safeValue(value) {
//     return value === null || value === undefined || value === "" ? "-" : value;
//   }

//   function getValue(item, camelCaseKey, snakeCaseKey) {
//     return item?.[camelCaseKey] ?? item?.[snakeCaseKey] ?? "";
//   }

//   function showDashboardMessage(message, type = "success") {
//     let messageBox = document.getElementById("dashboardMessage");

//     if (!messageBox) {
//       messageBox = document.createElement("div");
//       messageBox.id = "dashboardMessage";
//       messageBox.className = "dashboard-message";

//       const wrapper = document.querySelector(".dashboard-wrapper");
//       if (wrapper) {
//         wrapper.prepend(messageBox);
//       }
//     }

//     messageBox.textContent = message;
//     messageBox.className = `dashboard-message ${type}`;

//     setTimeout(function () {
//       messageBox.textContent = "";
//       messageBox.className = "dashboard-message";
//     }, 4000);
//   }

//   function showModalMessage(message, type = "success") {
//     let messageBox = document.getElementById("modalStatusMessage");

//     if (!messageBox) {
//       messageBox = document.createElement("p");
//       messageBox.id = "modalStatusMessage";
//       messageBox.className = "modal-status-message";
//       detailsContent.prepend(messageBox);
//     }

//     messageBox.textContent = message;
//     messageBox.className = `modal-status-message ${type}`;
//   }

//   async function readJsonResponse(response, fallbackMessage) {
//     const text = await response.text();

//     try {
//       return JSON.parse(text);
//     } catch (error) {
//       console.log("NON JSON RESPONSE:", text);
//       throw new Error(fallbackMessage);
//     }
//   }

//   function updateStats() {
//     document.getElementById("totalCount").textContent = applications.length;

//     document.getElementById("pendingCount").textContent = applications.filter(
//       (item) => item.status === "Pending"
//     ).length;

//     document.getElementById("approvedCount").textContent = applications.filter(
//       (item) => item.status === "Approved"
//     ).length;

//     document.getElementById("rejectedCount").textContent = applications.filter(
//       (item) => item.status === "Rejected"
//     ).length;
//   }

//   function renderTable(data) {
//     applicationsTableBody.innerHTML = "";

//     if (!data.length) {
//       applicationsTableBody.innerHTML = `
//         <tr>
//           <td colspan="9" style="text-align:center;">No admission forms found.</td>
//         </tr>
//       `;
//       return;
//     }

//     data.forEach(function (item, index) {
//       const applicationNo = getValue(item, "applicationNo", "application_no");
//       const courseName = getValue(item, "courseName", "course_name");
//       const fullName = getValue(item, "fullName", "full_name");
//       const createdAt =
//         getValue(item, "createdAt", "created_at") || item.submittedAt;

//       applicationsTableBody.innerHTML += `
//         <tr>
//           <td>${index + 1}</td>
//           <td>${safeValue(applicationNo)}</td>
//           <td>${safeValue(item.title)} ${safeValue(fullName)}</td>
//           <td>${safeValue(courseName)}</td>
//           <td>${safeValue(item.mobile)}</td>
//           <td>${safeValue(item.email)}</td>
//           <td>
//             <span class="status-badge ${getStatusClass(item.status)}">
//               ${safeValue(item.status || "Pending")}
//             </span>
//           </td>
//           <td>${formatDate(createdAt)}</td>
//           <td>
//             <button type="button" class="action-btn" data-id="${item.id}">
//               View
//             </button>
//           </td>
//         </tr>
//       `;
//     });
//   }

//   async function fetchAdmissions() {
//     try {
//       applicationsTableBody.innerHTML = `
//         <tr>
//           <td colspan="9" style="text-align:center;">Loading admission forms...</td>
//         </tr>
//       `;

//       const response = await fetch(`${API_BASE_URL}/admissions`);
//       const result = await readJsonResponse(
//         response,
//         "Admissions API returned an invalid response."
//       );

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to fetch admission forms.");
//       }

//       applications = Array.isArray(result.data) ? result.data : [];

//       updateStats();
//       renderTable(applications);
//     } catch (error) {
//       console.error("Fetch admissions error:", error);

//       applicationsTableBody.innerHTML = `
//         <tr>
//           <td colspan="9" style="text-align:center;color:#c30000;">
//             ${error.message}
//           </td>
//         </tr>
//       `;
//     }
//   }

//   function createDetailItem(label, value) {
//     return `
//       <div class="detail-item">
//         <strong>${label}</strong>
//         <span>${safeValue(value)}</span>
//       </div>
//     `;
//   }

//   function normalizeFileUrl(filePath) {
//     if (!filePath) return "";

//     let normalizedPath = String(filePath).replace(/\\/g, "/");

//     const uploadIndex = normalizedPath.indexOf("uploads/");
//     if (uploadIndex !== -1) {
//       normalizedPath = normalizedPath.substring(uploadIndex);
//     }

//     if (normalizedPath.startsWith("http")) {
//       return normalizedPath;
//     }

//     if (normalizedPath.startsWith("/uploads")) {
//       return `${BASE_URL}${normalizedPath}`;
//     }

//     if (normalizedPath.startsWith("uploads")) {
//       return `${BASE_URL}/${normalizedPath}`;
//     }

//     return `${BASE_URL}/uploads/admissions/${normalizedPath}`;
//   }

//   function isImageFile(fileUrl, mimeType) {
//     const url = String(fileUrl || "").toLowerCase();
//     const type = String(mimeType || "").toLowerCase();

//     return (
//       type.startsWith("image/") ||
//       url.includes(".jpg") ||
//       url.includes(".jpeg") ||
//       url.includes(".png")
//     );
//   }

//   function findDocumentByType(documents, expectedType) {
//     if (!Array.isArray(documents)) return null;

//     return documents.find(function (doc) {
//       const documentType =
//         doc.documentType ||
//         doc.document_type ||
//         doc.type ||
//         "";

//       return documentType.toLowerCase() === expectedType.toLowerCase();
//     });
//   }

//   function getDocumentFilePath(item, documentType, camelCaseKey, snakeCaseKey) {
//     const document = findDocumentByType(item.documents, documentType);

//     if (document) {
//       return {
//         filePath:
//           document.filePath ||
//           document.file_path ||
//           document.path ||
//           "",
//         fileName:
//           document.fileName ||
//           document.file_name ||
//           "Uploaded File",
//         mimeType:
//           document.mimeType ||
//           document.mime_type ||
//           ""
//       };
//     }

//     const directFilePath = getValue(item, camelCaseKey, snakeCaseKey);

//     if (directFilePath) {
//       return {
//         filePath: directFilePath,
//         fileName: "Uploaded File",
//         mimeType: ""
//       };
//     }

//     return null;
//   }

//   function createFileCard(title, fileData) {
//     if (!fileData || !fileData.filePath) {
//       return `
//         <div class="file-card">
//           <h4>${title}</h4>
//           <p>No file uploaded</p>
//         </div>
//       `;
//     }

//     const fileUrl = normalizeFileUrl(fileData.filePath);
//     const fileName = fileData.fileName || title;
//     const imageFile = isImageFile(fileUrl, fileData.mimeType);

//     return `
//       <div class="file-card">
//         <h4>${title}</h4>

//         ${
//           imageFile
//             ? `<img src="${fileUrl}" alt="${title}" />`
//             : `<p class="pdf-file-text">PDF / Document uploaded</p>`
//         }

//         <p class="uploaded-file-name">${safeValue(fileName)}</p>

//         <div class="file-actions">
//           <a href="${fileUrl}" target="_blank" rel="noopener">
//             View
//           </a>

//           <a href="${fileUrl}" download>
//             Download
//           </a>
//         </div>
//       </div>
//     `;
//   }

//   async function openDetails(id) {
//     try {
//       detailsContent.innerHTML = `<p>Loading application details...</p>`;
//       detailsModal.classList.add("show");

//       const response = await fetch(`${API_BASE_URL}/admissions/${id}`);
//       const result = await readJsonResponse(
//         response,
//         "Admission details API returned an invalid response."
//       );

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to fetch admission details.");
//       }

//       const item = result.data;

//       const applicationNo = getValue(item, "applicationNo", "application_no");
//       const courseName = getValue(item, "courseName", "course_name");
//       const fullName = getValue(item, "fullName", "full_name");
//       const hasAadhaar = getValue(item, "hasAadhaar", "has_aadhaar");
//       const aadhaarNumber = getValue(item, "aadhaarNumber", "aadhaar_number");
//       const parentName = getValue(item, "parentName", "parent_name");
//       const otherCaste = getValue(item, "otherCaste", "other_caste");
//       const presentAddress = getValue(item, "presentAddress", "present_address");
//       const pinCode = getValue(item, "pinCode", "pin_code");
//       const sameAddress = getValue(item, "sameAddress", "same_address");
//       const permanentAddress = getValue(
//         item,
//         "permanentAddress",
//         "permanent_address"
//       );
//       const alternateOne = getValue(item, "alternateOne", "alternate_one");
//       const alternateTwo = getValue(item, "alternateTwo", "alternate_two");
//       const academicLevel = getValue(item, "academicLevel", "academic_level");
//       const educationCourse = getValue(item, "educationCourse", "education_course");
//       const educationBoard = getValue(item, "educationBoard", "education_board");
//       const educationSubjects = getValue(
//         item,
//         "educationSubjects",
//         "education_subjects"
//       );
//       const educationYear = getValue(item, "educationYear", "education_year");
//       const educationGrade = getValue(item, "educationGrade", "education_grade");
//       const declarationDate = getValue(
//         item,
//         "declarationDate",
//         "declaration_date"
//       );
//       const createdAt =
//         getValue(item, "createdAt", "created_at") || item.submittedAt;

//       const photoUpload = getDocumentFilePath(
//         item,
//         "Passport Size Photo",
//         "photoUpload",
//         "photo_upload"
//       );

//       const aadhaarUpload = getDocumentFilePath(
//         item,
//         "Aadhaar Card",
//         "aadhaarUpload",
//         "aadhaar_upload"
//       );

//       const educationCertificateUpload = getDocumentFilePath(
//         item,
//         "Education Certificate",
//         "educationCertificateUpload",
//         "education_certificate_upload"
//       );

//       const parentSignature = getDocumentFilePath(
//         item,
//         "Parent / Guardian Signature",
//         "parentSignature",
//         "parent_signature"
//       );

//       detailsContent.innerHTML = `
//         <div class="details-grid">
//           ${createDetailItem("Application No.", applicationNo)}
//           ${createDetailItem("Status", item.status)}
//           ${createDetailItem("Course", courseName)}
//           ${createDetailItem("Name", `${safeValue(item.title)} ${safeValue(fullName)}`)}
//           ${createDetailItem("Date of Birth", item.dob)}
//           ${createDetailItem("Age", item.age)}
//           ${createDetailItem("Gender", item.gender)}
//           ${createDetailItem("Aadhaar Available", hasAadhaar)}
//           ${createDetailItem("Aadhaar Number", aadhaarNumber)}
//           ${createDetailItem("Parent / Guardian Name", parentName)}
//           ${createDetailItem("Nationality", item.nationality)}
//           ${createDetailItem("Caste", item.caste)}
//           ${createDetailItem("Other Caste", otherCaste)}
//           ${createDetailItem("Present Address", presentAddress)}
//           ${createDetailItem("State", item.state)}
//           ${createDetailItem("District", item.district)}
//           ${createDetailItem("Pin Code", pinCode)}
//           ${createDetailItem("Permanent Address", permanentAddress)}
//           ${createDetailItem("Telephone", item.telephone)}
//           ${createDetailItem("Mobile", item.mobile)}
//           ${createDetailItem("Alternate Contact 1", alternateOne)}
//           ${createDetailItem("Alternate Contact 2", alternateTwo)}
//           ${createDetailItem("Email", item.email)}
//           ${createDetailItem("Academic Level", academicLevel)}
//           ${createDetailItem("Qualification / Course", educationCourse)}
//           ${createDetailItem("University / Board", educationBoard)}
//           ${createDetailItem("Subjects", educationSubjects)}
//           ${createDetailItem("Year of Passing", educationYear)}
//           ${createDetailItem("Grade / Percentage", educationGrade)}
//           ${createDetailItem("Declaration Date", declarationDate)}
//           ${createDetailItem("Place", item.place)}
//           ${createDetailItem("Submitted At", formatDate(createdAt))}
//         </div>

//         <h3>Uploaded Documents</h3>

//         <div class="file-grid">
//           ${createFileCard("Passport Size Photo", photoUpload)}
//           ${createFileCard("Aadhaar Card", aadhaarUpload)}
//           ${createFileCard("Education Certificate", educationCertificateUpload)}
//           ${createFileCard("Parent / Guardian Signature", parentSignature)}
//         </div>

//         <div id="modalStatusMessage" class="modal-status-message"></div>

//         <div class="status-actions">
//           <button type="button" class="approve-btn" data-status="Approved" data-id="${item.id}">
//             Approve
//           </button>

//           <button type="button" class="reject-btn" data-status="Rejected" data-id="${item.id}">
//             Reject
//           </button>
//         </div>
//       `;
//     } catch (error) {
//       console.error("Open details error:", error);

//       detailsContent.innerHTML = `
//         <p style="color:#c30000;font-family:Arial,sans-serif;font-weight:700;">
//           ${error.message}
//         </p>
//       `;
//     }
//   }

//   async function updateStatus(id, status) {
//     try {
//       showModalMessage(`Updating application status to ${status}...`, "info");

//       const response = await fetch(`${API_BASE_URL}/admissions/${id}/status`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ status })
//       });

//       const result = await readJsonResponse(
//         response,
//         "Status update API returned an invalid response."
//       );

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to update admission status.");
//       }

//       showModalMessage(
//         result.message || `Application ${status} successfully.`,
//         "success"
//       );

//       showDashboardMessage(
//         result.message || `Application ${status} successfully.`,
//         "success"
//       );

//       await fetchAdmissions();

//       setTimeout(function () {
//         detailsModal.classList.remove("show");
//       }, 1800);
//     } catch (error) {
//       console.error("Update status error:", error);

//       showModalMessage(
//         error.message || "Failed to update admission status.",
//         "error"
//       );
//     }
//   }

//   function setupEvents() {
//     applicationsTableBody.addEventListener("click", function (event) {
//       const viewBtn = event.target.closest(".action-btn");

//       if (!viewBtn) return;

//       const id = viewBtn.getAttribute("data-id");
//       openDetails(id);
//     });

//     detailsContent.addEventListener("click", function (event) {
//       const statusBtn = event.target.closest("[data-status]");

//       if (!statusBtn) return;

//       const id = statusBtn.getAttribute("data-id");
//       const status = statusBtn.getAttribute("data-status");

//       updateStatus(id, status);
//     });

//     closeModalBtn.addEventListener("click", function () {
//       detailsModal.classList.remove("show");
//     });

//     detailsModal.addEventListener("click", function (event) {
//       if (event.target === detailsModal) {
//         detailsModal.classList.remove("show");
//       }
//     });

//     searchInput.addEventListener("input", function () {
//       const searchValue = this.value.toLowerCase();

//       const filteredApplications = applications.filter(function (item) {
//         const applicationNo = getValue(item, "applicationNo", "application_no");
//         const courseName = getValue(item, "courseName", "course_name");
//         const fullName = getValue(item, "fullName", "full_name");

//         return (
//           String(fullName || "").toLowerCase().includes(searchValue) ||
//           String(item.mobile || "").toLowerCase().includes(searchValue) ||
//           String(item.email || "").toLowerCase().includes(searchValue) ||
//           String(courseName || "").toLowerCase().includes(searchValue) ||
//           String(applicationNo || "").toLowerCase().includes(searchValue)
//         );
//       });

//       renderTable(filteredApplications);
//     });

//     logoutBtn.addEventListener("click", function () {
//       localStorage.removeItem("adminLoggedIn");
//       localStorage.removeItem("adminEmail");
//       window.location.href = "admin-login.html";
//     });
//   }

//   function initialize() {
//     updateStats();
//     renderTable([]);
//     setupEvents();
//     fetchAdmissions();
//   }

//   initialize();
// });

document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (isLoggedIn !== "true") {
    window.location.href = "admin-login.html";
    return;
  }

  const API_BASE_URL = "https://gcarecouncil.in/api";
  const BASE_URL = API_BASE_URL.replace("/api", "");

  const applicationsTableBody = document.getElementById("applicationsTableBody");
  const searchInput = document.getElementById("searchInput");
  const detailsModal = document.getElementById("detailsModal");
  const detailsContent = document.getElementById("detailsContent");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  let applications = [];

  function getStatusClass(status) {
    if (status === "Approved") return "status-approved";
    if (status === "Rejected") return "status-rejected";
    return "status-pending";
  }

  function formatDate(value) {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function safeValue(value) {
    return value === null || value === undefined || value === "" ? "-" : value;
  }

  function getValue(item, camelCaseKey, snakeCaseKey) {
    return item?.[camelCaseKey] ?? item?.[snakeCaseKey] ?? "";
  }

  function showDashboardMessage(message, type = "success") {
    let messageBox = document.getElementById("dashboardMessage");

    if (!messageBox) {
      messageBox = document.createElement("div");
      messageBox.id = "dashboardMessage";
      messageBox.className = "dashboard-message";

      const wrapper = document.querySelector(".dashboard-wrapper");

      if (wrapper) {
        wrapper.prepend(messageBox);
      }
    }

    messageBox.textContent = message;
    messageBox.className = `dashboard-message ${type}`;

    setTimeout(function () {
      messageBox.textContent = "";
      messageBox.className = "dashboard-message";
    }, 4000);
  }

  function showModalMessage(message, type = "success") {
    let messageBox = document.getElementById("modalStatusMessage");

    if (!messageBox) {
      messageBox = document.createElement("p");
      messageBox.id = "modalStatusMessage";
      messageBox.className = "modal-status-message";
      detailsContent.prepend(messageBox);
    }

    messageBox.textContent = message;
    messageBox.className = `modal-status-message ${type}`;
  }

  async function readJsonResponse(response, fallbackMessage) {
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch (error) {
      console.log("NON JSON RESPONSE:", text);
      throw new Error(fallbackMessage);
    }
  }

  function updateStats() {
    document.getElementById("totalCount").textContent = applications.length;

    document.getElementById("pendingCount").textContent = applications.filter(
      (item) => item.status === "Pending"
    ).length;

    document.getElementById("approvedCount").textContent = applications.filter(
      (item) => item.status === "Approved"
    ).length;

    document.getElementById("rejectedCount").textContent = applications.filter(
      (item) => item.status === "Rejected"
    ).length;
  }

  function renderTable(data) {
    applicationsTableBody.innerHTML = "";

    if (!data.length) {
      applicationsTableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center;">No admission forms found.</td>
        </tr>
      `;
      return;
    }

    data.forEach(function (item, index) {
      const applicationNo = getValue(item, "applicationNo", "application_no");
      const courseName = getValue(item, "courseName", "course_name");
      const fullName = getValue(item, "fullName", "full_name");
      const createdAt =
        getValue(item, "createdAt", "created_at") || item.submittedAt;

      applicationsTableBody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${safeValue(applicationNo)}</td>
          <td>${safeValue(item.title)} ${safeValue(fullName)}</td>
          <td>${safeValue(courseName)}</td>
          <td>${safeValue(item.mobile)}</td>
          <td>${safeValue(item.email)}</td>
          <td>
            <span class="status-badge ${getStatusClass(item.status)}">
              ${safeValue(item.status || "Pending")}
            </span>
          </td>
          <td>${formatDate(createdAt)}</td>
          <td>
            <button type="button" class="action-btn" data-id="${item.id}">
              View
            </button>
          </td>
        </tr>
      `;
    });
  }

  async function fetchAdmissions() {
    try {
      applicationsTableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center;">Loading admission forms...</td>
        </tr>
      `;

      const response = await fetch(`${API_BASE_URL}/admissions`);
      const result = await readJsonResponse(
        response,
        "Admissions API returned an invalid response."
      );

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch admission forms.");
      }

      applications = Array.isArray(result.data) ? result.data : [];

      updateStats();
      renderTable(applications);
    } catch (error) {
      console.error("Fetch admissions error:", error);

      applicationsTableBody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center;color:#c30000;">
            ${error.message}
          </td>
        </tr>
      `;
    }
  }

  function createDetailItem(label, value) {
    return `
      <div class="detail-item">
        <strong>${label}</strong>
        <span>${safeValue(value)}</span>
      </div>
    `;
  }

  function normalizeFileUrl(filePath) {
    if (!filePath) return "";

    let normalizedPath = String(filePath).replace(/\\/g, "/");

    const uploadIndex = normalizedPath.indexOf("uploads/");

    if (uploadIndex !== -1) {
      normalizedPath = normalizedPath.substring(uploadIndex);
    }

    if (normalizedPath.startsWith("http")) {
      return normalizedPath;
    }

    if (normalizedPath.startsWith("/uploads")) {
      return `${BASE_URL}${normalizedPath}`;
    }

    if (normalizedPath.startsWith("uploads")) {
      return `${BASE_URL}/${normalizedPath}`;
    }

    return `${BASE_URL}/uploads/admissions/${normalizedPath}`;
  }

  function isImageFile(fileUrl, mimeType) {
    const url = String(fileUrl || "").toLowerCase();
    const type = String(mimeType || "").toLowerCase();

    return (
      type.startsWith("image/") ||
      url.includes(".jpg") ||
      url.includes(".jpeg") ||
      url.includes(".png") ||
      url.includes(".webp")
    );
  }

  function findDocumentByType(documents, expectedType) {
    if (!Array.isArray(documents)) return null;

    return documents.find(function (doc) {
      const documentType = doc.documentType || doc.document_type || doc.type || "";

      return documentType.toLowerCase() === expectedType.toLowerCase();
    });
  }

  function getDocumentFilePath(item, documentType, camelCaseKey, snakeCaseKey) {
    const document = findDocumentByType(item.documents, documentType);

    if (document) {
      return {
        filePath: document.filePath || document.file_path || document.path || "",
        fileName: document.fileName || document.file_name || "Uploaded File",
        mimeType: document.mimeType || document.mime_type || ""
      };
    }

    const directFilePath = getValue(item, camelCaseKey, snakeCaseKey);

    if (directFilePath) {
      return {
        filePath: directFilePath,
        fileName: "Uploaded File",
        mimeType: ""
      };
    }

    return null;
  }

  function sanitizeFileName(fileName) {
    return String(fileName || "downloaded-file")
      .replace(/[\\/:*?"<>|]/g, "-")
      .trim();
  }

  function createFileCard(title, fileData) {
    if (!fileData || !fileData.filePath) {
      return `
        <div class="file-card">
          <h4>${title}</h4>
          <p>No file uploaded</p>
        </div>
      `;
    }

    const fileUrl = normalizeFileUrl(fileData.filePath);
    const fileName = sanitizeFileName(fileData.fileName || title);
    const imageFile = isImageFile(fileUrl, fileData.mimeType);

    return `
      <div class="file-card">
        <h4>${title}</h4>

        ${
          imageFile
            ? `<img src="${fileUrl}" alt="${title}" />`
            : `<p class="pdf-file-text">PDF / Document uploaded</p>`
        }

        <p class="uploaded-file-name">${safeValue(fileName)}</p>

        <div class="file-actions">
          <a href="${fileUrl}" target="_blank" rel="noopener" class="view-file-btn">
            View
          </a>

          <button 
            type="button"
            class="download-file-btn"
            data-file-url="${fileUrl}"
            data-file-name="${fileName}">
            Download
          </button>
        </div>
      </div>
    `;
  }

  async function downloadFile(fileUrl, fileName) {
    try {
      if (!fileUrl) {
        throw new Error("File URL is missing.");
      }

      const response = await fetch(fileUrl);

      if (!response.ok) {
        throw new Error("File download failed.");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = sanitizeFileName(fileName || "downloaded-file");

      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
      alert("Unable to download the file. Please try again.");
    }
  }

  async function openDetails(id) {
    try {
      detailsContent.innerHTML = `<p>Loading application details...</p>`;
      detailsModal.classList.add("show");

      const response = await fetch(`${API_BASE_URL}/admissions/${id}`);
      const result = await readJsonResponse(
        response,
        "Admission details API returned an invalid response."
      );

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch admission details.");
      }

      const item = result.data;

      const applicationNo = getValue(item, "applicationNo", "application_no");
      const courseName = getValue(item, "courseName", "course_name");
      const fullName = getValue(item, "fullName", "full_name");
      const hasAadhaar = getValue(item, "hasAadhaar", "has_aadhaar");
      const aadhaarNumber = getValue(item, "aadhaarNumber", "aadhaar_number");
      const parentName = getValue(item, "parentName", "parent_name");
      const otherCaste = getValue(item, "otherCaste", "other_caste");
      const presentAddress = getValue(item, "presentAddress", "present_address");
      const pinCode = getValue(item, "pinCode", "pin_code");
      const sameAddress = getValue(item, "sameAddress", "same_address");
      const permanentAddress = getValue(
        item,
        "permanentAddress",
        "permanent_address"
      );
      const alternateOne = getValue(item, "alternateOne", "alternate_one");
      const alternateTwo = getValue(item, "alternateTwo", "alternate_two");
      const academicLevel = getValue(item, "academicLevel", "academic_level");
      const educationCourse = getValue(item, "educationCourse", "education_course");
      const educationBoard = getValue(item, "educationBoard", "education_board");
      const educationSubjects = getValue(
        item,
        "educationSubjects",
        "education_subjects"
      );
      const educationYear = getValue(item, "educationYear", "education_year");
      const educationGrade = getValue(item, "educationGrade", "education_grade");
      const declarationDate = getValue(
        item,
        "declarationDate",
        "declaration_date"
      );
      const createdAt =
        getValue(item, "createdAt", "created_at") || item.submittedAt;

      const photoUpload = getDocumentFilePath(
        item,
        "Passport Size Photo",
        "photoUpload",
        "photo_upload"
      );

      const aadhaarUpload = getDocumentFilePath(
        item,
        "Aadhaar Card",
        "aadhaarUpload",
        "aadhaar_upload"
      );

      const educationCertificateUpload = getDocumentFilePath(
        item,
        "Education Certificate",
        "educationCertificateUpload",
        "education_certificate_upload"
      );

      const parentSignature = getDocumentFilePath(
        item,
        "Parent / Guardian Signature",
        "parentSignature",
        "parent_signature"
      );

      detailsContent.innerHTML = `
        <div class="details-grid">
          ${createDetailItem("Application No.", applicationNo)}
          ${createDetailItem("Status", item.status)}
          ${createDetailItem("Course", courseName)}
          ${createDetailItem("Name", `${safeValue(item.title)} ${safeValue(fullName)}`)}
          ${createDetailItem("Date of Birth", item.dob)}
          ${createDetailItem("Age", item.age)}
          ${createDetailItem("Gender", item.gender)}
          ${createDetailItem("Aadhaar Available", hasAadhaar)}
          ${createDetailItem("Aadhaar Number", aadhaarNumber)}
          ${createDetailItem("Parent / Guardian Name", parentName)}
          ${createDetailItem("Nationality", item.nationality)}
          ${createDetailItem("Caste", item.caste)}
          ${createDetailItem("Other Caste", otherCaste)}
          ${createDetailItem("Present Address", presentAddress)}
          ${createDetailItem("State", item.state)}
          ${createDetailItem("District", item.district)}
          ${createDetailItem("Pin Code", pinCode)}
          ${createDetailItem("Permanent Address", permanentAddress)}
          ${createDetailItem("Telephone", item.telephone)}
          ${createDetailItem("Mobile", item.mobile)}
          ${createDetailItem("Alternate Contact 1", alternateOne)}
          ${createDetailItem("Alternate Contact 2", alternateTwo)}
          ${createDetailItem("Email", item.email)}
          ${createDetailItem("Academic Level", academicLevel)}
          ${createDetailItem("Qualification / Course", educationCourse)}
          ${createDetailItem("University / Board", educationBoard)}
          ${createDetailItem("Subjects", educationSubjects)}
          ${createDetailItem("Year of Passing", educationYear)}
          ${createDetailItem("Grade / Percentage", educationGrade)}
          ${createDetailItem("Declaration Date", declarationDate)}
          ${createDetailItem("Place", item.place)}
          ${createDetailItem("Submitted At", formatDate(createdAt))}
        </div>

        <h3>Uploaded Documents</h3>

        <div class="file-grid">
          ${createFileCard("Passport Size Photo", photoUpload)}
          ${createFileCard("Aadhaar Card", aadhaarUpload)}
          ${createFileCard("Education Certificate", educationCertificateUpload)}
          ${createFileCard("Parent / Guardian Signature", parentSignature)}
        </div>

        <div id="modalStatusMessage" class="modal-status-message"></div>

        <div class="status-actions">
          <button type="button" class="approve-btn" data-status="Approved" data-id="${item.id}">
            Approve
          </button>

          <button type="button" class="reject-btn" data-status="Rejected" data-id="${item.id}">
            Reject
          </button>
        </div>
      `;
    } catch (error) {
      console.error("Open details error:", error);

      detailsContent.innerHTML = `
        <p style="color:#c30000;font-family:Arial,sans-serif;font-weight:700;">
          ${error.message}
        </p>
      `;
    }
  }

  async function updateStatus(id, status) {
    try {
      showModalMessage(`Updating application status to ${status}...`, "info");

      const response = await fetch(`${API_BASE_URL}/admissions/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      const result = await readJsonResponse(
        response,
        "Status update API returned an invalid response."
      );

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update admission status.");
      }

      showModalMessage(
        result.message || `Application ${status} successfully.`,
        "success"
      );

      showDashboardMessage(
        result.message || `Application ${status} successfully.`,
        "success"
      );

      await fetchAdmissions();

      setTimeout(function () {
        detailsModal.classList.remove("show");
      }, 1800);
    } catch (error) {
      console.error("Update status error:", error);

      showModalMessage(
        error.message || "Failed to update admission status.",
        "error"
      );
    }
  }

  function setupEvents() {
    applicationsTableBody.addEventListener("click", function (event) {
      const viewBtn = event.target.closest(".action-btn");

      if (!viewBtn) return;

      const id = viewBtn.getAttribute("data-id");
      openDetails(id);
    });

    detailsContent.addEventListener("click", function (event) {
      const downloadBtn = event.target.closest(".download-file-btn");

      if (!downloadBtn) return;

      const fileUrl = downloadBtn.getAttribute("data-file-url");
      const fileName = downloadBtn.getAttribute("data-file-name");

      downloadFile(fileUrl, fileName);
    });

    detailsContent.addEventListener("click", function (event) {
      const statusBtn = event.target.closest("[data-status]");

      if (!statusBtn) return;

      const id = statusBtn.getAttribute("data-id");
      const status = statusBtn.getAttribute("data-status");

      updateStatus(id, status);
    });

    closeModalBtn.addEventListener("click", function () {
      detailsModal.classList.remove("show");
    });

    detailsModal.addEventListener("click", function (event) {
      if (event.target === detailsModal) {
        detailsModal.classList.remove("show");
      }
    });

    searchInput.addEventListener("input", function () {
      const searchValue = this.value.toLowerCase();

      const filteredApplications = applications.filter(function (item) {
        const applicationNo = getValue(item, "applicationNo", "application_no");
        const courseName = getValue(item, "courseName", "course_name");
        const fullName = getValue(item, "fullName", "full_name");

        return (
          String(fullName || "").toLowerCase().includes(searchValue) ||
          String(item.mobile || "").toLowerCase().includes(searchValue) ||
          String(item.email || "").toLowerCase().includes(searchValue) ||
          String(courseName || "").toLowerCase().includes(searchValue) ||
          String(applicationNo || "").toLowerCase().includes(searchValue)
        );
      });

      renderTable(filteredApplications);
    });

    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminEmail");
      window.location.href = "admin-login.html";
    });
  }

  function initialize() {
    updateStats();
    renderTable([]);
    setupEvents();
    fetchAdmissions();
  }

  initialize();
});