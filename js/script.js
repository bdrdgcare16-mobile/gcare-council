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
});