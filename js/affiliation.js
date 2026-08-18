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
});