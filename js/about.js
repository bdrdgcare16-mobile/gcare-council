document.addEventListener("DOMContentLoaded", function () {

  /* Animation reveal */

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


  /* Follow Us Active Button */

  const socialButtons = document.querySelectorAll(".social-btn");

  if (socialButtons.length) {

    socialButtons.forEach(function (button) {

      button.addEventListener("click", function (event) {

        event.preventDefault();

        socialButtons.forEach(function (item) {
          item.classList.remove("active-social");
        });

        button.classList.add("active-social");

      });

    });

  }

});