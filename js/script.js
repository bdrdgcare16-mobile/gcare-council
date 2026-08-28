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

    const lmsPrompt = document.createElement("div");
    lmsPrompt.id = "lmsRegisterPrompt";
    lmsPrompt.setAttribute("role", "dialog");
    lmsPrompt.setAttribute("aria-modal", "true");
    lmsPrompt.setAttribute("aria-hidden", "true");
    lmsPrompt.innerHTML =
      '<div class="lms-prompt-overlay"></div>' +
      '<div class="lms-prompt-card">' +
      '<button type="button" class="lms-prompt-close" aria-label="Close prompt">&times;</button>' +
      '<h2>Registration Required</h2>' +
      '<p>Please register first to access the LMS dashboard.</p>' +
      '<div class="lms-prompt-actions">' +
      '<button type="button" class="lms-prompt-register">Register Now</button>' +
      '<button type="button" class="lms-prompt-close-btn">Close</button>' +
      '</div>' +
      "</div>";
    document.body.appendChild(lmsPrompt);

    const lmsStyle = document.createElement("style");
    lmsStyle.textContent =
      "#lmsRegisterPrompt { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 10003; padding: 24px; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.35s ease, visibility 0.35s ease; }" +
      "#lmsRegisterPrompt.active { opacity: 1; visibility: visible; pointer-events: auto; }" +
      "#lmsRegisterPrompt .lms-prompt-overlay { position: absolute; inset: 0; background: rgba(2, 34, 73, 0.68); backdrop-filter: blur(6px); opacity: 0; transition: opacity 0.35s ease; cursor: pointer; }" +
      "#lmsRegisterPrompt.active .lms-prompt-overlay { opacity: 1; }" +
      "#lmsRegisterPrompt .lms-prompt-card { position: relative; width: 100%; max-width: 420px; padding: 34px 30px; background: #ffffff; border-radius: 22px; box-shadow: 0 28px 70px rgba(16, 45, 85, 0.28); text-align: center; z-index: 1; transform: scale(0.92) translateY(20px); opacity: 0; transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.35s ease, box-shadow 0.4s ease; }" +
      "#lmsRegisterPrompt.active .lms-prompt-card { transform: scale(1) translateY(0); opacity: 1; box-shadow: 0 32px 80px rgba(16, 45, 85, 0.32); }" +
      "#lmsRegisterPrompt .lms-prompt-card h2 { font-size: 1.5rem; color: #082c4c; margin-bottom: 10px; }" +
      "#lmsRegisterPrompt .lms-prompt-card p { font-size: 1rem; color: #5b6f82; margin-bottom: 24px; }" +
      "#lmsRegisterPrompt .lms-prompt-close { position: absolute; top: 14px; right: 16px; width: 36px; height: 36px; border: none; border-radius: 50%; background: rgba(0, 0, 0, 0.04); color: #5b6f82; font-size: 1.5rem; line-height: 1; cursor: pointer; transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease; }" +
      "#lmsRegisterPrompt .lms-prompt-close:hover { transform: rotate(90deg) scale(1.1); background: rgba(0, 0, 0, 0.08); color: #082c4c; }" +
      "#lmsRegisterPrompt .lms-prompt-register { display: inline-flex; align-items: center; justify-content: center; width: 100%; padding: 14px 28px; border: none; border-radius: 999px; background: linear-gradient(135deg, #0b5fa6 0%, #1387da 100%); background-size: 200% 200%; color: #ffffff; font-family: Arial, sans-serif; font-size: 1rem; font-weight: 700; cursor: pointer; box-shadow: 0 10px 24px rgba(19, 135, 218, 0.22); transition: transform 0.25s ease, box-shadow 0.25s ease, background-position 0.5s ease; animation: lms-register-pulse 2.2s infinite ease-in-out; }" +
      "#lmsRegisterPrompt .lms-prompt-register:hover { transform: scale(1.04) translateY(-2px); box-shadow: 0 14px 32px rgba(19, 135, 218, 0.35); background-position: 100% 0; }" +
      "@keyframes lms-register-pulse { 0%, 100% { box-shadow: 0 10px 24px rgba(19, 135, 218, 0.22); } 50% { box-shadow: 0 14px 32px rgba(19, 135, 218, 0.38); } }" +
      "#lmsRegisterPrompt .lms-prompt-actions { display: flex; flex-direction: column; gap: 12px; align-items: center; }" +
      "#lmsRegisterPrompt .lms-prompt-close-btn { display: inline-flex; align-items: center; justify-content: center; padding: 12px 28px; border: none; border-radius: 999px; background: #e8eef3; color: #5b6f82; font-family: Arial, sans-serif; font-size: 1rem; font-weight: 700; cursor: pointer; transition: background 0.2s ease, color 0.2s ease; }" +
      "#lmsRegisterPrompt .lms-prompt-close-btn:hover { background: #dfe8ef; color: #082c4c; }";
    document.head.appendChild(lmsStyle);

    function openLmsPrompt() {
      lmsPrompt.classList.add("active");
      lmsPrompt.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLmsPrompt() {
      lmsPrompt.classList.remove("active");
      lmsPrompt.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    lmsPrompt.querySelector(".lms-prompt-overlay").addEventListener("click", closeLmsPrompt);
    lmsPrompt.querySelector(".lms-prompt-close").addEventListener("click", closeLmsPrompt);
    lmsPrompt.querySelector(".lms-prompt-close-btn").addEventListener("click", closeLmsPrompt);
    lmsPrompt.querySelector(".lms-prompt-register").addEventListener("click", function () {
      closeLmsPrompt();

      if (document.getElementById("registerNowBtn") && document.getElementById("registrationModal")) {
        document.getElementById("registerNowBtn").click();
      } else {
        localStorage.setItem("gcareOpenLmsRegister", "true");
        window.location.href = "index.html";
      }
    });

    lmsLinks.forEach((lmsLink) => {
      const li = lmsLink.closest("li");
      if (li) {
        li.classList.remove("dropdown");
        const submenu = li.querySelector(".submenu");
        if (submenu) submenu.remove();
      }

      lmsLink.addEventListener("click", function (e) {
        e.preventDefault();
        if (localStorage.getItem("gcareStudentLoggedIn") === "true") {
          window.location.href = "lms-dashboard.html";
        } else {
          openLmsPrompt();
        }
      });
    });
  })();
});
