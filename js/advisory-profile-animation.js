document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".profile-tab");
  const panels = document.querySelectorAll(".advisor-panel");

  if (tabs.length && panels.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        const targetId = tab.getAttribute("data-target");

        tabs.forEach(function (item) {
          item.classList.remove("active");
        });

        panels.forEach(function (panel) {
          panel.classList.remove("active-panel");
        });

        tab.classList.add("active");

        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add("active-panel");
          setTimeout(function () {
            targetPanel.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }, 100);
        }
      });
    });
  }

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

  const footerTextLinks = document.querySelectorAll(".footer-text-link");

  if (footerTextLinks.length) {
    footerTextLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        footerTextLinks.forEach(function (item) {
          item.classList.remove("active-footer-link");
        });

        link.classList.add("active-footer-link");
      });
    });
  }
});