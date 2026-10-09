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

  // LMS menu navigation
  (function setupLmsMenu() {
    const lmsLinks = Array.from(document.querySelectorAll(".menu a")).filter(
      (a) => a.textContent.trim() === "LMS"
    );

    if (lmsLinks.length === 0) return;

    lmsLinks.forEach((lmsLink) => {
      const li = lmsLink.closest("li");
      if (li) {
        li.classList.remove("dropdown");
        const submenu = li.querySelector(".submenu");
        if (submenu) submenu.remove();
      }

      lmsLink.setAttribute("href", "lms-login.html");
      lmsLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = "lms-login.html";
      });
    });
  })();
});
