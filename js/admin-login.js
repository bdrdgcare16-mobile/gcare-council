document.addEventListener("DOMContentLoaded", function () {
  const adminLoginForm = document.getElementById("adminLoginForm");
  const errorMessage = document.getElementById("errorMessage");

  const adminEmail = "admin@gcare.com";
  const adminPassword = "admin123";

  adminLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredEmail = document.getElementById("adminEmail").value.trim();
    const enteredPassword = document.getElementById("adminPassword").value.trim();

    if (enteredEmail === adminEmail && enteredPassword === adminPassword) {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "admin-dashboard.html";
    } else {
      errorMessage.textContent = "Invalid email or password.";
    }
  });
});