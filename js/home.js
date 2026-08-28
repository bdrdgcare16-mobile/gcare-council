// document.addEventListener("DOMContentLoaded", function () {

// const slides = document.querySelectorAll("#homeSlideshow .slide");
// let currentSlide = 0;

// if (slides.length > 0) {
// setInterval(() => {
// slides[currentSlide].classList.remove("active");
// currentSlide = (currentSlide + 1) % slides.length;
// slides[currentSlide].classList.add("active");
// }, 3000);
// }

// const readMoreBtn = document.getElementById("readMoreBtn");

// if (readMoreBtn) {
// readMoreBtn.addEventListener("click", function (event) {
// event.preventDefault();
// window.location.href = "about.html";
// });
// }


// const socialButtons = document.querySelectorAll(".social-btn");

// socialButtons.forEach(button => {

// button.addEventListener("click", function(e){

// e.preventDefault();

// socialButtons.forEach(btn => btn.classList.remove("active"));

// this.classList.add("active");

// });

// });

// });






// document.addEventListener("DOMContentLoaded", function () {

//   const slides = document.querySelectorAll("#homeSlideshow .slide");
//   let currentSlide = 0;

//   if (slides.length > 0) {
//     setInterval(() => {
//       slides[currentSlide].classList.remove("active");
//       currentSlide = (currentSlide + 1) % slides.length;
//       slides[currentSlide].classList.add("active");
//     }, 3000);
//   }

//   const readMoreBtn = document.getElementById("readMoreBtn");

//   if (readMoreBtn) {
//     readMoreBtn.addEventListener("click", function (event) {
//       event.preventDefault();
//       window.location.href = "about.html";
//     });
//   }

//   const socialButtons = document.querySelectorAll(".social-btn");

//   socialButtons.forEach(button => {
//     button.addEventListener("click", function (e) {
//       e.preventDefault();
//       socialButtons.forEach(btn => btn.classList.remove("active"));
//       this.classList.add("active");
//     });
//   });

//   const dropLinks = document.querySelectorAll("#programmesDropdown a[data-programme]");

//   dropLinks.forEach((link) => {
//     link.addEventListener("click", function () {
//       const programmeKey = this.dataset.programme;
//       const subcourseId = this.dataset.subcourse;

//       if (programmeKey && subcourseId) {
//         this.href = `programmes.html#${programmeKey}/${subcourseId}`;
//       } else if (programmeKey) {
//         this.href = `programmes.html#${programmeKey}`;
//       }
//     });
//   });

// });











document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll("#homeSlideshow .slide");
  let currentSlide = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 3000);
  }

  const readMoreBtn = document.getElementById("readMoreBtn");

  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "about.html";
    });
  }

  const socialButtons = document.querySelectorAll(".social-btn");

  socialButtons.forEach((button) => {
  button.addEventListener("click", function () {
    socialButtons.forEach((btn) => btn.classList.remove("active-social"));
    this.classList.add("active-social");
  });
});

  const dropLinks = document.querySelectorAll("#programmesDropdown a[data-programme]");

  dropLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const programmeKey = this.dataset.programme;
      const subcourseId = this.dataset.subcourse;

      if (programmeKey && subcourseId) {
        this.href = `programmes.html#${programmeKey}/${subcourseId}`;
      } else if (programmeKey) {
        this.href = `programmes.html#${programmeKey}`;
      }
    });
  });

  // mobile nested submenu toggle
  const submenuParents = document.querySelectorAll("#programmesDropdown .has-submenu > a");

  submenuParents.forEach((parentLink) => {
    parentLink.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        const parentLi = this.parentElement;
        const childMenu = parentLi.querySelector(".nested-submenu");

        if (childMenu) {
          e.preventDefault();

          document
            .querySelectorAll("#programmesDropdown .has-submenu")
            .forEach((item) => {
              if (item !== parentLi) {
                item.classList.remove("open");
              }
            });

          parentLi.classList.toggle("open");
        }
      }
    });
  });

  // Registration Modal
  const registerNowBtn = document.getElementById("registerNowBtn");
  const registrationModal = document.getElementById("registrationModal");
  const registrationModalOverlay = document.getElementById("registrationModalOverlay");
  const registrationModalClose = document.getElementById("registrationModalClose");
  const registrationForm = document.getElementById("registrationForm");
  const registrationFinalSuccess = document.getElementById("registrationFinalSuccess");
  const registrationSuccessBtn = document.getElementById("registrationSuccessBtn");
  const authLoginToggle = document.getElementById("authLoginToggle");
  const loginForm = document.getElementById("loginForm");
  const backToRegisterBtn = document.getElementById("backToRegisterBtn");
  const regSendOtpBtn = document.getElementById("regSendOtpBtn");
  const regVerifyOtpBtn = document.getElementById("regVerifyOtpBtn");
  const regSubmitBtn = document.getElementById("regSubmitBtn");
  const passwordArea = document.getElementById("registrationPasswordArea");
  const authTitle = document.getElementById("authTitle");
  const authSubtitle = document.getElementById("authSubtitle");

  const USERS_KEY = "gcareRegisteredUsers";
  const API_BASE_URL = "https://backend-production-c5cb.up.railway.app/api";

  let isOtpVerified = false;

  async function readJsonResponse(response, fallbackMessage) {
    const responseText = await response.text();
    try {
      return JSON.parse(responseText);
    } catch (error) {
      console.error("INVALID BACKEND RESPONSE:", responseText);
      throw new Error(fallbackMessage);
    }
  }

  function getRegisteredUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveRegisteredUser(email, user) {
    const users = getRegisteredUsers();
    users[email.toLowerCase()] = user;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  async function checkEmailExists(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() })
      });

      if (!response.ok) {
        return false;
      }

      const result = await readJsonResponse(response, "The email check API returned an invalid response.");
      return result.exists === true || (result.success === false && /already registered|already exists|duplicate/i.test(result.message || ""));
    } catch (error) {
      console.error("EMAIL CHECK ERROR:", error);
      return false;
    }
  }

  function openRegistrationModal() {
    if (registrationModal) {
      registrationModal.classList.add("active");
      registrationModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      resetRegistrationFlow();
    }
  }

  function closeRegistrationModal() {
    if (registrationModal) {
      registrationModal.classList.remove("active");
      registrationModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      resetRegistrationFlow();
    }
  }

  function clearRegistrationErrors() {
    const ids = [
      "regUsername",
      "regEmail",
      "regOtp",
      "regNewPassword",
      "regConfirmPassword",
      "loginEmail",
      "loginPassword",
    ];

    ids.forEach((id) => {
      const field = document.getElementById(id);
      const error = document.getElementById(id + "Error");
      if (field) field.classList.remove("error-field");
      if (error) error.textContent = "";
    });

    const loginMessage = document.getElementById("loginMessage");
    if (loginMessage) {
      loginMessage.textContent = "";
      loginMessage.className = "registration-message";
    }
  }

  function showRegistrationError(id, message) {
    const field = document.getElementById(id);
    const error = document.getElementById(id + "Error");
    if (field) field.classList.add("error-field");
    if (error) error.textContent = message;
  }

  function checkSubmitState() {
    const newPass = document.getElementById("regNewPassword");
    const confirmPass = document.getElementById("regConfirmPassword");

    if (!regSubmitBtn || !newPass || !confirmPass || !isOtpVerified) {
      if (regSubmitBtn) regSubmitBtn.disabled = true;
      return;
    }

    const hasNewPassword = newPass.value.length > 0;
    const hasConfirmPassword = confirmPass.value.length > 0;
    const passwordsMatch = newPass.value === confirmPass.value;

    regSubmitBtn.disabled = !(hasNewPassword && hasConfirmPassword && passwordsMatch);
  }

  function showRegistrationForm() {
    if (registrationForm) registrationForm.style.display = "flex";
    if (loginForm) loginForm.style.display = "none";
    if (registrationFinalSuccess) registrationFinalSuccess.style.display = "none";
    if (authTitle) authTitle.textContent = "Create Account";
    if (authSubtitle) authSubtitle.textContent = "Enter your details to register";
    if (authLoginToggle) authLoginToggle.textContent = "LOGIN";

    const registrationFormHeader = document.getElementById("registrationFormHeader");
    if (registrationFormHeader) registrationFormHeader.style.display = "block";
  }

  function showLoginForm() {
    if (registrationForm) registrationForm.style.display = "none";
    if (loginForm) loginForm.style.display = "flex";
    if (registrationFinalSuccess) registrationFinalSuccess.style.display = "none";
    if (authLoginToggle) authLoginToggle.textContent = "Register";

    const registrationFormHeader = document.getElementById("registrationFormHeader");
    if (registrationFormHeader) registrationFormHeader.style.display = "none";
  }

  function resetRegistrationFlow() {
    isOtpVerified = false;

    if (registrationForm) {
      registrationForm.reset();
      registrationForm.style.display = "flex";
    }

    if (loginForm) {
      loginForm.reset();
      loginForm.style.display = "none";
    }

    if (registrationFinalSuccess) registrationFinalSuccess.style.display = "none";

    const otpArea = document.getElementById("registrationOtpArea");
    const otpInfo = document.getElementById("registrationOtpInfo");
    const otpSuccess = document.getElementById("registrationOtpSuccess");

    if (otpArea) otpArea.style.display = "none";
    if (otpInfo) {
      otpInfo.innerHTML = "";
      otpInfo.style.display = "";
    }
    if (otpSuccess) otpSuccess.style.display = "none";
    if (passwordArea) {
      passwordArea.style.display = "none";
      passwordArea.classList.remove("active");
    }
    if (regSubmitBtn) regSubmitBtn.disabled = true;

    if (newPassInput) newPassInput.type = "password";
    if (confirmPassInput) confirmPassInput.type = "password";

    if (toggleNewPassword) {
      toggleNewPassword.setAttribute("aria-label", "Show new password");
      const icon = toggleNewPassword.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    }

    if (toggleConfirmPassword) {
      toggleConfirmPassword.setAttribute("aria-label", "Show confirm password");
      const icon = toggleConfirmPassword.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    }

    const loginPasswordInput = document.getElementById("loginPassword");
    const toggleLoginPasswordBtn = document.getElementById("toggleLoginPassword");
    if (loginPasswordInput) loginPasswordInput.type = "password";
    if (toggleLoginPasswordBtn) {
      toggleLoginPasswordBtn.setAttribute("aria-label", "Show password");
      const icon = toggleLoginPasswordBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    }

    clearRegistrationErrors();
    showRegistrationForm();
  }

  if (registerNowBtn) {
    registerNowBtn.addEventListener("click", openRegistrationModal);
  }

  if (registrationModalClose) {
    registrationModalClose.addEventListener("click", closeRegistrationModal);
  }

  if (registrationModalOverlay) {
    registrationModalOverlay.addEventListener("click", closeRegistrationModal);
  }

  if (registrationSuccessBtn) {
    registrationSuccessBtn.addEventListener("click", closeRegistrationModal);
  }

  if (authLoginToggle) {
    authLoginToggle.addEventListener("click", function () {
      if (loginForm && loginForm.style.display === "flex") {
        showRegistrationForm();
      } else {
        showLoginForm();
      }
    });
  }

  if (backToRegisterBtn) {
    backToRegisterBtn.addEventListener("click", showRegistrationForm);
  }

  if (regSendOtpBtn) {
    regSendOtpBtn.addEventListener("click", async function () {
      clearRegistrationErrors();

      const username = document.getElementById("regUsername").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      let isValid = true;

      if (!username) {
        showRegistrationError("regUsername", "Username is required.");
        isValid = false;
      }

      if (!email) {
        showRegistrationError("regEmail", "Email ID is required.");
        isValid = false;
      } else if (!isValidEmail(email)) {
        showRegistrationError("regEmail", "Please enter a valid email address.");
        isValid = false;
      }

      if (!isValid) return;

      if (regSendOtpBtn) {
        regSendOtpBtn.disabled = true;
        regSendOtpBtn.textContent = "Checking...";
      }

      const users = getRegisteredUsers();
      if (users[email.toLowerCase()]) {
        showRegistrationError("regEmail", "Email ID already registered. Please use another email.");
        if (regSendOtpBtn) {
          regSendOtpBtn.disabled = false;
          regSendOtpBtn.textContent = "SEND OTP";
        }
        return;
      }

      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        showRegistrationError("regEmail", "Email ID already registered. Please use another email.");
        if (regSendOtpBtn) {
          regSendOtpBtn.disabled = false;
          regSendOtpBtn.textContent = "SEND OTP";
        }
        return;
      }

      try {
        if (regSendOtpBtn) {
          regSendOtpBtn.disabled = true;
          regSendOtpBtn.textContent = "Sending...";
        }

        const otpInfo = document.getElementById("registrationOtpInfo");
        if (otpInfo) {
          otpInfo.textContent = "Sending email OTP...";
        }

        const response = await fetch(`${API_BASE_URL}/send-email-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.toLowerCase() })
        });

        const result = await readJsonResponse(response, "The email OTP API returned an invalid response.");

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Email OTP sending failed.");
        }

        const otpArea = document.getElementById("registrationOtpArea");
        if (otpArea) {
          otpArea.style.display = "flex";
        }

        if (otpInfo) {
          otpInfo.textContent = "Email OTP sent successfully. Check your inbox or spam folder.";
        }

      } catch (error) {
        console.error("EMAIL OTP SEND ERROR:", error);
        showRegistrationError("regEmail", error.message || "Email OTP sending failed.");
      } finally {
        if (regSendOtpBtn) {
          regSendOtpBtn.disabled = false;
          regSendOtpBtn.textContent = "SEND OTP";
        }
      }
    });
  }

  if (regVerifyOtpBtn) {
    regVerifyOtpBtn.addEventListener("click", async function () {
      clearRegistrationErrors();

      const email = document.getElementById("regEmail").value.trim().toLowerCase();
      const enteredOtp = document.getElementById("regOtp").value.trim();

      if (!enteredOtp) {
        showRegistrationError("regOtp", "Please enter the OTP.");
        return;
      }

      if (!/^\d{6}$/.test(enteredOtp)) {
        showRegistrationError("regOtp", "Enter the complete 6-digit email OTP.");
        return;
      }

      try {
        if (regVerifyOtpBtn) {
          regVerifyOtpBtn.disabled = true;
          regVerifyOtpBtn.textContent = "Verifying...";
        }

        const response = await fetch(`${API_BASE_URL}/verify-email-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, otp: enteredOtp })
        });

        const result = await readJsonResponse(response, "The email OTP verification API returned an invalid response.");

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Email OTP verification failed.");
        }

        isOtpVerified = true;

        const otpArea = document.getElementById("registrationOtpArea");
        const otpSuccess = document.getElementById("registrationOtpSuccess");

        if (otpArea) otpArea.style.display = "none";
        if (otpSuccess) otpSuccess.style.display = "block";

        if (passwordArea) {
          passwordArea.style.display = "flex";
          passwordArea.classList.add("active");
        }

        checkSubmitState();

      } catch (error) {
        console.error("EMAIL OTP VERIFY ERROR:", error);
        showRegistrationError("regOtp", error.message || "Invalid OTP. Please try again.");
      } finally {
        if (regVerifyOtpBtn) {
          regVerifyOtpBtn.disabled = false;
          regVerifyOtpBtn.textContent = "VERIFY OTP";
        }
      }
    });
  }

  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearRegistrationErrors();

      const username = document.getElementById("regUsername").value.trim();
      const email = document.getElementById("regEmail").value.trim();
      const newPassword = document.getElementById("regNewPassword").value;
      const confirmPassword = document.getElementById("regConfirmPassword").value;
      let isValid = true;

      if (!isOtpVerified) {
        showRegistrationError("regOtp", "Please verify your email with OTP before submitting.");
        isValid = false;
      }

      if (!newPassword) {
        showRegistrationError("regNewPassword", "New password is required.");
        isValid = false;
      } else if (newPassword.length < 6) {
        showRegistrationError("regNewPassword", "Password must be at least 6 characters.");
        isValid = false;
      }

      if (!confirmPassword) {
        showRegistrationError("regConfirmPassword", "Please confirm your password.");
        isValid = false;
      } else if (confirmPassword !== newPassword) {
        showRegistrationError("regConfirmPassword", "Passwords do not match.");
        isValid = false;
      }

      if (isValid) {
        saveRegisteredUser(email, { username: username, email: email, password: newPassword });

        localStorage.setItem("gcareStudentLoggedIn", "true");
        localStorage.setItem("gcareStudentEmail", email);

        if (registrationForm) registrationForm.style.display = "none";
        if (registrationFinalSuccess) registrationFinalSuccess.style.display = "block";
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearRegistrationErrors();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      let isValid = true;

      if (!email) {
        showRegistrationError("loginEmail", "Email ID is required.");
        isValid = false;
      } else if (!isValidEmail(email)) {
        showRegistrationError("loginEmail", "Please enter a valid email address.");
        isValid = false;
      }

      if (!password) {
        showRegistrationError("loginPassword", "Password is required.");
        isValid = false;
      }

      if (!isValid) return;

      const users = getRegisteredUsers();
      const user = users[email.toLowerCase()];

      if (!user) {
        const loginMessage = document.getElementById("loginMessage");
        if (loginMessage) {
          loginMessage.textContent = "Please register first";
          loginMessage.className = "registration-message registration-message-error";
        }
        return;
      }

      if (user.password !== password) {
        showRegistrationError("loginPassword", "Incorrect password.");
        return;
      }

      localStorage.setItem("gcareStudentLoggedIn", "true");
      localStorage.setItem("gcareStudentEmail", email);
      window.location.href = "lms-dashboard.html";
    });
  }

  const newPassInput = document.getElementById("regNewPassword");
  const confirmPassInput = document.getElementById("regConfirmPassword");

  if (newPassInput) newPassInput.addEventListener("input", checkSubmitState);
  if (confirmPassInput) confirmPassInput.addEventListener("input", checkSubmitState);

  const toggleNewPassword = document.getElementById("toggleNewPassword");
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

  function setupPasswordToggle(toggleBtn, inputId, showLabel) {
    if (!toggleBtn) return;
    const input = document.getElementById(inputId);
    const icon = toggleBtn.querySelector("i");

    toggleBtn.addEventListener("click", function () {
      if (!input) return;
      if (input.type === "password") {
        input.type = "text";
        toggleBtn.setAttribute("aria-label", "Hide " + showLabel);
        if (icon) {
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        }
      } else {
        input.type = "password";
        toggleBtn.setAttribute("aria-label", "Show " + showLabel);
        if (icon) {
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }
    });
  }

  setupPasswordToggle(toggleNewPassword, "regNewPassword", "new password");
  setupPasswordToggle(toggleConfirmPassword, "regConfirmPassword", "confirm password");

  const toggleLoginPassword = document.getElementById("toggleLoginPassword");
  setupPasswordToggle(toggleLoginPassword, "loginPassword", "password");

  resetRegistrationFlow();

  if (localStorage.getItem("gcareOpenLmsRegister") === "true") {
    localStorage.removeItem("gcareOpenLmsRegister");
    openRegistrationModal();
  }
});