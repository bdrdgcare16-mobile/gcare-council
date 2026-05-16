document.addEventListener("DOMContentLoaded", function () {
  const formsData = [
    {
      id: "student",
      title: "Student Admission Form",
      category: "Admission",
      description: "Application form for student admission and enrollment process.",
      file: "assets/forms/Student-Admission-Form.pdf",
      downloadName: "Student-Admission-Form.pdf"
    },
    {
      id: "internship",
      title: "Internship Form",
      category: "Training",
      description: "Official form for internship request, approval, and submission details.",
      file: "assets/forms/internship-form.pdf",
      downloadName: "Internship-Form.pdf"
    },
    {
      id: "report",
      title: "Internship Report Form",
      category: "Training",
      description: "Official report form for internship completion and submission process.",
      file: "assets/forms/internship-report-form.pdf",
      downloadName: "Internship-Report-Form.pdf"
    }
  ];

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

  function populateDropdown() {
    if (!filterDropdown) return;

    const categories = [...new Set(formsData.map(function (form) {
      return form.category;
    }))];

    categories.forEach(function (category) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      filterDropdown.appendChild(option);
    });
  }

  function populateNavDropdown() {
    if (!navDownloadList) return;

    navDownloadList.innerHTML = "";

    formsData.forEach(function (form) {
      const li = document.createElement("li");
      const link = document.createElement("a");

      link.href = "downloads.html#" + form.id;
      link.textContent = form.title;
      link.setAttribute("data-form-id", form.id);

      li.appendChild(link);
      navDownloadList.appendChild(li);
    });
  }

  function createCard(form) {
    return `
      <div class="download-card reveal show" data-form-id="${form.id}" data-category="${form.category}" id="${form.id}">
        <div class="card-top">
          <span class="card-badge">${form.category}</span>
        </div>

        <h4>${form.title}</h4>

        <p>${form.description}</p>

        <div class="card-actions">
          <a href="${form.file}" download="${form.downloadName}" class="secondary-btn">
            Download
          </a>
        </div>
      </div>
    `;
  }

  function renderCards(forms) {
    if (!downloadsGrid) return;

    downloadsGrid.innerHTML = "";

    if (!forms.length) {
      if (noResults) {
        noResults.style.display = "block";
      }
      return;
    }

    if (noResults) {
      noResults.style.display = "none";
    }

    forms.forEach(function (form) {
      downloadsGrid.insertAdjacentHTML("beforeend", createCard(form));
    });
  }

  function updateSelectedForm(form) {
    if (
      !selectedFormTitle ||
      !selectedFormDescription ||
      !selectedFormActions ||
      !selectedDownloadBtn
    ) {
      return;
    }

    if (form) {
      selectedFormTitle.textContent = form.title;
      selectedFormDescription.textContent = form.description;
      selectedDownloadBtn.href = form.file;
      selectedDownloadBtn.setAttribute("download", form.downloadName);
      selectedFormActions.style.display = "flex";
    } else {
      selectedFormTitle.textContent = "Select a form from dropdown";
      selectedFormDescription.textContent = "Choose a form to view details and actions.";
      selectedFormActions.style.display = "none";
    }
  }

  function filterForms() {
    if (!filterDropdown) return;

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

  function showFormFromHash() {
    const hashValue = window.location.hash.replace("#", "");

    if (!hashValue) {
      return;
    }

    const selectedForm = formsData.find(function (form) {
      return form.id === hashValue;
    });

    if (!selectedForm) {
      return;
    }

    currentForms = [selectedForm];

    renderCards(currentForms);
    updateSelectedForm(selectedForm);

    if (filterDropdown) {
      filterDropdown.value = selectedForm.category;
    }

    setTimeout(function () {
      const downloadsSection = document.querySelector(".downloads-section");

      if (downloadsSection) {
        downloadsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 100);
  }

  function setupDownloadMenuClick() {
    if (!navDownloadList) return;

    const downloadLinks = navDownloadList.querySelectorAll("a[data-form-id]");

    downloadLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        const formId = this.getAttribute("data-form-id");

        if (!formId) return;

        const selectedForm = formsData.find(function (form) {
          return form.id === formId;
        });

        if (!selectedForm) return;

        event.preventDefault();

        window.history.pushState(null, "", "downloads.html#" + formId);

        currentForms = [selectedForm];

        renderCards(currentForms);
        updateSelectedForm(selectedForm);

        if (filterDropdown) {
          filterDropdown.value = selectedForm.category;
        }

        const downloadsSection = document.querySelector(".downloads-section");

        if (downloadsSection) {
          downloadsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
  }

  function setupSocialButtons() {
    const socialButtons = document.querySelectorAll(".social-btn");

    socialButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.preventDefault();

        socialButtons.forEach(function (btn) {
          btn.classList.remove("active-social");
        });

        this.classList.add("active-social");
      });
    });
  }

  function setupFooterLinks() {
    const footerLinks = document.querySelectorAll(".footer-text-link");

    footerLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        footerLinks.forEach(function (item) {
          item.classList.remove("active-footer-link");
        });

        this.classList.add("active-footer-link");
      });
    });
  }

  function initialize() {
    populateDropdown();
    populateNavDropdown();
    renderCards(formsData);
    updateSelectedForm(null);
    setupRevealAnimation();
    setupDownloadMenuClick();
    setupSocialButtons();
    setupFooterLinks();
    showFormFromHash();

    if (filterDropdown) {
      filterDropdown.addEventListener("change", filterForms);
    }
  }

  initialize();

  window.addEventListener("hashchange", showFormFromHash);
});