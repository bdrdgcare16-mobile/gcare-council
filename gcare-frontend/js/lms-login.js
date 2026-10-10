/* =====================================================
   LMS LOGIN — G Care Council website

   This page only authenticates against the SEPARATE
   LMS backend project. The LMS backend, dashboards,
   users, and database do not live in this project.

   Admin login uses the LMS backend's one-time
   handoffCode flow. The Admin JWT is never stored
   here and never placed in the URL — the Admin app
   exchanges the code itself.
===================================================== */

// Local development hits the LMS backend on this machine. In production,
// replace the placeholder with the deployed LMS backend origin (the same
// origin that serves the LMS Admin SPA, e.g. https://<app>.up.railway.app).
// NOTE: must be https:// — the login page is served over HTTPS and browsers
// block http:// (mixed-content) API calls.
const LMS_API_BASE_URL = ["localhost", "127.0.0.1"].includes(
  location.hostname
)
  ? "http://localhost:5000"
  : "https://REPLACE_WITH_DEPLOYED_LMS_ORIGIN";

const LMS_ADMIN_ROLES = ["admin", "super_admin"];

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("lmsLoginForm");
  const loginBtn = document.getElementById("lmsLoginBtn");
  const emailInput = document.getElementById("lmsEmail");
  const passwordInput = document.getElementById("lmsPassword");
  const errorMessage = document.getElementById("errorMessage");
  const togglePassword = document.getElementById("toggleLmsPassword");

  function showError(message) {
    if (errorMessage) {
      errorMessage.textContent = message;
    }
  }

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", function () {
      const icon = togglePassword.querySelector("i");
      const show = passwordInput.type === "password";
      passwordInput.type = show ? "text" : "password";
      togglePassword.setAttribute("aria-label", show ? "Hide password" : "Show password");
      if (icon) {
        icon.classList.toggle("fa-eye", !show);
        icon.classList.toggle("fa-eye-slash", show);
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      showError("");

      const email = emailInput ? emailInput.value.trim() : "";
      const password = passwordInput ? passwordInput.value : "";

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("Please enter a valid email address.");
        return;
      }

      if (!password) {
        showError("Password is required.");
        return;
      }

      if (loginBtn) {
        loginBtn.disabled = true;
        loginBtn.textContent = "Signing in...";
      }

      try {
        const response = await fetch(LMS_API_BASE_URL + "/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password })
        });

        const data = await response.json().catch(function () { return {}; });

        if (!response.ok) {
          showError(data.message || "Invalid email or password.");
          return;
        }

        const role = String(
          data.role || (data.user && data.user.role) || ""
        ).toLowerCase();

        if (LMS_ADMIN_ROLES.indexOf(role) !== -1) {
          if (!data.handoffCode) {
            showError("Login succeeded but no handoff code was returned.");
            return;
          }

          window.location.href =
            LMS_API_BASE_URL + "/admin/dashboard?code=" + encodeURIComponent(data.handoffCode);
          return;
        }

        if (role === "faculty") {
          showError("Faculty login integration is being configured.");
          return;
        }

        if (role === "student") {
          showError("Student dashboard is not configured yet.");
          return;
        }

        showError("Login succeeded but your role is not recognized.");
      } catch (error) {
        console.error("LMS LOGIN ERROR:", error);
        showError("Unable to reach the LMS server. Please try again later.");
      } finally {
        if (loginBtn) {
          loginBtn.disabled = false;
          loginBtn.textContent = "Login";
        }
      }
    });
  }
});
