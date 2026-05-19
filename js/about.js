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

  /* Quality Governance Animation */

  const qualityGovernanceSection = document.querySelector(".quality-governance-section");

  if (qualityGovernanceSection) {
    const qualityGovernanceObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const contentBlocks = entry.target.querySelectorAll(".qg-content-block");

            contentBlocks.forEach(function (block, index) {
              setTimeout(function () {
                block.classList.add("fade-in");
              }, index * 150);
            });

            qualityGovernanceObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    qualityGovernanceObserver.observe(qualityGovernanceSection);
  }

  /* Follow Us Active Button */

  const socialButtons = document.querySelectorAll(".social-btn");

  if (socialButtons.length) {
    socialButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        socialButtons.forEach(function (btn) {
          btn.classList.remove("active-social");
        });

        this.classList.add("active-social");
      });
    });
  }
});