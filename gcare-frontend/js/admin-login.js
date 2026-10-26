// Admin credentials are verified server-side.
// No credentials are stored in this file.

document.addEventListener("DOMContentLoaded", function () {
  const adminLoginForm = document.getElementById("adminLoginForm");
  const errorMessage = document.getElementById("errorMessage");

  if (!adminLoginForm || !errorMessage) {
    console.error("Admin login form or error message element not found.");
    return;
  }

  // const API_BASE_URL = "https://backend-production-c5cb.up.railway.app/api";
  const API_BASE_URL = "http://localhost:3001";
  const loginButton = adminLoginForm.querySelector('button[type="submit"]');

  function setError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
  }

  function clearError() {
    errorMessage.textContent = "";
  }

  function setLoading(isLoading) {
    if (loginButton) {
      loginButton.disabled = isLoading;
      loginButton.textContent = isLoading ? "Logging in..." : "Login";
    }
  }

  adminLoginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    clearError();

    const enteredEmail = document.getElementById("adminEmail").value.trim();
    const enteredPassword = document.getElementById("adminPassword").value.trim();

    if (!enteredEmail && !enteredPassword) {
      setError("Please enter your email and password.");
      return;
    }

    if (!enteredEmail) {
      setError("Please enter your admin email.");
      return;
    }

    if (!enteredPassword) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword
        })
      });

      let result = {};
      const responseText = await response.text();

      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Login response parse error:", parseError);
      }

      if (response.ok && result.success && result.token) {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminEmail", enteredEmail);
        localStorage.setItem("adminToken", result.token);
        window.location.href = "admin-dashboard.html";
        return;
      }

      if (response.status === 401 || response.status === 403) {
        setError("Invalid admin email or password.");
        return;
      }

      if (result.message) {
        setError(result.message);
      } else {
        setError("Unable to connect to the server. Please try again.");
      }
    } catch (error) {
      console.error("Admin login network/server error:", error);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
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
