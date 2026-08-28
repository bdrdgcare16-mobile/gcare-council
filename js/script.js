document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("closeModal");
  const contactForm = document.getElementById("contactForm");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", function () {
      modal.classList.remove("show");
    });
  }

  if (modal) {
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("show");
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Form submitted successfully.");
      contactForm.reset();
      if (modal) {
        modal.classList.remove("show");
      }
    });
  }

  // LMS single menu behavior
  (function setupLmsMenu() {
    const lmsLinks = Array.from(document.querySelectorAll(".menu a")).filter(
      (a) => a.textContent.trim() === "LMS"
    );

    if (lmsLinks.length === 0) return;

    // LMS registration is intentionally only available via the homepage REGISTER NOW button.
    // The LMS menu remains a normal login dropdown.

    lmsLinks.forEach((lmsLink) => {
      lmsLink.addEventListener("click", function (e) {
        if (localStorage.getItem("gcareStudentLoggedIn") === "true") {
          window.location.href = "lms-dashboard.html";
        } else {
          e.preventDefault();
        }
      });
    });
  })();
});
