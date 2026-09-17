// document.addEventListener("DOMContentLoaded", function () {
//   const adminLoginForm = document.getElementById("adminLoginForm");
//   const errorMessage = document.getElementById("errorMessage");

//   const ADMIN_EMAIL = "infotech@gcarecouncil.in";
//   const ADMIN_PASSWORD = "admin123";

//   adminLoginForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const enteredEmail = document.getElementById("adminEmail").value.trim();
//     const enteredPassword = document.getElementById("adminPassword").value.trim();

//     errorMessage.textContent = "";

//     if (enteredEmail === ADMIN_EMAIL && enteredPassword === ADMIN_PASSWORD) {
//       localStorage.setItem("adminLoggedIn", "true");
//       localStorage.setItem("adminEmail", enteredEmail);
//       window.location.href = "admin-dashboard.html";
//     } else {
//       errorMessage.textContent = "Invalid admin email or password.";
//     }
//   });
// });




document.addEventListener("DOMContentLoaded", function () {
  const adminLoginForm = document.getElementById("adminLoginForm");
  const errorMessage = document.getElementById("errorMessage");

  const ADMIN_EMAIL = "infotech@gcarecouncil.in";
  const ADMIN_PASSWORD = "admin123";

  adminLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredEmail = document.getElementById("adminEmail").value.trim();
    const enteredPassword = document.getElementById("adminPassword").value.trim();

    errorMessage.textContent = "";

    if (enteredEmail === ADMIN_EMAIL && enteredPassword === ADMIN_PASSWORD) {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminEmail", enteredEmail);
      window.location.href = "admin-dashboard.html";
    } else {
      errorMessage.textContent = "Invalid admin email or password.";
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