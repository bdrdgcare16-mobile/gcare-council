document.addEventListener("DOMContentLoaded", function () {
  const API_BASE_URL =
    "https://backend-production-c5cb.up.railway.app/api";

  const socialButtons = document.querySelectorAll(".social-btn");

  socialButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      socialButtons.forEach(function (item) {
        item.classList.remove("active-social");
      });

      this.classList.add("active-social");
    });
  });

  const footerTextLinks = document.querySelectorAll(".footer-text-link");

  footerTextLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      footerTextLinks.forEach(function (item) {
        item.classList.remove("active-footer-link");
      });

      this.classList.add("active-footer-link");
    });
  });

  /* Signature upload validation and file name display */
  const signatureInput = document.getElementById("institutionHeadSignature");
  const signatureFileName = document.getElementById("signatureFileName");
  const signatureError = document.getElementById("signatureError");
  const signatureAllowedExtensions = ["png", "jpg", "jpeg"];

  if (signatureInput) {
    signatureInput.addEventListener("change", function () {
      if (!signatureFileName || !signatureError) {
        return;
      }

      signatureError.classList.remove("show");
      signatureFileName.classList.remove("show");
      signatureFileName.textContent = "";

      if (signatureInput.files && signatureInput.files.length > 0) {
        const file = signatureInput.files[0];
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (!signatureAllowedExtensions.includes(fileExtension)) {
          signatureInput.value = "";
          signatureError.classList.add("show");
          return;
        }

        signatureFileName.textContent = "Selected file: " + file.name;
        signatureFileName.classList.add("show");
      }
    });
  }

  /* Enclosure checkboxes show/hide upload fields */
  const enclosureChecks = document.querySelectorAll(".enclosure-check");
  const enclosureAllowedExtensions = ["png", "jpg", "jpeg", "pdf"];

  enclosureChecks.forEach(function (checkbox) {
    const enclosureItem = checkbox.closest(".enclosure-item");
    const uploadWrap = enclosureItem ? enclosureItem.querySelector(".enclosure-upload") : null;
    const fileInput = enclosureItem ? enclosureItem.querySelector(".enclosure-file") : null;
    const fileName = enclosureItem ? enclosureItem.querySelector(".enclosure-file-name") : null;
    const fileError = enclosureItem ? enclosureItem.querySelector(".enclosure-file-error") : null;

    if (uploadWrap) {
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          uploadWrap.classList.add("show");
        } else {
          uploadWrap.classList.remove("show");
          if (fileInput) {
            fileInput.value = "";
          }
          if (fileName) {
            fileName.classList.remove("show");
            fileName.textContent = "";
          }
          if (fileError) {
            fileError.classList.remove("show");
          }
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener("change", function () {
        if (!fileName || !fileError) {
          return;
        }

        fileError.classList.remove("show");
        fileName.classList.remove("show");
        fileName.textContent = "";

        if (fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const fileExtension = file.name.split(".").pop().toLowerCase();

          if (!enclosureAllowedExtensions.includes(fileExtension)) {
            fileInput.value = "";
            fileError.classList.add("show");
            return;
          }

          fileName.textContent = "Selected file: " + file.name;
          fileName.classList.add("show");
        }
      });
    }
  });

  /* Conditional document uploads for Building & Document Particulars */
  const buildingTypeRadios = document.querySelectorAll('input[name="buildingType"]');
  const saleDeedUpload = document.getElementById("saleDeedUpload");
  const rentalAgreementUpload = document.getElementById("rentalAgreementUpload");
  const saleDeedFile = document.getElementById("saleDeedFile");
  const rentalAgreementFile = document.getElementById("rentalAgreementFile");
  const saleDeedFileName = document.getElementById("saleDeedFileName");
  const saleDeedFileError = document.getElementById("saleDeedFileError");
  const rentalAgreementFileName = document.getElementById("rentalAgreementFileName");
  const rentalAgreementFileError = document.getElementById("rentalAgreementFileError");

  const documentAllowedExtensions = ["pdf", "jpg", "jpeg", "png"];

  function clearFileInput(fileInput, fileNameEl, fileErrorEl) {
    if (fileInput) {
      fileInput.value = "";
      fileInput.required = false;
    }
    if (fileNameEl) {
      fileNameEl.textContent = "";
      fileNameEl.classList.remove("show");
    }
    if (fileErrorEl) {
      fileErrorEl.classList.remove("show");
    }
  }

  function validateFileInput(fileInput, fileNameEl, fileErrorEl) {
    if (!fileNameEl || !fileErrorEl || !fileInput) {
      return;
    }

    fileErrorEl.classList.remove("show");
    fileNameEl.classList.remove("show");
    fileNameEl.textContent = "";

    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!documentAllowedExtensions.includes(fileExtension)) {
        fileInput.value = "";
        fileErrorEl.classList.add("show");
        return;
      }

      fileNameEl.textContent = "Selected file: " + file.name;
      fileNameEl.classList.add("show");
    }
  }

  function updateBuildingTypeUploads() {
    const selected = document.querySelector('input[name="buildingType"]:checked');
    const value = selected ? selected.value : null;

    if (saleDeedUpload) {
      saleDeedUpload.classList.toggle("show", value === "Own");
    }
    if (rentalAgreementUpload) {
      rentalAgreementUpload.classList.toggle("show", value === "Rent");
    }

    if (value === "Own") {
      clearFileInput(rentalAgreementFile, rentalAgreementFileName, rentalAgreementFileError);
    } else if (value === "Rent") {
      clearFileInput(saleDeedFile, saleDeedFileName, saleDeedFileError);
    } else {
      clearFileInput(saleDeedFile, saleDeedFileName, saleDeedFileError);
      clearFileInput(rentalAgreementFile, rentalAgreementFileName, rentalAgreementFileError);
    }
  }

  buildingTypeRadios.forEach(function (radio) {
    radio.addEventListener("change", updateBuildingTypeUploads);
  });
  updateBuildingTypeUploads();

  if (saleDeedFile) {
    saleDeedFile.addEventListener("change", function () {
      validateFileInput(saleDeedFile, saleDeedFileName, saleDeedFileError);
    });
  }

  if (rentalAgreementFile) {
    rentalAgreementFile.addEventListener("change", function () {
      validateFileInput(rentalAgreementFile, rentalAgreementFileName, rentalAgreementFileError);
    });
  }

  /* Building documents conditional upload */
  const buildingDocumentsRadios = document.querySelectorAll('input[name="buildingDocuments"]');
  const buildingDocumentsUpload = document.getElementById("buildingDocumentsUpload");
  const buildingDocumentsFile = document.getElementById("buildingDocumentsFile");
  const buildingDocumentsFileName = document.getElementById("buildingDocumentsFileName");
  const buildingDocumentsFileError = document.getElementById("buildingDocumentsFileError");

  function updateBuildingDocumentsUpload() {
    const selected = document.querySelector('input[name="buildingDocuments"]:checked');
    const value = selected ? selected.value : null;

    if (buildingDocumentsUpload) {
      buildingDocumentsUpload.classList.toggle("show", value === "Available");
    }

    if (value !== "Available") {
      clearFileInput(buildingDocumentsFile, buildingDocumentsFileName, buildingDocumentsFileError);
    }
  }

  buildingDocumentsRadios.forEach(function (radio) {
    radio.addEventListener("change", updateBuildingDocumentsUpload);
  });
  updateBuildingDocumentsUpload();

  if (buildingDocumentsFile) {
    buildingDocumentsFile.addEventListener("change", function () {
      validateFileInput(buildingDocumentsFile, buildingDocumentsFileName, buildingDocumentsFileError);
    });
  }

  /* Declaration checkbox validation */
  const declarationAccept = document.getElementById("declarationAccept");
  const declarationAcceptError = document.getElementById("declarationAcceptError");

  if (declarationAccept) {
    declarationAccept.setCustomValidity("Please accept the declaration before submitting.");
    declarationAccept.addEventListener("change", function () {
      declarationAccept.setCustomValidity(declarationAccept.checked ? "" : "Please accept the declaration before submitting.");
      if (declarationAcceptError) {
        declarationAcceptError.classList.toggle("show", !declarationAccept.checked);
      }
    });
  }

  /* Affiliation form submission with file data */
  const affiliationForm = document.getElementById("affiliationForm");
  const submitButton = affiliationForm
    ? affiliationForm.querySelector('button[type="submit"]')
    : null;

  if (affiliationForm) {
    affiliationForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (declarationAccept && !declarationAccept.checked) {
        declarationAccept.setCustomValidity("Please accept the declaration before submitting.");
        if (declarationAcceptError) {
          declarationAcceptError.classList.add("show");
        }
        declarationAccept.reportValidity();
        return;
      }

      if (declarationAcceptError) {
        declarationAcceptError.classList.remove("show");
      }

      const formData = new FormData(affiliationForm);

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/affiliations`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (response.ok && result.success) {
          alert(
            result.message ||
              "Affiliation application submitted successfully."
          );
          affiliationForm.reset();
        } else {
          alert(
            result.message ||
              "Unable to submit affiliation application. Please try again."
          );
        }
      } catch (error) {
        console.error(
          "Affiliation submission error:",
          error
        );
        alert(
          "Unable to submit affiliation application. Please try again."
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Submit Application";
        }
      }
    });
  }
});
