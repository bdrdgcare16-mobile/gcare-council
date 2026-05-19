document.addEventListener("DOMContentLoaded", function () {
  const revealItems = document.querySelectorAll(".reveal");

  if (revealItems.length) {
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

  const socialButtons = document.querySelectorAll(".social-btn");

 socialButtons.forEach((button) => {
  button.addEventListener("click", function () {
    socialButtons.forEach((btn) => btn.classList.remove("active-social"));
    this.classList.add("active-social");
  });
});

  const footerTextLinks = document.querySelectorAll(".footer-text-link");

  footerTextLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      footerTextLinks.forEach(function (item) {
        item.classList.remove("active-footer-link");
      });

      link.classList.add("active-footer-link");
    });
  });
});