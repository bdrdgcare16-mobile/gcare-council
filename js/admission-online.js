console.log("ADMISSION JS LOADED - INLINE EMAIL AND MOBILE OTP");

document.addEventListener("DOMContentLoaded", function () {
  /* =====================================================
     RAILWAY BACKEND API
  ===================================================== */
  const API_BASE_URL = "https://backend-production-c5cb.up.railway.app/api";

  const form = document.getElementById("admissionForm");
  const applicationNo = document.getElementById("applicationNo");
  const submitButton = document.getElementById("submitApplicationBtn");
  const dob = document.getElementById("dob");
  const dobDisplay = document.getElementById("dobDisplay");
  const openDobCalendarBtn = document.getElementById("openDobCalendarBtn");
  const age = document.getElementById("age");
  const sameAddress = document.getElementById("sameAddress");
  const presentAddress = document.getElementById("presentAddress");
  const permanentAddress = document.getElementById("permanentAddress");
  const pinCode = document.getElementById("pinCode");
  const state = document.getElementById("state");
  const district = document.getElementById("district");
  const place = document.getElementById("place");
  const pinStatus = document.getElementById("pinStatus");
  const hasAadhaar = document.getElementById("hasAadhaar");
  const aadhaarNumber = document.getElementById("aadhaarNumber");
  const mobileInput = document.getElementById("mobile");
  const alternateOne = document.getElementById("alternateOne");
  const emailInput = document.getElementById("email");
  const sendMobileOtpBtn = document.getElementById("sendMobileOtpBtn");
  const verifyMobileOtpBtn = document.getElementById("verifyMobileOtpBtn");
  const mobileOtpInput = document.getElementById("mobileOtp");
  const mobileOtpStatus = document.getElementById("mobileOtpStatus");
  const mobileOtpPanel = document.getElementById("mobileOtpPanel");
  const sendEmailOtpBtn = document.getElementById("sendEmailOtpBtn");
  const verifyEmailOtpBtn = document.getElementById("verifyEmailOtpBtn");
  const emailOtpInput = document.getElementById("emailOtp");
  const emailOtpStatus = document.getElementById("emailOtpStatus");
  const emailOtpPanel = document.getElementById("emailOtpPanel");
  const academicLevel = document.getElementById("academicLevel");
  const educationCourse = document.getElementById("educationCourse");
  const educationBoard = document.getElementById("educationBoard");
  const educationSubjects = document.getElementById("educationSubjects");
  const educationYear = document.getElementById("educationYear");
  const educationGrade = document.getElementById("educationGrade");
  const declarationDate = document.getElementById("declarationDate");

  const uploadFields = [
    "photoUpload",
    "aadhaarUpload",
    "educationCertificateUpload",
    "parentSignature"
  ];

  let isMobileOtpVerified = false;
  let isEmailOtpVerified = false;

  function generateApplicationNo() {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return `GCARE${year}${random}`;
  }

  function getDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function setStatus(element, message, type = "") {
    if (!element) return;
    element.textContent = message;
    element.classList.remove("success", "error");
    if (type) element.classList.add(type);
  }

  function showOtpPanel(panel) {
    if (!panel) return;
    panel.style.display = "block";
    panel.classList.add("active");
  }

  function hideOtpPanel(panel) {
    if (!panel) return;
    panel.style.display = "none";
    panel.classList.remove("active");
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

  function showMobileOtpControls() {
    const mobileOtpRow = mobileOtpPanel?.querySelector(".inline-otp-row");
    showOtpPanel(mobileOtpPanel);

    if (mobileOtpRow) mobileOtpRow.style.display = "flex";

    if (mobileOtpInput) {
      mobileOtpInput.value = "";
      mobileOtpInput.readOnly = false;
      mobileOtpInput.style.display = "";
    }

    if (verifyMobileOtpBtn) {
      verifyMobileOtpBtn.style.display = "";
      verifyMobileOtpBtn.disabled = false;
      verifyMobileOtpBtn.textContent = "Verify OTP";
    }
  }

  function hideMobileOtpControlsAfterVerification() {
    const mobileOtpRow = mobileOtpPanel?.querySelector(".inline-otp-row");

    if (mobileOtpInput) {
      mobileOtpInput.value = "";
      mobileOtpInput.readOnly = true;
    }

    if (mobileOtpRow) mobileOtpRow.style.display = "none";
    if (sendMobileOtpBtn) sendMobileOtpBtn.style.display = "none";

    showOtpPanel(mobileOtpPanel);
  }

  function showEmailOtpControls() {
    const emailOtpRow = emailOtpPanel?.querySelector(".inline-otp-row");
    showOtpPanel(emailOtpPanel);

    if (emailOtpRow) emailOtpRow.style.display = "flex";

    if (emailOtpInput) {
      emailOtpInput.value = "";
      emailOtpInput.readOnly = false;
      emailOtpInput.style.display = "";
    }

    if (verifyEmailOtpBtn) {
      verifyEmailOtpBtn.style.display = "";
      verifyEmailOtpBtn.disabled = false;
      verifyEmailOtpBtn.textContent = "Verify OTP";
    }
  }

  function hideEmailOtpControlsAfterVerification() {
    const emailOtpRow = emailOtpPanel?.querySelector(".inline-otp-row");

    if (emailOtpInput) {
      emailOtpInput.value = "";
      emailOtpInput.readOnly = true;
    }

    if (emailOtpRow) emailOtpRow.style.display = "none";
    if (sendEmailOtpBtn) sendEmailOtpBtn.style.display = "none";

    showOtpPanel(emailOtpPanel);
  }

  function restoreOtpControls() {
    const mobileOtpRow = mobileOtpPanel?.querySelector(".inline-otp-row");
    const emailOtpRow = emailOtpPanel?.querySelector(".inline-otp-row");

    if (sendMobileOtpBtn) {
      sendMobileOtpBtn.style.display = "";
      sendMobileOtpBtn.disabled = false;
      sendMobileOtpBtn.textContent = "Send OTP";
    }

    if (sendEmailOtpBtn) {
      sendEmailOtpBtn.style.display = "";
      sendEmailOtpBtn.disabled = false;
      sendEmailOtpBtn.textContent = "Send OTP";
    }

    if (mobileOtpRow) mobileOtpRow.style.display = "flex";
    if (emailOtpRow) emailOtpRow.style.display = "flex";

    if (mobileOtpInput) {
      mobileOtpInput.value = "";
      mobileOtpInput.readOnly = false;
      mobileOtpInput.style.display = "";
    }

    if (emailOtpInput) {
      emailOtpInput.value = "";
      emailOtpInput.readOnly = false;
      emailOtpInput.style.display = "";
    }

    if (verifyMobileOtpBtn) {
      verifyMobileOtpBtn.style.display = "";
      verifyMobileOtpBtn.disabled = false;
      verifyMobileOtpBtn.textContent = "Verify OTP";
    }

    if (verifyEmailOtpBtn) {
      verifyEmailOtpBtn.style.display = "";
      verifyEmailOtpBtn.disabled = false;
      verifyEmailOtpBtn.textContent = "Verify OTP";
    }

    hideOtpPanel(mobileOtpPanel);
    hideOtpPanel(emailOtpPanel);
  }

  function setupApplicationNumber() {
    if (applicationNo) {
      applicationNo.value = generateApplicationNo();
    }
  }

  function setupCourseDropdown() {
    const courseInput = document.getElementById("courseSearchInput");
    const courseValue = document.getElementById("courseName");
    const courseOptions = document.getElementById("courseOptions");

    if (!courseInput || !courseValue || !courseOptions) return;

    courseInput.addEventListener("click", function () {
      courseOptions.classList.toggle("show");
    });

    courseOptions.addEventListener("click", function (event) {
      const selectedOption = event.target.closest(".course-option");
      if (!selectedOption) return;

      const selectedValue = selectedOption.getAttribute("data-value");

      courseInput.value = selectedValue;
      courseValue.value = selectedValue;
      courseOptions.classList.remove("show");
    });

    document.addEventListener("click", function (event) {
      const dropdown = event.target.closest(".custom-course-dropdown");
      if (!dropdown) {
        courseOptions.classList.remove("show");
      }
    });
  }

  function calculateAge(dobValue) {
    if (!dobValue) return "";

    const today = new Date();
    const birthDate = new Date(`${dobValue}T00:00:00`);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();

    const birthdayNotCompleted =
      today.getMonth() < birthDate.getMonth() ||
      (
        today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate()
      );

    if (birthdayNotCompleted) calculatedAge--;

    return calculatedAge;
  }

  function parseDdMmYyyy(dateString) {
    if (!dateString) return null;

    const parts = dateString.split("-");
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12 ||
      year < 1900 ||
      year > 2100
    ) {
      return null;
    }

    return new Date(year, month - 1, day);
  }

  function formatDdMmYyyy(date) {
    if (!date) return "";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  function setupAgeValidation() {
    if (!dob || !age || !dobDisplay) return;

    const today = new Date();

    const maximumDob = new Date(
      today.getFullYear() - 15,
      today.getMonth(),
      today.getDate()
    );

    const minimumDob = new Date(
      today.getFullYear() - 21,
      today.getMonth(),
      today.getDate() + 1
    );

    dob.max = getDateString(maximumDob);
    dob.min = getDateString(minimumDob);

    if (openDobCalendarBtn) {
      openDobCalendarBtn.addEventListener("click", function () {
        if (dob && typeof dob.showPicker === "function") {
          dob.showPicker();
        } else {
          dob.click();
        }
      });
    }

    dob.addEventListener("change", function () {
      const selectedDate = new Date(this.value);
      if (isNaN(selectedDate.getTime())) return;

      dobDisplay.value = formatDdMmYyyy(selectedDate);

      const calculatedAge = calculateAge(this.value);

      if (calculatedAge < 15 || calculatedAge > 20) {
        age.value = "";
        return;
      }

      age.value = calculatedAge;
    });

    dobDisplay.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");

      if (value.length > 8) value = value.slice(0, 8);

      if (value.length >= 2) {
        value = value.slice(0, 2) + "-" + value.slice(2);
      }

      if (value.length >= 5) {
        value = value.slice(0, 5) + "-" + value.slice(5);
      }

      this.value = value;

      if (value.length === 10) {
        const parsedDate = parseDdMmYyyy(value);

        if (parsedDate) {
          dob.value = getDateString(parsedDate);

          const calculatedAge = calculateAge(dob.value);

          if (calculatedAge < 15 || calculatedAge > 20) {
            age.value = "";
            return;
          }

          age.value = calculatedAge;
        } else {
          age.value = "";
        }
      } else {
        age.value = "";
      }
    });
  }

  function setupDeclarationDate() {
    if (!declarationDate) return;

    declarationDate.value = getDateString(new Date());
    declarationDate.readOnly = true;
  }

  function setupSameAddress() {
    if (!sameAddress || !presentAddress || !permanentAddress) return;

    sameAddress.addEventListener("change", function () {
      if (this.value === "Yes") {
        permanentAddress.value = presentAddress.value;
        permanentAddress.readOnly = true;
      } else {
        permanentAddress.value = "";
        permanentAddress.readOnly = false;
      }
    });

    presentAddress.addEventListener("input", function () {
      if (sameAddress.value === "Yes") {
        permanentAddress.value = this.value;
      }
    });
  }

  function setupPincodeValidation() {
    if (!pinCode) return;

    pinCode.inputMode = "numeric";
    pinCode.maxLength = 6;

    pinCode.addEventListener("input", async function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 6);

      const enteredPin = this.value;

      if (state) state.value = "";
      if (district) district.value = "";
      if (place) place.value = "";

      if (enteredPin.length > 0 && enteredPin.charAt(0) !== "6") {
        setStatus(
          pinStatus,
          "Tamil Nadu pincode must start with 6.",
          "error"
        );
        return;
      }

      if (enteredPin.length > 0 && enteredPin.length < 6) {
        const remainingDigits = 6 - enteredPin.length;

        setStatus(
          pinStatus,
          `Enter the remaining ${remainingDigits} pincode digit(s).`,
          "error"
        );
        return;
      }

      if (!/^\d{6}$/.test(enteredPin)) return;

      try {
        setStatus(pinStatus, "Fetching location details...", "");

        const response = await fetch(
          `https://api.postalpincode.in/pincode/${enteredPin}`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch pincode details.");
        }

        const data = await response.json();

        if (
          !data?.[0] ||
          data[0].Status !== "Success" ||
          !data[0].PostOffice?.length
        ) {
          throw new Error("Invalid pincode.");
        }

        const postOffice = data[0].PostOffice[0];

        if (state) state.value = postOffice.State || "";
        if (district) district.value = postOffice.District || "";

        if (place) {
          place.value =
            postOffice.Name ||
            postOffice.Block ||
            postOffice.District ||
            "";
        }

        setStatus(
          pinStatus,
          "State, district, and place filled automatically.",
          "success"
        );
      } catch (error) {
        console.error("PINCODE ERROR:", error);

        setStatus(
          pinStatus,
          error.message || "Unable to fetch pincode details.",
          "error"
        );
      }
    });
  }

  function setupAadhaarValidation() {
    if (!aadhaarNumber) return;

    aadhaarNumber.inputMode = "numeric";
    aadhaarNumber.maxLength = 12;

    aadhaarNumber.addEventListener("input", function () {
      let filteredValue = this.value
        .replace(/\D/g, "")
        .slice(0, 12);

      if (
        filteredValue.length > 0 &&
        /^[01]/.test(filteredValue)
      ) {
        filteredValue = filteredValue.replace(/^[01]/, "");
      }

      this.value = filteredValue;
    });

    if (hasAadhaar) {
      hasAadhaar.addEventListener("change", function () {
        aadhaarNumber.required = this.value === "Yes";

        if (this.value === "No") {
          aadhaarNumber.value = "";
        }
      });
    }
  }

  function setupMobileValidation(input) {
    if (!input) return;

    input.inputMode = "numeric";
    input.maxLength = 10;

    input.addEventListener("input", function () {
      this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 10);

      if (input === mobileInput) {
        isMobileOtpVerified = false;

        if (mobileOtpInput) {
          mobileOtpInput.value = "";
          mobileOtpInput.readOnly = false;
        }

        setStatus(
          mobileOtpStatus,
          "Mobile OTP not verified.",
          ""
        );
      }
    });
  }

  function setupEmailValidation() {
    if (!emailInput) return;

    emailInput.addEventListener("input", function () {
      this.value = this.value.replace(/\s/g, "");

      isEmailOtpVerified = false;

      if (emailOtpInput) {
        emailOtpInput.value = "";
        emailOtpInput.readOnly = false;
      }

      setStatus(
        emailOtpStatus,
        "Email OTP not verified.",
        ""
      );
    });
  }

  function setupNameFieldRestriction(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener("input", function () {
      const filteredValue = this.value.replace(
        /[^A-Za-z .]/g,
        ""
      );

      if (this.value !== filteredValue) {
        this.value = filteredValue;
      }
    });
  }

  function setupSubjectsFieldRestriction(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener("input", function () {
      const filteredValue = this.value.replace(
        /[^A-Za-z ,]/g,
        ""
      );

      if (this.value !== filteredValue) {
        this.value = filteredValue;
      }
    });
  }

  function setupAllCharacterRestrictions() {
    setupNameFieldRestriction("fullName");
    setupNameFieldRestriction("parentName");
    setupNameFieldRestriction("nationality");
    setupNameFieldRestriction("otherCaste");
    setupNameFieldRestriction("educationCourse");
    setupNameFieldRestriction("educationBoard");
    setupNameFieldRestriction("place");
    setupSubjectsFieldRestriction("educationSubjects");
  }

  function setupEducationValidation() {
    if (!academicLevel || !educationCourse || !educationSubjects) return;

    academicLevel.addEventListener("change", function () {
      if (this.value === "8th Standard") {
        educationCourse.placeholder = "Example: 8th Standard";
        educationSubjects.placeholder =
          "Tamil, English, Maths, Science, Social Science";
      } else if (this.value === "10th Standard") {
        educationCourse.placeholder = "Example: SSC / X / Matric";
        educationSubjects.placeholder =
          "Tamil, English, Maths, Science, Social Science";
      } else if (this.value === "12th Standard") {
        educationCourse.placeholder = "Example: HSC / XII";
        educationSubjects.placeholder =
          "Physics, Chemistry, Biology, Maths";
      }
    });

    educationSubjects.addEventListener("input", function () {
      const subjects = this.value
        .split(",")
        .map(function (subject) {
          return subject.trim();
        })
        .filter(Boolean);

      if (subjects.length >= 2) {
        let allValid = true;

        for (let i = 0; i < subjects.length; i++) {
          if (!/^[A-Za-z ]+$/.test(subjects[i])) {
            allValid = false;
            break;
          }
        }

        if (allValid) this.setCustomValidity("");
      }
    });

    if (educationYear) {
      educationYear.inputMode = "numeric";
      educationYear.maxLength = 4;

      educationYear.addEventListener("input", function () {
        this.value = this.value
          .replace(/\D/g, "")
          .slice(0, 4);
      });
    }
  }

  function setupFileValidation() {
    const rules = {
      photoUpload: {
        allowedTypes: ["image/jpeg", "image/png"],
        message: "Upload only JPG, JPEG, or PNG image files."
      },

      parentSignature: {
        allowedTypes: ["image/jpeg", "image/png"],
        message: "Upload only JPG, JPEG, or PNG image files."
      },

      aadhaarUpload: {
        allowedTypes: ["application/pdf"],
        message: "Upload only a PDF file."
      },

      educationCertificateUpload: {
        allowedTypes: ["application/pdf"],
        message: "Upload only a PDF file."
      }
    };

    uploadFields.forEach(function (fieldId) {
      const input = document.getElementById(fieldId);
      const preview = document.getElementById(`${fieldId}Preview`);
      const rule = rules[fieldId];

      if (!input || !rule) return;

      input.addEventListener("change", function () {
        if (preview) preview.innerHTML = "";

        const file = this.files?.[0];
        if (!file) return;

        if (!rule.allowedTypes.includes(file.type)) {
          this.value = "";
          alert(rule.message);
          return;
        }

        if (!preview) return;

        const fileName = document.createElement("p");
        fileName.textContent = `Selected: ${file.name}`;
        preview.appendChild(fileName);

        const fileUrl = URL.createObjectURL(file);

        const viewLink = document.createElement("a");
        viewLink.href = fileUrl;
        viewLink.target = "_blank";
        viewLink.rel = "noopener";
        viewLink.textContent = "View File";
        preview.appendChild(viewLink);

        if (file.type.startsWith("image/")) {
          const image = document.createElement("img");
          image.src = fileUrl;
          image.alt = file.name;
          preview.appendChild(image);
        }
      });
    });
  }

  function setupOtpInput(input) {
    if (!input) return;

    input.inputMode = "numeric";
    input.maxLength = 6;
    input.autocomplete = "off";

    input.setAttribute("autocomplete", "off");
    input.setAttribute("autocorrect", "off");
    input.setAttribute("autocapitalize", "off");
    input.setAttribute("spellcheck", "false");

    input.addEventListener("paste", function (event) {
      event.preventDefault();
      return false;
    });

    input.addEventListener("drop", function (event) {
      event.preventDefault();
      return false;
    });

    input.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      return false;
    });

    input.addEventListener("input", function () {
      this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 6);
    });
  }

  async function sendMobileOtp() {
    const mobile = mobileInput?.value.trim() || "";

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      mobileInput?.setCustomValidity(
        "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9."
      );

      mobileInput?.reportValidity();

      setStatus(
        mobileOtpStatus,
        "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.",
        "error"
      );

      return;
    }

    mobileInput?.setCustomValidity("");

    try {
      sendMobileOtpBtn.disabled = true;
      sendMobileOtpBtn.textContent = "Sending...";

      setStatus(
        mobileOtpStatus,
        "Sending mobile OTP...",
        ""
      );

      console.log(
        "SEND MOBILE OTP API:",
        `${API_BASE_URL}/send-mobile-otp`
      );

      const response = await fetch(
        `${API_BASE_URL}/send-mobile-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            mobile
          })
        }
      );

      const result = await readJsonResponse(
        response,
        "The mobile OTP API returned an invalid response."
      );

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Mobile OTP sending failed."
        );
      }

      isMobileOtpVerified = false;
      showMobileOtpControls();

      setStatus(
        mobileOtpStatus,
        "Mobile OTP sent successfully. Check your phone.",
        "success"
      );
    } catch (error) {
      console.error(
        "MOBILE OTP SEND ERROR:",
        error
      );

      setStatus(
        mobileOtpStatus,
        error.message ||
          "Mobile OTP sending failed.",
        "error"
      );
    } finally {
      if (sendMobileOtpBtn) {
        sendMobileOtpBtn.disabled = false;
        sendMobileOtpBtn.textContent = "Send OTP";
      }
    }
  }

  async function verifyMobileOtp() {
    const mobile = mobileInput?.value.trim() || "";
    const otp = mobileOtpInput?.value.trim() || "";

    if (!/^\d{6}$/.test(otp)) {
      setStatus(
        mobileOtpStatus,
        "Enter the complete 6-digit mobile OTP.",
        "error"
      );
      return;
    }

    try {
      verifyMobileOtpBtn.disabled = true;
      verifyMobileOtpBtn.textContent = "Verifying...";

      console.log(
        "VERIFY MOBILE OTP API:",
        `${API_BASE_URL}/verify-mobile-otp`
      );

      const response = await fetch(
        `${API_BASE_URL}/verify-mobile-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            mobile,
            otp
          })
        }
      );

      const result = await readJsonResponse(
        response,
        "The mobile OTP verification API returned an invalid response."
      );

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Mobile OTP verification failed."
        );
      }

      isMobileOtpVerified = true;

      if (mobileInput) {
        mobileInput.readOnly = true;
      }

      hideMobileOtpControlsAfterVerification();

      setStatus(
        mobileOtpStatus,
        "Mobile OTP verified successfully.",
        "success"
      );
    } catch (error) {
      isMobileOtpVerified = false;

      setStatus(
        mobileOtpStatus,
        error.message || "Incorrect mobile OTP.",
        "error"
      );
    } finally {
      if (verifyMobileOtpBtn) {
        verifyMobileOtpBtn.disabled = false;
        verifyMobileOtpBtn.textContent = "Verify OTP";
      }
    }
  }

  async function sendEmailOtp() {
    const email = emailInput?.value.trim() || "";

    const emailPattern =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/;

    if (!emailPattern.test(email)) {
      emailInput?.setCustomValidity(
        "Please enter a valid email address."
      );

      emailInput?.reportValidity();

      setStatus(
        emailOtpStatus,
        "Please enter a valid email address.",
        "error"
      );

      return;
    }

    emailInput?.setCustomValidity("");

    try {
      sendEmailOtpBtn.disabled = true;
      sendEmailOtpBtn.textContent = "Sending...";

      setStatus(
        emailOtpStatus,
        "Sending email OTP...",
        ""
      );

      console.log(
        "SEND EMAIL OTP API:",
        `${API_BASE_URL}/send-email-otp`
      );

      const response = await fetch(
        `${API_BASE_URL}/send-email-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email
          })
        }
      );

      const result = await readJsonResponse(
        response,
        "The email OTP API returned an invalid response."
      );

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Email OTP sending failed."
        );
      }

      isEmailOtpVerified = false;
      showEmailOtpControls();

      if (emailOtpInput) {
        emailOtpInput.focus();
      }

      setStatus(
        emailOtpStatus,
        "Email OTP sent successfully. Check your inbox or spam folder.",
        "success"
      );
    } catch (error) {
      console.error(
        "EMAIL OTP SEND ERROR:",
        error
      );

      setStatus(
        emailOtpStatus,
        error.message ||
          "Email OTP sending failed.",
        "error"
      );
    } finally {
      if (sendEmailOtpBtn) {
        sendEmailOtpBtn.disabled = false;
        sendEmailOtpBtn.textContent = "Send OTP";
      }
    }
  }

  async function verifyEmailOtp() {
    const email = emailInput?.value.trim() || "";
    const otp = emailOtpInput?.value.trim() || "";

    if (!/^\d{6}$/.test(otp)) {
      setStatus(
        emailOtpStatus,
        "Enter the complete 6-digit email OTP.",
        "error"
      );
      return;
    }

    try {
      verifyEmailOtpBtn.disabled = true;
      verifyEmailOtpBtn.textContent = "Verifying...";

      console.log(
        "VERIFY EMAIL OTP API:",
        `${API_BASE_URL}/verify-email-otp`
      );

      const response = await fetch(
        `${API_BASE_URL}/verify-email-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            otp
          })
        }
      );

      const result = await readJsonResponse(
        response,
        "The email OTP verification API returned an invalid response."
      );

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Email OTP verification failed."
        );
      }

      isEmailOtpVerified = true;

      if (emailInput) {
        emailInput.readOnly = true;
      }

      hideEmailOtpControlsAfterVerification();

      setStatus(
        emailOtpStatus,
        "Email OTP verified successfully.",
        "success"
      );
    } catch (error) {
      isEmailOtpVerified = false;

      setStatus(
        emailOtpStatus,
        error.message ||
          "Incorrect email OTP.",
        "error"
      );
    } finally {
      if (verifyEmailOtpBtn) {
        verifyEmailOtpBtn.disabled = false;
        verifyEmailOtpBtn.textContent = "Verify OTP";
      }
    }
  }

  function setupOtpButtons() {
    setupOtpInput(mobileOtpInput);
    setupOtpInput(emailOtpInput);
    restoreOtpControls();

    if (sendMobileOtpBtn) {
      sendMobileOtpBtn.type = "button";
      sendMobileOtpBtn.addEventListener(
        "click",
        sendMobileOtp
      );
    }

    if (verifyMobileOtpBtn) {
      verifyMobileOtpBtn.type = "button";
      verifyMobileOtpBtn.addEventListener(
        "click",
        verifyMobileOtp
      );
    }

    if (sendEmailOtpBtn) {
      sendEmailOtpBtn.type = "button";
      sendEmailOtpBtn.addEventListener(
        "click",
        sendEmailOtp
      );
    }

    if (verifyEmailOtpBtn) {
      verifyEmailOtpBtn.type = "button";
      verifyEmailOtpBtn.addEventListener(
        "click",
        verifyEmailOtp
      );
    }
  }

  function validateCourse() {
    const course = document.getElementById("courseName");

    if (!course?.value.trim()) {
      alert("Please select a course.");
      return false;
    }

    return true;
  }

  function validateAadhaar() {
    if (
      hasAadhaar?.value === "Yes" &&
      !/^[2-9]\d{11}$/.test(
        aadhaarNumber?.value.trim() || ""
      )
    ) {
      aadhaarNumber?.setCustomValidity(
        "Aadhaar number must start with digits 2 to 9 and be exactly 12 digits."
      );
      return false;
    }

    aadhaarNumber?.setCustomValidity("");
    return true;
  }

  function validateEducationSubjects() {
    const subjects =
      educationSubjects?.value
        .split(",")
        .map(function (s) {
          return s.trim();
        })
        .filter(function (s) {
          return s.length > 0;
        }) || [];

    if (subjects.length < 2) {
      educationSubjects?.setCustomValidity(
        "Please enter all subjects separated by commas. At least two subjects are required."
      );
      return false;
    }

    for (let i = 0; i < subjects.length; i++) {
      if (!/^[A-Za-z ]+$/.test(subjects[i])) {
        educationSubjects?.setCustomValidity(
          "Please enter all subjects separated by commas. At least two subjects are required."
        );
        return false;
      }
    }

    educationSubjects.setCustomValidity("");
    return true;
  }

  function validateEducationDetails() {
    if (!academicLevel?.value.trim()) {
      academicLevel?.setCustomValidity(
        "Academic Level is required."
      );
      return false;
    }

    academicLevel?.setCustomValidity("");

    if (!educationCourse?.value.trim()) {
      educationCourse?.setCustomValidity(
        "Qualification / Course is required."
      );
      return false;
    }

    educationCourse?.setCustomValidity("");

    if (!educationBoard?.value.trim()) {
      educationBoard?.setCustomValidity(
        "University / Board is required."
      );
      return false;
    }

    educationBoard?.setCustomValidity("");

    if (!educationYear?.value.trim()) {
      educationYear?.setCustomValidity(
        "Year of Passing is required."
      );
      return false;
    }

    if (!/^\d{4}$/.test(educationYear.value.trim())) {
      educationYear?.setCustomValidity(
        "Year of Passing must be exactly 4 digits."
      );
      return false;
    }

    educationYear?.setCustomValidity("");

    if (!educationGrade?.value.trim()) {
      educationGrade?.setCustomValidity(
        "Grade / Percentage is required."
      );
      return false;
    }

    educationGrade?.setCustomValidity("");

    return true;
  }

  function validateOtpVerification() {
    if (!isMobileOtpVerified) {
      setStatus(
        mobileOtpStatus,
        "Verify the mobile OTP before submitting.",
        "error"
      );
      return false;
    }

    if (!isEmailOtpVerified) {
      setStatus(
        emailOtpStatus,
        "Verify the email OTP before submitting.",
        "error"
      );
      return false;
    }

    return true;
  }

  function validateDob() {
    if (!dob?.value) {
      dob?.setCustomValidity(
        "Date of Birth is required."
      );
      return false;
    }

    const calculatedAge = calculateAge(dob.value);

    if (
      calculatedAge < 15 ||
      calculatedAge > 20
    ) {
      dob?.setCustomValidity(
        "Only applicants aged between 15 and 20 years can apply."
      );

      dobDisplay?.setCustomValidity(
        "Only applicants aged between 15 and 20 years can apply."
      );

      return false;
    }

    dob?.setCustomValidity("");
    dobDisplay?.setCustomValidity("");

    return true;
  }

  function validateMobile(input, isRequired = false) {
    if (isRequired && !input?.value) {
      input?.setCustomValidity(
        "Mobile number is required."
      );
      return false;
    }

    if (
      input?.value &&
      !/^[6-9]\d{9}$/.test(input.value)
    ) {
      input?.setCustomValidity(
        "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9."
      );
      return false;
    }

    input?.setCustomValidity("");
    return true;
  }

  function validateEmail() {
    if (!emailInput?.value) {
      emailInput?.setCustomValidity(
        "Email address is required."
      );
      return false;
    }

    const emailPattern =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/;

    if (!emailPattern.test(emailInput.value)) {
      emailInput?.setCustomValidity(
        "Please enter a valid email address."
      );
      return false;
    }

    emailInput?.setCustomValidity("");
    return true;
  }

  function validatePincode() {
    if (!pinCode?.value) {
      pinCode?.setCustomValidity(
        "Pincode is required."
      );
      return false;
    }

    if (!/^\d{6}$/.test(pinCode.value)) {
      pinCode?.setCustomValidity(
        "Pincode must contain exactly 6 digits."
      );
      return false;
    }

    if (pinCode.value.charAt(0) !== "6") {
      pinCode?.setCustomValidity(
        "Tamil Nadu pincode must start with 6."
      );
      return false;
    }

    pinCode?.setCustomValidity("");
    return true;
  }

  async function submitApplication(event) {
    console.log(
      "SUBMIT APPLICATION FUNCTION CALLED"
    );

    event.preventDefault();

    if (!form.checkValidity()) {
      console.log(
        "FORM CHECK VALIDITY FAILED"
      );

      form.reportValidity();
      return;
    }

    if (!validateCourse()) return;
    if (!validateDob()) return;
    if (!validateAadhaar()) return;

    if (!validateMobile(mobileInput, true)) {
      return;
    }

    if (!validateEmail()) return;
    if (!validatePincode()) return;

    if (!validateEducationDetails()) {
      return;
    }

    if (!validateEducationSubjects()) {
      educationSubjects?.reportValidity();
      return;
    }

    if (!validateOtpVerification()) {
      return;
    }

    const originalButtonText =
      submitButton?.textContent ||
      "Submit Application";

    try {
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent =
          "Submitting...";
      }

      const formData = new FormData(form);

      formData.set(
        "applicationNo",
        applicationNo?.value ||
          generateApplicationNo()
      );

      formData.set(
        "mobileOtpVerified",
        "true"
      );

      formData.set(
        "emailOtpVerified",
        "true"
      );

      formData.set(
        "mobileOtpType",
        "fast2sms"
      );

      console.log(
        "ADMISSION API:",
        `${API_BASE_URL}/admissions`
      );

      const response = await fetch(
        `${API_BASE_URL}/admissions`,
        {
          method: "POST",
          body: formData
        }
      );

      const result = await readJsonResponse(
        response,
        "The admission API returned an invalid response."
      );

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Application submission failed."
        );
      }

      const submittedApplicationNo =
        formData.get("applicationNo");

      alert(
        `Your application was submitted successfully.\nApplication No: ${submittedApplicationNo}`
      );

      resetCompleteForm();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } catch (error) {
      console.error(
        "APPLICATION SUBMIT ERROR:",
        error
      );

      alert(
        error.message ||
          "Application submission failed. Please try again."
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent =
          originalButtonText;
      }
    }
  }

  function resetCompleteForm() {
    form.reset();

    const allInputs =
      form.querySelectorAll(
        "input, select, textarea"
      );

    allInputs.forEach(function (input) {
      input.setCustomValidity("");
    });

    isMobileOtpVerified = false;
    isEmailOtpVerified = false;

    if (mobileInput) {
      mobileInput.readOnly = false;
    }

    if (emailInput) {
      emailInput.readOnly = false;
    }

    restoreOtpControls();

    setStatus(
      mobileOtpStatus,
      "Mobile OTP not verified.",
      ""
    );

    setStatus(
      emailOtpStatus,
      "Email OTP not verified.",
      ""
    );

    uploadFields.forEach(function (fieldId) {
      const preview = document.getElementById(
        `${fieldId}Preview`
      );

      if (preview) {
        preview.innerHTML = "";
      }
    });

    const courseInput =
      document.getElementById(
        "courseSearchInput"
      );

    const courseValue =
      document.getElementById(
        "courseName"
      );

    if (courseInput) {
      courseInput.value = "";
    }

    if (courseValue) {
      courseValue.value = "";
    }

    if (applicationNo) {
      applicationNo.value =
        generateApplicationNo();
    }

    setupDeclarationDate();
  }

  function setupResetButton() {
    const resetButton =
      form?.querySelector(
        ".reset-btn"
      );

    if (!resetButton) return;

    resetButton.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        resetCompleteForm();
      }
    );
  }

  function initialize() {
    if (!form) {
      console.error(
        "Admission form was not found."
      );
      return;
    }

    console.log(
      "RAILWAY API BASE URL:",
      API_BASE_URL
    );

    setupApplicationNumber();
    setupCourseDropdown();
    setupAgeValidation();
    setupDeclarationDate();
    setupSameAddress();
    setupPincodeValidation();
    setupAadhaarValidation();

    setupMobileValidation(
      mobileInput,
      true
    );

    setupMobileValidation(
      alternateOne,
      false
    );

    setupEmailValidation();
    setupAllCharacterRestrictions();
    setupEducationValidation();
    setupFileValidation();
    setupOtpButtons();
    setupResetButton();

    form.addEventListener(
      "submit",
      submitApplication
    );
  }

  initialize();
});

function goBackToDownloads() {
  window.location.href =
    "downloads.html#student";
}