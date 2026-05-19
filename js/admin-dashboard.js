document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (isLoggedIn !== "true") {
    window.location.href = "admin-login.html";
    return;
  }

  const applicationsTableBody = document.getElementById("applicationsTableBody");
  const searchInput = document.getElementById("searchInput");
  const detailsModal = document.getElementById("detailsModal");
  const detailsContent = document.getElementById("detailsContent");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  let applications = JSON.parse(localStorage.getItem("studentApplications")) || [];

  function saveApplications() {
    localStorage.setItem("studentApplications", JSON.stringify(applications));
  }

  function getStatusClass(status) {
    if (status === "Approved") return "status-approved";
    if (status === "Rejected") return "status-rejected";
    return "status-pending";
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
      applicationsTableBody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.applicationNo}</td>
          <td>${item.title} ${item.fullName}</td>
          <td>${item.courseName}</td>
          <td>${item.mobile}</td>
          <td>${item.email}</td>
          <td>
            <span class="status-badge ${getStatusClass(item.status)}">
              ${item.status}
            </span>
          </td>
          <td>${item.submittedAt}</td>
          <td>
            <button type="button" class="action-btn" data-application="${item.applicationNo}">
              View
            </button>
          </td>
        </tr>
      `;
    });
  }

  function createDetailItem(label, value) {
    return `
      <div class="detail-item">
        <strong>${label}</strong>
        <span>${value || "-"}</span>
      </div>
    `;
  }

  function createFileCard(title, file) {
    if (!file) {
      return `
        <div class="file-card">
          <h4>${title}</h4>
          <p>No file uploaded</p>
        </div>
      `;
    }

    const preview = file.type && file.type.startsWith("image/")
      ? `<img src="${file.data}" alt="${title}" />`
      : "";

    return `
      <div class="file-card">
        <h4>${title}</h4>
        ${preview}
        <a href="${file.data}" target="_blank" download="${file.name}">
          View File
        </a>
      </div>
    `;
  }

  function openDetails(applicationNo) {
    const item = applications.find((app) => app.applicationNo === applicationNo);

    if (!item) return;

    detailsContent.innerHTML = `
      <div class="details-grid">
        ${createDetailItem("Application No.", item.applicationNo)}
        ${createDetailItem("Status", item.status)}
        ${createDetailItem("Course", item.courseName)}
        ${createDetailItem("Name", item.title + " " + item.fullName)}
        ${createDetailItem("Date of Birth", item.dob)}
        ${createDetailItem("Age", item.age)}
        ${createDetailItem("Gender", item.gender)}
        ${createDetailItem("Aadhaar Available", item.hasAadhaar)}
        ${createDetailItem("Aadhaar Number", item.aadhaarNumber)}
        ${createDetailItem("Parent / Guardian Name", item.parentName)}
        ${createDetailItem("Nationality", item.nationality)}
        ${createDetailItem("Caste", item.caste)}
        ${createDetailItem("Other Caste", item.otherCaste)}
        ${createDetailItem("Present Address", item.presentAddress)}
        ${createDetailItem("State", item.state)}
        ${createDetailItem("District", item.district)}
        ${createDetailItem("Pin Code", item.pinCode)}
        ${createDetailItem("Permanent Address", item.permanentAddress)}
        ${createDetailItem("Telephone", item.telephone)}
        ${createDetailItem("Mobile", item.mobile)}
        ${createDetailItem("Alternate Contact 1", item.alternateOne)}
        ${createDetailItem("Alternate Contact 2", item.alternateTwo)}
        ${createDetailItem("Email", item.email)}
        ${createDetailItem("10th Course", item.tenthCourse)}
        ${createDetailItem("10th Board", item.tenthBoard)}
        ${createDetailItem("10th Subjects", item.tenthSubjects)}
        ${createDetailItem("10th Year of Passing", item.tenthYear)}
        ${createDetailItem("10th Grade / Percentage", item.tenthGrade)}
        ${createDetailItem("Declaration Date", item.declarationDate)}
        ${createDetailItem("Place", item.place)}
      </div>

      <h3>Uploaded Documents</h3>

      <div class="file-grid">
        ${createFileCard("Passport Size Photo", item.files.photoUpload)}
        ${createFileCard("Aadhaar Card", item.files.aadhaarUpload)}
        ${createFileCard("10th Marksheet / Certificate", item.files.tenthUpload)}
        ${createFileCard("Parent / Guardian Signature", item.files.parentSignature)}
      </div>

      <div class="status-actions">
        <button type="button" class="approve-btn" data-status="Approved" data-application="${item.applicationNo}">
          Approve
        </button>

        <button type="button" class="reject-btn" data-status="Rejected" data-application="${item.applicationNo}">
          Reject
        </button>
      </div>
    `;

    detailsModal.classList.add("show");
  }

  function updateStatus(applicationNo, status) {
    applications = applications.map(function (item) {
      if (item.applicationNo === applicationNo) {
        return {
          ...item,
          status: status
        };
      }

      return item;
    });

    saveApplications();
    updateStats();
    renderTable(applications);
    detailsModal.classList.remove("show");

    alert("Application status updated to " + status + ".");
  }

  function setupEvents() {
    applicationsTableBody.addEventListener("click", function (event) {
      const viewBtn = event.target.closest(".action-btn");

      if (!viewBtn) return;

      openDetails(viewBtn.getAttribute("data-application"));
    });

    detailsContent.addEventListener("click", function (event) {
      const statusBtn = event.target.closest("[data-status]");

      if (!statusBtn) return;

      updateStatus(
        statusBtn.getAttribute("data-application"),
        statusBtn.getAttribute("data-status")
      );
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
        return (
          item.fullName.toLowerCase().includes(searchValue) ||
          item.mobile.toLowerCase().includes(searchValue) ||
          item.email.toLowerCase().includes(searchValue) ||
          item.courseName.toLowerCase().includes(searchValue) ||
          item.applicationNo.toLowerCase().includes(searchValue)
        );
      });

      renderTable(filteredApplications);
    });

    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("adminLoggedIn");
      window.location.href = "admin-login.html";
    });
  }

  function initialize() {
    updateStats();
    renderTable(applications);
    setupEvents();
  }

  initialize();
});