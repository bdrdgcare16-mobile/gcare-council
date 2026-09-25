// Admin credentials are verified server-side.
// No credentials are stored in this file.




document.addEventListener("DOMContentLoaded", function () {
  const adminLoginForm = document.getElementById("adminLoginForm");
  const errorMessage = document.getElementById("errorMessage");

  const API_BASE_URL =
    "https://backend-production-c5cb.up.railway.app/api";

  adminLoginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const enteredEmail = document.getElementById("adminEmail").value.trim();
    const enteredPassword = document.getElementById("adminPassword").value.trim();

    errorMessage.textContent = "";

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword
        })
      });

      const result = await response.json();

      if (response.ok && result.success && result.token) {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminEmail", enteredEmail);
        localStorage.setItem("adminToken", result.token);
        window.location.href = "admin-dashboard.html";
      } else {
        errorMessage.textContent =
          result.message || "Invalid admin email or password.";
      }
    } catch (error) {
      console.error("Admin login error:", error);
      errorMessage.textContent =
        "Unable to reach the server. Please try again.";
    }
  });

  const adminPassword = document.getElementById("adminPassword");
  const toggleAdminPassword = document.getElementById("toggleAdminPassword");

  if (toggleAdminPassword && adminPassword) {
    toggleAdminPassword.addEventListener("click", function () {
      const icon = toggleAdminPassword.querySelector("i");

      if (adminPassword.type === "password") {
        adminPassword.type = "text";
        toggleAdminPassword.setAttribute("aria-label", "Hide password");
        if (icon) {
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        }
      } else {
        adminPassword.type = "password";
        toggleAdminPassword.setAttribute("aria-label", "Show password");
        if (icon) {
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }
    });
  }
});