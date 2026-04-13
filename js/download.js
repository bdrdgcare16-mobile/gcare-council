document.addEventListener("DOMContentLoaded", function () {
  // Dynamic form data array
  const formsData = [
    {
      id: "student",
      title: "Student Admission Form",
      category: "Admission",
      icon: " ",
      description: "Application form for student admission and enrollment process.",
      file: "assets/forms/Student-Admission-Form.pdf",
      downloadName: "Student-Admission-Form.pdf"
    },
    {
      id: "internship",
      title: "Internship Form",
      category: "Training",
      icon: " ",
      description: "Official form for internship request, approval, and submission details.",
      file: "assets/forms/internship-form.pdf",
      downloadName: "Internship-Form.pdf"
    },
    {
      id: "registration",
      title: "Registration Form",
      category: "Academic",
      icon: " ",
      description: "Registration form for course and institutional documentation purposes.",
      file: "assets/forms/registration-form.pdf",
      downloadName: "Registration-Form.pdf"
    },
    {
      id: "bonafide",
      title: "Bonafide Form",
      category: "Certificate",
      icon: " ",
      description: "Request form for bonafide certificate and student verification process.",
      file: "assets/forms/bonafide-form.pdf",
      downloadName: "Bonafide-Form.pdf"
    },
    {
      id: "exam",
      title: "Examination Form",
      category: "Academic",
      icon: " ",
      description: "Form for examination registration, hall ticket, and related process.",
      file: "assets/forms/exam-form.pdf",
      downloadName: "Examination-Form.pdf"
    }
  ];

  // DOM elements
  const revealItems = document.querySelectorAll(".reveal");
  const downloadsGrid = document.getElementById("downloadsGrid");
  const filterDropdown = document.getElementById("formFilter");
  const navDownloadList = document.getElementById("navDownloadList");
  const noResults = document.getElementById("noResults");
  const selectedFormTitle = document.getElementById("selectedFormTitle");
  const selectedFormDescription = document.getElementById("selectedFormDescription");
  const selectedFormActions = document.getElementById("selectedFormActions");
  const selectedDownloadBtn = document.getElementById("selectedDownloadBtn");

  let currentForms = [...formsData];

  // Setup reveal animation
  function setupRevealAnimation() {
    if (!revealItems.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  // Populate dropdown
  function populateDropdown() {
    const categories = [...new Set(formsData.map(form => form.category))];

    categories.forEach(function (category) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      filterDropdown.appendChild(option);
    });
  }

  // Populate navbar dropdown
  function populateNavDropdown() {
    navDownloadList.innerHTML = "";

    formsData.forEach(function (form) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = form.file;
      link.setAttribute("download", form.downloadName);
      link.textContent = form.title;
      li.appendChild(link);
      navDownloadList.appendChild(li);
    });
  }

  // Create card
  function createCard(form) {
    return `
      <div class="download-card reveal" data-category="${form.category}">
        <div class="card-top">
          <span class="card-badge">${form.category}</span>
        </div>
        <h4>${form.title}</h4>
        <p>${form.description}</p>
        <div class="card-actions">
          <a href="${form.file}" download="${form.downloadName}" class="secondary-btn">Download</a>
        </div>
      </div>
    `;
  }

  // Render cards
  function renderCards(forms) {
    downloadsGrid.innerHTML = "";

    if (!forms.length) {
      noResults.style.display = "block";
      return;
    }

    noResults.style.display = "none";

    forms.forEach(function (form) {
      downloadsGrid.insertAdjacentHTML("beforeend", createCard(form));
    });

    const newCards = downloadsGrid.querySelectorAll(".reveal:not(.show)");
    newCards.forEach(function (card) {
      setTimeout(function () {
        card.classList.add("show");
      }, 100);
    });
  }

  // Update selected form
  function updateSelectedForm(form) {
    if (form) {
      selectedFormTitle.textContent = form.title;
      selectedFormDescription.textContent = form.description;
      selectedDownloadBtn.href = form.file;
      selectedDownloadBtn.setAttribute("download", form.downloadName);
      selectedFormActions.style.display = "flex";
    } else {
      selectedFormTitle.textContent = "Select a form from dropdown";
      selectedFormDescription.textContent = "Choose a form to view details and actions";
      selectedFormActions.style.display = "none";
    }
  }

  // Filter forms
  function filterForms() {
    const selectedValue = filterDropdown.value;

    if (selectedValue === "all") {
      currentForms = [...formsData];
      renderCards(currentForms);
      updateSelectedForm(null);
      return;
    }

    currentForms = formsData.filter(function (form) {
      return form.category === selectedValue;
    });

    renderCards(currentForms);

    if (currentForms.length > 0) {
      updateSelectedForm(currentForms[0]);
    } else {
      updateSelectedForm(null);
    }
  }

  // Initialize
  function initialize() {
    populateDropdown();
    populateNavDropdown();
    renderCards(formsData);
    setupRevealAnimation();

    filterDropdown.addEventListener("change", filterForms);
  }

  initialize();

  /* ===============================
     Follow Us Button Click
  =============================== */

  const socialButtons = document.querySelectorAll(".social-btn");

  socialButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      socialButtons.forEach(btn =>
        btn.classList.remove("active-social")
      );

      this.classList.add("active-social");
    });
  });

  /* ===============================
     Footer Quick Links Click
  =============================== */

  const footerLinks = document.querySelectorAll(".footer-text-link");

  footerLinks.forEach(link => {
    link.addEventListener("click", function () {
      footerLinks.forEach(item =>
        item.classList.remove("active-footer-link")
      );

      this.classList.add("active-footer-link");
    });
  });

});