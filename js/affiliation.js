document.addEventListener("DOMContentLoaded", function () {
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
});
