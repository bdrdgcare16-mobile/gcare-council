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
  const regSendPhoneOtpBtn = document.getElementById("regSendPhoneOtpBtn");
  const regVerifyPhoneOtpBtn = document.getElementById("regVerifyPhoneOtpBtn");
  const regResendEmailOtpBtn = document.getElementById("regResendEmailOtpBtn");
  const regResendPhoneOtpBtn = document.getElementById("regResendPhoneOtpBtn");
  const regNextBtn = document.getElementById("regNextBtn");
  const regBackBtn = document.getElementById("regBackBtn");
  const regSubmitBtn = document.getElementById("regSubmitBtn");
  const passwordArea = document.getElementById("registrationPasswordArea");
  const registrationStep1 = document.getElementById("registrationStep1");
  const authTitle = document.getElementById("authTitle");
  const authSubtitle = document.getElementById("authSubtitle");

  const USERS_KEY = "gcareRegisteredUsers";
  const API_BASE_URL =
  ["localhost", "127.0.0.1"].includes(location.hostname)
    ? "http://localhost:3000/api"
    : "https://backend-production-c5cb.up.railway.app/api";

  let isOtpVerified = false;
  let isPhoneOtpVerified = false;

  const resendTimers = new Map();

  function startResendCountdown(button, seconds) {
    if (!button) return;
    if (resendTimers.has(button.id)) {
      clearInterval(resendTimers.get(button.id));
      resendTimers.delete(button.id);
    }
    button.disabled = true;
    button.textContent = `Resend OTP in ${seconds}s`;
    let remaining = seconds;
    const timer = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(timer);
        resendTimers.delete(button.id);
        button.disabled = false;
        button.textContent = "Resend OTP";
      } else {
        button.textContent = `Resend OTP in ${remaining}s`;
      }
    }, 1000);
    resendTimers.set(button.id, timer);
  }

  function clearResendTimers() {
    resendTimers.forEach((timer) => clearInterval(timer));
    resendTimers.clear();
    if (regResendEmailOtpBtn) {
      regResendEmailOtpBtn.disabled = true;
      regResendEmailOtpBtn.textContent = "Resend OTP";
    }
    if (regResendPhoneOtpBtn) {
      regResendPhoneOtpBtn.disabled = true;
      regResendPhoneOtpBtn.textContent = "Resend OTP";
    }
  }

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

  function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(password);
  }

  function getTodayString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function validateNewUserFields() {
    const username = document.getElementById("regUsername").value.trim();
    const lastName = document.getElementById("regLastName").value.trim();
    const dob = document.getElementById("regDob").value;
    const email = document.getElementById("regEmail").value.trim();
    const address = document.getElementById("regAddress").value.trim();
    const city = document.getElementById("regCity").value.trim();
    const state = document.getElementById("regState").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const today = getTodayString();
    let isValid = true;

    if (!username) {
      showRegistrationError("regUsername", "Username is required.");
      isValid = false;
    }

    if (!lastName) {
      showRegistrationError("regLastName", "Last Name is required.");
      isValid = false;
    }

    if (!dob) {
      showRegistrationError("regDob", "Date of Birth is required.");
      isValid = false;
    } else if (dob > today) {
      showRegistrationError("regDob", "Future dates are not allowed.");
      isValid = false;
    }

    if (!email) {
      showRegistrationError("regEmail", "Email ID is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showRegistrationError("regEmail", "Please enter a valid email address.");
      isValid = false;
    }

    if (!address) {
      showRegistrationError("regAddress", "Address is required.");
      isValid = false;
    }

    if (!city) {
      showRegistrationError("regCity", "City is required.");
      isValid = false;
    }

    if (!state) {
      showRegistrationError("regState", "State is required.");
      isValid = false;
    }

    if (!phone) {
      showRegistrationError("regPhone", "Phone Number is required.");
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      showRegistrationError("regPhone", "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9.");
      isValid = false;
    }

    return isValid;
  }

  const regDob = document.getElementById("regDob");
  if (regDob) {
    regDob.setAttribute("max", getTodayString());
  }

  const regPhone = document.getElementById("regPhone");
  if (regPhone) {
    regPhone.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 10);
    });
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
      "regLastName",
      "regDob",
      "regEmail",
      "regAddress",
      "regCity",
      "regState",
      "regPhone",
      "regOtp",
      "regPhoneOtp",
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
    const newPassErr = document.getElementById("regNewPasswordError");
    const confirmPassErr = document.getElementById("regConfirmPasswordError");

    if (!regSubmitBtn || !newPass || !confirmPass) {
      if (regSubmitBtn) regSubmitBtn.disabled = true;
      return;
    }

    const newPassValue = newPass.value;
    const confirmPassValue = confirmPass.value;

    const validPassword = validatePassword(newPassValue);
    const hasConfirm = confirmPassValue.length > 0;
    const passwordsMatch = newPassValue === confirmPassValue;

    regSubmitBtn.disabled = !(validPassword && hasConfirm && passwordsMatch);

    if (newPassValue && !validPassword) {
      if (newPass) newPass.classList.add("error-field");
      if (newPassErr) newPassErr.textContent = "Password must be at least 8 characters and contain a letter, number, and special character.";
    } else {
      if (newPass) newPass.classList.remove("error-field");
      if (newPassErr) newPassErr.textContent = "";
    }

    if (confirmPassValue && !passwordsMatch) {
      if (confirmPass) confirmPass.classList.add("error-field");
      if (confirmPassErr) confirmPassErr.textContent = "Passwords do not match";
    } else {
      if (confirmPass) confirmPass.classList.remove("error-field");
      if (confirmPassErr) confirmPassErr.textContent = "";
    }
  }

  function showRegistrationForm() {
    if (registrationForm) registrationForm.style.display = "flex";
    if (registrationStep1) registrationStep1.style.display = "flex";
    if (passwordArea) {
      passwordArea.style.display = "none";
      passwordArea.classList.remove("active");
    }
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
    isPhoneOtpVerified = false;

    if (registrationForm) {
      registrationForm.reset();
      registrationForm.style.display = "flex";
    }

    if (loginForm) {
      loginForm.reset();
      loginForm.style.display = "none";
    }

    if (registrationFinalSuccess) registrationFinalSuccess.style.display = "none";
    if (registrationStep1) registrationStep1.style.display = "flex";

    const otpArea = document.getElementById("registrationOtpArea");
    const otpInfo = document.getElementById("registrationOtpInfo");
    const emailOtpSuccess = document.getElementById("registrationEmailOtpSuccess");
    const regOtp = document.getElementById("regOtp");

    if (otpArea) otpArea.style.display = "none";
    if (otpInfo) {
      otpInfo.innerHTML = "";
      otpInfo.style.display = "";
    }
    if (emailOtpSuccess) emailOtpSuccess.style.display = "none";
    if (regOtp) regOtp.value = "";
    if (passwordArea) {
      passwordArea.style.display = "none";
      passwordArea.classList.remove("active");
    }

    const phoneOtpArea = document.getElementById("registrationPhoneOtpArea");
    const phoneOtpInfo = document.getElementById("registrationPhoneOtpInfo");
    const phoneOtp = document.getElementById("regPhoneOtp");
    const phoneOtpSuccess = document.getElementById("registrationPhoneOtpSuccess");

    if (phoneOtpArea) phoneOtpArea.style.display = "none";
    if (phoneOtpInfo) {
      phoneOtpInfo.innerHTML = "";
      phoneOtpInfo.style.display = "";
    }
    if (phoneOtp) phoneOtp.value = "";
    if (phoneOtpSuccess) phoneOtpSuccess.style.display = "none";
    if (regSubmitBtn) {
      regSubmitBtn.disabled = true;
      regSubmitBtn.textContent = "SUBMIT";
    }

    clearResendTimers();

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

  async function sendEmailOtp() {
    clearRegistrationErrors();

    const email = document.getElementById("regEmail").value.trim();

    if (!email) {
      showRegistrationError("regEmail", "Email ID is required.");
      return;
    }

    if (!isValidEmail(email)) {
      showRegistrationError("regEmail", "Please enter a valid email address.");
      return;
    }

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

        startResendCountdown(regResendEmailOtpBtn, 30);

      } catch (error) {
        console.error("EMAIL OTP SEND ERROR:", error);
        showRegistrationError("regEmail", error.message || "Email OTP sending failed.");
      } finally {
        if (regSendOtpBtn) {
          regSendOtpBtn.disabled = false;
          regSendOtpBtn.textContent = "SEND OTP";
        }
      }
  }

  function checkOtpState() {
    if (isOtpVerified && isPhoneOtpVerified) {
      checkSubmitState();
    }
  }

  if (regSendOtpBtn) {
    regSendOtpBtn.addEventListener("click", sendEmailOtp);
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
        const emailOtpSuccess = document.getElementById("registrationEmailOtpSuccess");

        if (otpArea) otpArea.style.display = "none";
        if (emailOtpSuccess) emailOtpSuccess.style.display = "block";

        checkOtpState();

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

  async function sendPhoneOtp() {
    clearRegistrationErrors();

    const phone = document.getElementById("regPhone").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();

    if (!phone) {
      showRegistrationError("regPhone", "Phone Number is required.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      showRegistrationError("regPhone", "Enter a valid 10-digit phone number starting with 6, 7, 8, or 9.");
      return;
    }

    if (regSendPhoneOtpBtn) {
      regSendPhoneOtpBtn.disabled = true;
      regSendPhoneOtpBtn.textContent = "Sending...";
    }

    const phoneOtpInfo = document.getElementById("registrationPhoneOtpInfo");
    if (phoneOtpInfo) {
      phoneOtpInfo.textContent = "Sending mobile OTP...";
    }

    try {
      const response = await fetch(`${API_BASE_URL}/send-mobile-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone, email: email })
      });

      const result = await readJsonResponse(response, "The mobile OTP API returned an invalid response.");

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Mobile OTP sending failed.");
      }

      const phoneOtpArea = document.getElementById("registrationPhoneOtpArea");
      if (phoneOtpArea) {
        phoneOtpArea.style.display = "flex";
      }

      if (phoneOtpInfo) {
        phoneOtpInfo.textContent = "Mobile OTP sent successfully. Check your phone.";
      }

      startResendCountdown(regResendPhoneOtpBtn, 30);

    } catch (error) {
      console.error("MOBILE OTP SEND ERROR:", error);
      showRegistrationError("regPhone", error.message || "Mobile OTP sending failed.");
    } finally {
      if (regSendPhoneOtpBtn) {
        regSendPhoneOtpBtn.disabled = false;
        regSendPhoneOtpBtn.textContent = "SEND OTP";
      }
    }
  }

  if (regSendPhoneOtpBtn) {
    regSendPhoneOtpBtn.addEventListener("click", sendPhoneOtp);
  }

  if (regVerifyPhoneOtpBtn) {
    regVerifyPhoneOtpBtn.addEventListener("click", async function () {
      clearRegistrationErrors();

      const email = document.getElementById("regEmail").value.trim().toLowerCase();
      const phone = document.getElementById("regPhone").value.trim();
      const enteredOtp = document.getElementById("regPhoneOtp").value.trim();

      if (!enteredOtp) {
        showRegistrationError("regPhoneOtp", "Please enter the OTP.");
        return;
      }

      if (!/^\d{6}$/.test(enteredOtp)) {
        showRegistrationError("regPhoneOtp", "Enter the complete 6-digit mobile OTP.");
        return;
      }

      try {
        if (regVerifyPhoneOtpBtn) {
          regVerifyPhoneOtpBtn.disabled = true;
          regVerifyPhoneOtpBtn.textContent = "Verifying...";
        }

        const response = await fetch(`${API_BASE_URL}/verify-mobile-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: phone, email: email, otp: enteredOtp })
        });

        const result = await readJsonResponse(response, "The mobile OTP verification API returned an invalid response.");

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Mobile OTP verification failed.");
        }

        isPhoneOtpVerified = true;

        const phoneOtpArea = document.getElementById("registrationPhoneOtpArea");
        const phoneOtpSuccess = document.getElementById("registrationPhoneOtpSuccess");

        if (phoneOtpArea) phoneOtpArea.style.display = "none";
        if (phoneOtpSuccess) phoneOtpSuccess.style.display = "block";

        checkOtpState();

      } catch (error) {
        console.error("MOBILE OTP VERIFY ERROR:", error);
        showRegistrationError("regPhoneOtp", error.message || "Invalid OTP. Please try again.");
      } finally {
        if (regVerifyPhoneOtpBtn) {
          regVerifyPhoneOtpBtn.disabled = false;
          regVerifyPhoneOtpBtn.textContent = "VERIFY OTP";
        }
      }
    });
  }

  if (regResendEmailOtpBtn) {
    regResendEmailOtpBtn.addEventListener("click", sendEmailOtp);
  }

  if (regResendPhoneOtpBtn) {
    regResendPhoneOtpBtn.addEventListener("click", sendPhoneOtp);
  }

  const regEmailInput = document.getElementById("regEmail");
  if (regEmailInput) {
    regEmailInput.addEventListener("input", function () {
      if (isOtpVerified) {
        isOtpVerified = false;
        const emailOtpSuccess = document.getElementById("registrationEmailOtpSuccess");
        if (emailOtpSuccess) emailOtpSuccess.style.display = "none";
        if (passwordArea) {
          passwordArea.style.display = "none";
          passwordArea.classList.remove("active");
        }
        if (regSubmitBtn) regSubmitBtn.disabled = true;
      }
    });
  }

  if (regPhone) {
    regPhone.addEventListener("input", function () {
      if (isPhoneOtpVerified) {
        isPhoneOtpVerified = false;
        const phoneOtpSuccess = document.getElementById("registrationPhoneOtpSuccess");
        if (phoneOtpSuccess) phoneOtpSuccess.style.display = "none";
        if (passwordArea) {
          passwordArea.style.display = "none";
          passwordArea.classList.remove("active");
        }
        if (regSubmitBtn) regSubmitBtn.disabled = true;
      }
    });
  }

  if (regNextBtn) {
    regNextBtn.addEventListener("click", function () {
      clearRegistrationErrors();

      let isValid = validateNewUserFields();

      if (isValid && !isOtpVerified) {
        showRegistrationError("regEmail", "Please verify your email with OTP before proceeding.");
        isValid = false;
      }

      if (isValid && !isPhoneOtpVerified) {
        showRegistrationError("regPhone", "Please verify your phone number with OTP before proceeding.");
        isValid = false;
      }

      if (isValid) {
        if (registrationStep1) registrationStep1.style.display = "none";
        if (passwordArea) {
          passwordArea.style.display = "flex";
          passwordArea.classList.add("active");
        }
        checkSubmitState();
      }
    });
  }

  if (regBackBtn) {
    regBackBtn.addEventListener("click", function () {
      if (passwordArea) {
        passwordArea.style.display = "none";
        passwordArea.classList.remove("active");
      }
      if (registrationStep1) registrationStep1.style.display = "flex";

      const newPassErr = document.getElementById("regNewPasswordError");
      const confirmPassErr = document.getElementById("regConfirmPasswordError");
      if (newPassErr) newPassErr.textContent = "";
      if (confirmPassErr) confirmPassErr.textContent = "";

      const newPass = document.getElementById("regNewPassword");
      const confirmPass = document.getElementById("regConfirmPassword");
      if (newPass) newPass.classList.remove("error-field");
      if (confirmPass) confirmPass.classList.remove("error-field");
    });
  }

  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearRegistrationErrors();

      let isValid = validateNewUserFields();

      if (!isOtpVerified) {
        showRegistrationError("regOtp", "Please verify your email with OTP before submitting.");
        isValid = false;
      }

      if (!isPhoneOtpVerified) {
        showRegistrationError("regPhoneOtp", "Please verify your phone number with OTP before submitting.");
        isValid = false;
      }

      const newPassword = document.getElementById("regNewPassword").value;
      const confirmPassword = document.getElementById("regConfirmPassword").value;

      if (!newPassword) {
        showRegistrationError("regNewPassword", "New password is required.");
        isValid = false;
      } else if (!validatePassword(newPassword)) {
        showRegistrationError("regNewPassword", "Password must be at least 8 characters and contain a letter, number, and special character.");
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
        if (regSubmitBtn) {
          regSubmitBtn.disabled = true;
          regSubmitBtn.textContent = "Submitting...";
        }

        const username = document.getElementById("regUsername").value.trim();
        const lastName = document.getElementById("regLastName").value.trim();
        const dob = document.getElementById("regDob").value;
        const email = document.getElementById("regEmail").value.trim();
        const address = document.getElementById("regAddress").value.trim();
        const city = document.getElementById("regCity").value.trim();
        const state = document.getElementById("regState").value.trim();
        const phone = document.getElementById("regPhone").value.trim();

        try {
          saveRegisteredUser(email, {
            username: username,
            lastName: lastName,
            dob: dob,
            email: email,
            address: address,
            city: city,
            state: state,
            phone: phone,
            password: newPassword
          });

          localStorage.setItem("gcareStudentLoggedIn", "true");
          localStorage.setItem("gcareStudentEmail", email);

          if (registrationForm) registrationForm.style.display = "none";
          if (registrationFinalSuccess) registrationFinalSuccess.style.display = "block";
        } catch (error) {
          console.error("REGISTRATION SAVE ERROR:", error);
          if (regSubmitBtn) {
            regSubmitBtn.disabled = false;
            regSubmitBtn.textContent = "SUBMIT";
          }
          showRegistrationError("regNewPassword", "Registration failed. Please try again.");
        }
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
      window.location.href = "faculty-dashboard.html";
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

  const regOtpInput = document.getElementById("regOtp");
  const regPhoneOtpInput = document.getElementById("regPhoneOtp");

  [regOtpInput, regPhoneOtpInput].forEach((input) => {
    if (!input) return;
    ["paste", "copy", "cut", "drop", "dragover"].forEach((event) => {
      input.addEventListener(event, function (e) {
        e.preventDefault();
      });
    });
  });

  resetRegistrationFlow();

  if (localStorage.getItem("gcareOpenLmsRegister") === "true") {
    localStorage.removeItem("gcareOpenLmsRegister");
    openRegistrationModal();
  }
});