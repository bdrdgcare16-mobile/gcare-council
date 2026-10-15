console.log("ADMISSION JS LOADED - INLINE EMAIL AND MOBILE OTP");

document.addEventListener("DOMContentLoaded", function () {
  /* =====================================================
     RAILWAY BACKEND API
  ===================================================== */

  const API_BASE_URL =
    ["localhost", "127.0.0.1"].includes(location.hostname)
      ? "http://localhost:3000/api"
      : "https://backend-production-c5cb.up.railway.app/api";

  /* =====================================================
     DOM ELEMENTS
  ===================================================== */

  const form = document.getElementById("admissionForm");
  const applicationNo = document.getElementById("applicationNo");
  const submitButton = document.getElementById("submitApplicationBtn");

  const branchCategory =
    document.getElementById("branch_category");

  const branchName =
    document.getElementById("branch_name");

  /* =====================================================
     BRANCH CATEGORY -> BRANCH LOCATION OPTIONS
  ===================================================== */

  const branchOptionsByCategory = {
    "Gandhi Community Colleges": [
      "Thiruvallur",
      "Salai",
      "Poonamallee",
      "Ennore",
      "Kanchipuram",
      "Thiruthani",
      "Nemilicherry",
      "Pudur",
      "Nagapattinam"
    ],

    "G Care Branch (CHA's)": [
      "Poonamallee",
      "Thiruvallur",
      "Thiruthani",
      "Ennore",
      "Kancheepuram",
      "Pudhur",
      "Salai",
      "Thirupatur",
      "Nagapattinam 1",
      "Vadalur",
      "Nagapattinam 2"
    ]
  };

  function populateBranchLocations(category) {
    if (!branchName) {
      return;
    }

    const branches =
      branchOptionsByCategory[category] || [];

    branchName.innerHTML = "";

    const placeholder =
      document.createElement("option");

    placeholder.value = "";
    placeholder.textContent =
      "Select Branch Location";

    branchName.appendChild(placeholder);

    branches.forEach(function (branch) {
      const option =
        document.createElement("option");

      option.value = branch;
      option.textContent = branch;

      branchName.appendChild(option);
    });

    branchName.value = "";
    branchName.setCustomValidity("");
  }

  function setupBranchCategory() {
    if (!branchCategory || !branchName) {
      return;
    }

    branchCategory.addEventListener(
      "change",
      function () {
        branchCategory.setCustomValidity("");
        populateBranchLocations(
          branchCategory.value
        );
      }
    );

    populateBranchLocations(
      branchCategory.value
    );
  }

  const dob = document.getElementById("dob");
  const dobDisplay = document.getElementById("dobDisplay");
  const dobErrorMessage =
    document.getElementById("dobErrorMessage");
  const openDobCalendarBtn =
    document.getElementById("openDobCalendarBtn");
  const age = document.getElementById("age");

  const sameAddress = document.getElementById("sameAddress");
  const presentAddress =
    document.getElementById("presentAddress");
  const permanentAddress =
    document.getElementById("permanentAddress");

  const pinCode = document.getElementById("pinCode");
  const state = document.getElementById("state");
  const district = document.getElementById("district");
  const place = document.getElementById("place");
  const pinStatus = document.getElementById("pinStatus");

  let placeManuallyEdited = false;

  const hasAadhaar = document.getElementById("hasAadhaar");
  const aadhaarNumber =
    document.getElementById("aadhaarNumber");

  const mobileInput =
    document.getElementById("mobile");

  const alternateOne =
    document.getElementById("alternateOne");

  const emailInput =
    document.getElementById("email");

  /* =====================================================
     MOBILE OTP ELEMENTS
  ===================================================== */

  const sendMobileOtpBtn =
    document.getElementById("sendMobileOtpBtn");

  const verifyMobileOtpBtn =
    document.getElementById("verifyMobileOtpBtn");

  const mobileOtpInput =
    document.getElementById("mobileOtp");

  const mobileOtpStatus =
    document.getElementById("mobileOtpStatus");

  const mobileOtpPanel =
    document.getElementById("mobileOtpPanel");

  /* =====================================================
     EMAIL OTP ELEMENTS
  ===================================================== */

  const sendEmailOtpBtn =
    document.getElementById("sendEmailOtpBtn");

  const verifyEmailOtpBtn =
    document.getElementById("verifyEmailOtpBtn");

  const emailOtpInput =
    document.getElementById("emailOtp");

  const emailOtpStatus =
    document.getElementById("emailOtpStatus");

  const emailOtpPanel =
    document.getElementById("emailOtpPanel");

  /* =====================================================
     EDUCATION ELEMENTS
  ===================================================== */

  const academicLevel =
    document.getElementById("academicLevel");

  const educationCourse =
    document.getElementById("educationCourse");

  const educationBoard =
    document.getElementById("educationBoard");

  const educationSubjects =
    document.getElementById("educationSubjects");

  const educationYear =
    document.getElementById("educationYear");

  const educationGrade =
    document.getElementById("educationGrade");

  const declarationDate =
    document.getElementById("declarationDate");

  /* =====================================================
     UPLOAD FIELDS
  ===================================================== */

  const uploadFields = [
    "photoUpload",
    "aadhaarUpload",
    "educationCertificateUpload",
    "parentSignature"
  ];

  /* =====================================================
     OTP STATE
  ===================================================== */

  let isMobileOtpVerified = false;
  let isEmailOtpVerified = false;

  let mobileOtpSent = false;
  let emailOtpSent = false;

  let mobileResendTimer = null;
  let emailResendTimer = null;

  const RESEND_COOLDOWN = 60;


  /* =====================================================
     APPLICATION NUMBER
  ===================================================== */

  const APP_NO_KEY =
    "gcareLastApplicationNo";

  const APP_NO_SESSION_KEY =
    "gcareCurrentApplicationNo";

  function padApplicationNo(num) {
    return (
      "GCARE" + String(num).padStart(5, "0")
    );
  }

  async function fetchMaxApplicationNo() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/admissions`
      );

      if (!response.ok) {
        return 0;
      }

      const result = await response.json();

      if (
        !result ||
        !result.success ||
        !Array.isArray(result.data)
      ) {
        return 0;
      }

      let max = 0;

      result.data.forEach(function (item) {
        const code =
          item.application_no ||
          item.applicationNo ||
          item.application_number;

        if (
          typeof code === "string" &&
          code.startsWith("GCARE") &&
          (code.length === 9 || code.length === 10) &&
          /^\d{4,5}$/.test(code.slice(5))
        ) {
          const n = parseInt(
            code.slice(5),
            10
          );

          if (!isNaN(n) && n > max) {
            max = n;
          }
        }
      });

      return max;
    } catch (error) {
      console.error(
        "Could not fetch application numbers:",
        error
      );
      return 0;
    }
  }

  function getStoredLastApplicationNo() {
    const stored = parseInt(
      localStorage.getItem(APP_NO_KEY),
      10
    );

    if (
      !isNaN(stored) &&
      stored >= 1 &&
      stored <= 99999
    ) {
      return stored;
    }

    return 0;
  }

  function setStoredLastApplicationNo(num) {
    localStorage.setItem(
      APP_NO_KEY,
      String(num)
    );
  }

  async function generateApplicationNo() {
    const dbMax = await fetchMaxApplicationNo();
    const localMax = getStoredLastApplicationNo();
    const next = Math.max(dbMax, localMax) + 1;

    setStoredLastApplicationNo(next);

    return padApplicationNo(next);
  }

  async function setupApplicationNumber() {
    if (!applicationNo) {
      return;
    }

    const current =
      sessionStorage.getItem(
        APP_NO_SESSION_KEY
      );

    if (current) {
      applicationNo.value = current;
      return;
    }

    const next =
      await generateApplicationNo();

    sessionStorage.setItem(
      APP_NO_SESSION_KEY,
      next
    );

    applicationNo.value = next;
  }

  /* =====================================================
     DATE HELPERS
  ===================================================== */

  function getDateString(date) {
    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function addYears(date, years) {
    const result = new Date(date);
    const originalMonth = result.getMonth();
    const originalDay = result.getDate();

    result.setFullYear(
      result.getFullYear() + years,
      originalMonth,
      originalDay
    );

    if (result.getMonth() !== originalMonth) {
      result.setDate(0);
    }

    return result;
  }

  function parseDdMmYyyy(dateString) {
    if (!dateString) {
      return null;
    }

    const parts =
      dateString.split("-");

    if (parts.length !== 3) {
      return null;
    }

    const day =
      parseInt(
        parts[0],
        10
      );

    const month =
      parseInt(
        parts[1],
        10
      );

    const year =
      parseInt(
        parts[2],
        10
      );

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

    const parsedDate = new Date(
      year,
      month - 1,
      day
    );

    if (
      parsedDate.getDate() !== day ||
      parsedDate.getMonth() + 1 !== month ||
      parsedDate.getFullYear() !== year
    ) {
      return null;
    }

    return parsedDate;
  }

  function formatDdMmYyyy(date) {
    if (!date) {
      return "";
    }

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const year =
      date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  function calculateAge(dobValue) {
    if (!dobValue) {
      return "";
    }

    let birthDate;

    if (dobValue instanceof Date) {
      birthDate = dobValue;
    } else if (
      /^\d{4}-\d{2}-\d{2}$/.test(dobValue)
    ) {
      const parts = dobValue.split("-");
      birthDate = new Date(
        parseInt(parts[0], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[2], 10)
      );
    } else if (
      /^\d{2}-\d{2}-\d{4}$/.test(dobValue)
    ) {
      const parts = dobValue.split("-");
      birthDate = new Date(
        parseInt(parts[2], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[0], 10)
      );
    } else {
      birthDate = new Date(dobValue);
    }

    if (
      !birthDate ||
      isNaN(birthDate.getTime())
    ) {
      return "";
    }

    const today = new Date();

    let calculatedAge =
      today.getFullYear() -
      birthDate.getFullYear();

    const birthdayNotCompleted =
      today.getMonth() <
        birthDate.getMonth() ||
      (
        today.getMonth() ===
          birthDate.getMonth() &&
        today.getDate() <
          birthDate.getDate()
      );

    if (birthdayNotCompleted) {
      calculatedAge--;
    }

    if (isNaN(calculatedAge)) {
      return "";
    }

    return calculatedAge;
  }

  /* =====================================================
     DOB ERROR HELPERS
  ===================================================== */

  function showDobError(message) {
    if (dob) {
      dob.setCustomValidity(message);
    }

    if (dobDisplay) {
      dobDisplay.setCustomValidity(message);
    }

    if (dobErrorMessage) {
      dobErrorMessage.textContent = message;
      dobErrorMessage.style.display = message
        ? "block"
        : "none";
    }
  }

  function clearDobError() {
    if (dob) {
      dob.setCustomValidity("");
    }

    if (dobDisplay) {
      dobDisplay.setCustomValidity("");
    }

    if (dobErrorMessage) {
      dobErrorMessage.textContent = "";
      dobErrorMessage.style.display = "none";
    }
  }

  /* =====================================================
     STATUS
  ===================================================== */

  function setStatus(
    element,
    message,
    type = ""
  ) {
    if (!element) {
      return;
    }

    element.textContent =
      message;

    element.classList.remove(
      "success",
      "error"
    );

    if (type) {
      element.classList.add(
        type
      );
    }
  }

  /* =====================================================
     OTP PANEL
  ===================================================== */

  function showOtpPanel(panel) {
    if (!panel) {
      return;
    }

    panel.style.display =
      "block";

    panel.classList.add(
      "active"
    );
  }

  function hideOtpPanel(panel) {
    if (!panel) {
      return;
    }

    panel.style.display =
      "none";

    panel.classList.remove(
      "active"
    );
  }

  function startMobileResendCooldown() {
    if (mobileResendTimer) {
      clearInterval(
        mobileResendTimer
      );

      mobileResendTimer = null;
    }

    if (!sendMobileOtpBtn) {
      return;
    }

    let seconds =
      RESEND_COOLDOWN;

    sendMobileOtpBtn.disabled =
      true;

    sendMobileOtpBtn.textContent =
      `Resend OTP in ${seconds}s`;

    mobileResendTimer =
      setInterval(
        function () {
          seconds--;

          if (sendMobileOtpBtn) {
            sendMobileOtpBtn.textContent =
              `Resend OTP in ${seconds}s`;
          }

          if (seconds <= 0) {
            clearInterval(
              mobileResendTimer
            );

            mobileResendTimer =
              null;

            if (sendMobileOtpBtn) {
              sendMobileOtpBtn.disabled =
                false;

              sendMobileOtpBtn.textContent =
                "Resend OTP";
            }
          }
        },
        1000
      );
  }

  function startEmailResendCooldown() {
    if (emailResendTimer) {
      clearInterval(
        emailResendTimer
      );

      emailResendTimer = null;
    }

    if (!sendEmailOtpBtn) {
      return;
    }

    let seconds =
      RESEND_COOLDOWN;

    sendEmailOtpBtn.disabled =
      true;

    sendEmailOtpBtn.textContent =
      `Resend OTP in ${seconds}s`;

    emailResendTimer =
      setInterval(
        function () {
          seconds--;

          if (sendEmailOtpBtn) {
            sendEmailOtpBtn.textContent =
              `Resend OTP in ${seconds}s`;
          }

          if (seconds <= 0) {
            clearInterval(
              emailResendTimer
            );

            emailResendTimer =
              null;

            if (sendEmailOtpBtn) {
              sendEmailOtpBtn.disabled =
                false;

              sendEmailOtpBtn.textContent =
                "Resend OTP";
            }
          }
        },
        1000
      );
  }

  function resendMobileOtp() {
    sendMobileOtp(true);
  }

  function resendEmailOtp() {
    sendEmailOtp(true);
  }

  function showMobileOtpControls() {
    const mobileOtpRow =
      mobileOtpPanel?.querySelector(
        ".inline-otp-row"
      );

    showOtpPanel(
      mobileOtpPanel
    );

    if (mobileOtpRow) {
      mobileOtpRow.style.display =
        "flex";
    }

    if (mobileOtpInput) {
      mobileOtpInput.value =
        "";

      mobileOtpInput.readOnly =
        false;

      mobileOtpInput.style.display =
        "";
    }

    if (verifyMobileOtpBtn) {
      verifyMobileOtpBtn.style.display =
        "";

      verifyMobileOtpBtn.disabled =
        false;

      verifyMobileOtpBtn.textContent =
        "Verify OTP";
    }


  }

  function hideMobileOtpControlsAfterVerification() {
    const mobileOtpRow =
      mobileOtpPanel?.querySelector(
        ".inline-otp-row"
      );

    if (mobileOtpInput) {
      mobileOtpInput.value =
        "";

      mobileOtpInput.readOnly =
        true;
    }

    if (mobileOtpRow) {
      mobileOtpRow.style.display =
        "none";
    }

    if (sendMobileOtpBtn) {
      sendMobileOtpBtn.style.display =
        "none";
    }



    if (mobileResendTimer) {
      clearInterval(
        mobileResendTimer
      );

      mobileResendTimer = null;
    }

    showOtpPanel(
      mobileOtpPanel
    );
  }

  function showEmailOtpControls() {
    const emailOtpRow =
      emailOtpPanel?.querySelector(
        ".inline-otp-row"
      );

    showOtpPanel(
      emailOtpPanel
    );

    if (emailOtpRow) {
      emailOtpRow.style.display =
        "flex";
    }

    if (emailOtpInput) {
      emailOtpInput.value =
        "";

      emailOtpInput.readOnly =
        false;

      emailOtpInput.style.display =
        "";
    }

    if (verifyEmailOtpBtn) {
      verifyEmailOtpBtn.style.display =
        "";

      verifyEmailOtpBtn.disabled =
        false;

      verifyEmailOtpBtn.textContent =
        "Verify OTP";
    }


  }

  function hideEmailOtpControlsAfterVerification() {
    const emailOtpRow =
      emailOtpPanel?.querySelector(
        ".inline-otp-row"
      );

    if (emailOtpInput) {
      emailOtpInput.value =
        "";

      emailOtpInput.readOnly =
        true;
    }

    if (emailOtpRow) {
      emailOtpRow.style.display =
        "none";
    }

    if (sendEmailOtpBtn) {
      sendEmailOtpBtn.style.display =
        "none";
    }



    if (emailResendTimer) {
      clearInterval(
        emailResendTimer
      );

      emailResendTimer = null;
    }

    showOtpPanel(
      emailOtpPanel
    );
  }

  function restoreOtpControls() {
    const mobileOtpRow =
      mobileOtpPanel?.querySelector(
        ".inline-otp-row"
      );

    const emailOtpRow =
      emailOtpPanel?.querySelector(
        ".inline-otp-row"
      );

    mobileOtpSent =
      false;

    emailOtpSent =
      false;

    if (sendMobileOtpBtn) {
      sendMobileOtpBtn.style.display =
        "";

      sendMobileOtpBtn.disabled =
        false;

      sendMobileOtpBtn.textContent =
        "Send OTP";
    }

    if (sendEmailOtpBtn) {
      sendEmailOtpBtn.style.display =
        "";

      sendEmailOtpBtn.disabled =
        false;

      sendEmailOtpBtn.textContent =
        "Send OTP";
    }

    if (mobileOtpRow) {
      mobileOtpRow.style.display =
        "flex";
    }

    if (emailOtpRow) {
      emailOtpRow.style.display =
        "flex";
    }

    if (mobileOtpInput) {
      mobileOtpInput.value =
        "";

      mobileOtpInput.readOnly =
        false;

      mobileOtpInput.style.display =
        "";
    }

    if (emailOtpInput) {
      emailOtpInput.value =
        "";

      emailOtpInput.readOnly =
        false;

      emailOtpInput.style.display =
        "";
    }

    if (verifyMobileOtpBtn) {
      verifyMobileOtpBtn.style.display =
        "";

      verifyMobileOtpBtn.disabled =
        false;

      verifyMobileOtpBtn.textContent =
        "Verify OTP";
    }

    if (verifyEmailOtpBtn) {
      verifyEmailOtpBtn.style.display =
        "";

      verifyEmailOtpBtn.disabled =
        false;

      verifyEmailOtpBtn.textContent =
        "Verify OTP";
    }

    hideOtpPanel(
      mobileOtpPanel
    );

    hideOtpPanel(
      emailOtpPanel
    );





    if (mobileResendTimer) {
      clearInterval(
        mobileResendTimer
      );

      mobileResendTimer = null;
    }

    if (emailResendTimer) {
      clearInterval(
        emailResendTimer
      );

      emailResendTimer = null;
    }
  }

  /* =====================================================
     READ API RESPONSE
  ===================================================== */

  async function readJsonResponse(
    response,
    fallbackMessage
  ) {
    const responseText =
      await response.text();

    try {
      return JSON.parse(
        responseText
      );
    } catch (error) {
      console.error(
        "INVALID BACKEND RESPONSE:",
        responseText
      );

      throw new Error(
        fallbackMessage
      );
    }
  }

  /* =====================================================
     COURSE DROPDOWN
  ===================================================== */

  function setupCourseDropdown() {
    const courseInput =
      document.getElementById(
        "courseSearchInput"
      );

    const courseValue =
      document.getElementById(
        "courseName"
      );

    const courseOptions =
      document.getElementById(
        "courseOptions"
      );

    if (
      !courseInput ||
      !courseValue ||
      !courseOptions
    ) {
      return;
    }

    courseInput.addEventListener(
      "click",
      function () {
        courseOptions.classList.toggle(
          "show"
        );
      }
    );

    courseOptions.addEventListener(
      "click",
      function (event) {
        const selectedOption =
          event.target.closest(
            ".course-option"
          );

        if (!selectedOption) {
          return;
        }

        const selectedValue =
          selectedOption.getAttribute(
            "data-value"
          );

        courseInput.value =
          selectedValue;

        courseValue.value =
          selectedValue;

        courseOptions.classList.remove(
          "show"
        );
      }
    );

    document.addEventListener(
      "click",
      function (event) {
        const dropdown =
          event.target.closest(
            ".custom-course-dropdown"
          );

        if (!dropdown) {
          courseOptions.classList.remove(
            "show"
          );
        }
      }
    );
  }

  /* =====================================================
     AGE VALIDATION
  ===================================================== */

  function setupAgeValidation() {
    if (
      !dob ||
      !age ||
      !dobDisplay
    ) {
      return;
    }

    const today = new Date();

    const minDob = addYears(today, -40);
    const maxDob = addYears(today, -15);

    dob.min = getDateString(minDob);
    dob.max = getDateString(maxDob);

    if (openDobCalendarBtn) {
      openDobCalendarBtn.addEventListener(
        "click",
        function () {
          if (
            dob &&
            typeof dob.showPicker ===
              "function"
          ) {
            dob.showPicker();
          } else {
            dob.click();
          }
        }
      );
    }

    dob.addEventListener(
      "change",
      function () {
        if (!this.value) {
          dobDisplay.value = "";
          age.value = "";
          clearDobError();
          return;
        }

        const parts = this.value.split("-");

        const selectedDate = new Date(
          parseInt(parts[0], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[2], 10)
        );

        if (
          isNaN(
            selectedDate.getTime()
          )
        ) {
          age.value = "";
          showDobError(
            "Please enter a valid date in DD-MM-YYYY format."
          );
          return;
        }

        dobDisplay.value =
          formatDdMmYyyy(
            selectedDate
          );

        const calculatedAge =
          calculateAge(
            selectedDate
          );

        if (
          calculatedAge === "" ||
          calculatedAge < 15 ||
          calculatedAge > 40
        ) {
          age.value = "";
          showDobError(
            "Only applicants aged between 15 and 40 years can apply."
          );
          return;
        }

        age.value = calculatedAge;
        clearDobError();
      }
    );

    dobDisplay.addEventListener(
      "input",
      function () {
        let value =
          this.value.replace(
            /\D/g,
            ""
          );

        if (
          value.length > 8
        ) {
          value =
            value.slice(
              0,
              8
            );
        }

        if (
          value.length >= 2
        ) {
          value =
            value.slice(
              0,
              2
            ) +
            "-" +
            value.slice(2);
        }

        if (
          value.length >= 5
        ) {
          value =
            value.slice(
              0,
              5
            ) +
            "-" +
            value.slice(5);
        }

        this.value = value;

        if (
          value.length === 10
        ) {
          const parsedDate =
            parseDdMmYyyy(
              value
            );

          if (parsedDate) {
            dob.value =
              getDateString(
                parsedDate
              );

            const calculatedAge =
              calculateAge(
                parsedDate
              );

            if (
              calculatedAge === "" ||
              calculatedAge < 15 ||
              calculatedAge > 40
            ) {
              age.value = "";
              showDobError(
                "Only applicants aged between 15 and 40 years can apply."
              );
              return;
            }

            age.value = calculatedAge;
            clearDobError();
          } else {
            dob.value = "";
            age.value = "";
            showDobError(
              "Please enter a valid date in DD-MM-YYYY format."
            );
          }
        } else {
          dob.value = "";
          age.value = "";
          clearDobError();
        }
      }
    );
  }

  /* =====================================================
     DECLARATION DATE
  ===================================================== */

  function setupDeclarationDate() {
    if (!declarationDate) {
      return;
    }

    declarationDate.value =
      getDateString(
        new Date()
      );

    declarationDate.readOnly =
      true;
  }

  /* =====================================================
     DECLARATION PLACE
  ===================================================== */

  function setupDeclarationPlace() {
    if (!place) {
      return;
    }

    place.addEventListener(
      "input",
      function () {
        placeManuallyEdited =
          place.value.trim() !==
          "";
      }
    );
  }

  /* =====================================================
     SAME ADDRESS
  ===================================================== */

  function setupSameAddress() {
    if (
      !sameAddress ||
      !presentAddress ||
      !permanentAddress
    ) {
      return;
    }

    sameAddress.addEventListener(
      "change",
      function () {
        if (
          this.value === "Yes"
        ) {
          permanentAddress.value =
            presentAddress.value;

          permanentAddress.readOnly =
            true;

        } else {
          permanentAddress.value =
            "";

          permanentAddress.readOnly =
            false;
        }
      }
    );

    presentAddress.addEventListener(
      "input",
      function () {
        if (
          sameAddress.value ===
          "Yes"
        ) {
          permanentAddress.value =
            this.value;
        }
      }
    );
  }

  /* =====================================================
     PINCODE
  ===================================================== */

  function setupPincodeValidation() {
    if (!pinCode) {
      return;
    }

    pinCode.inputMode =
      "numeric";

    pinCode.maxLength =
      6;

    pinCode.addEventListener(
      "input",
      async function () {
        this.value =
          this.value
            .replace(
              /\D/g,
              ""
            )
            .slice(
              0,
              6
            );

        const enteredPin =
          this.value;

        if (state) {
          state.value =
            "";
        }

        if (district) {
          district.value =
            "";
        }

        if (
          place &&
          !placeManuallyEdited
        ) {
          place.value =
            "";
        }

        if (
          enteredPin.length > 0 &&
          enteredPin.charAt(0) ===
            "0"
        ) {
          setStatus(
            pinStatus,
            "PIN code must not start with 0.",
            "error"
          );

          return;
        }

        if (
          enteredPin.length > 0 &&
          enteredPin.length < 6
        ) {
          const remainingDigits =
            6 -
            enteredPin.length;

          setStatus(
            pinStatus,
            `Enter the remaining ${remainingDigits} pincode digit(s).`,
            "error"
          );

          return;
        }

        if (
          !/^[1-9][0-9]{5}$/.test(
            enteredPin
          )
        ) {
          return;
        }

        try {
          setStatus(
            pinStatus,
            "Fetching location details...",
            ""
          );

          const response =
            await fetch(
              `https://api.postalpincode.in/pincode/${enteredPin}`
            );

          if (
            !response.ok
          ) {
            throw new Error(
              "Unable to fetch pincode details."
            );
          }

          const data =
            await response.json();

          if (
            !data?.[0] ||
            data[0].Status !==
              "Success" ||
            !data[0].PostOffice
              ?.length
          ) {
            throw new Error(
              "Invalid pincode."
            );
          }

          const postOffice =
            data[0].PostOffice[0];

          if (state) {
            state.value =
              postOffice.State ||
              "";
          }

          if (district) {
            district.value =
              postOffice.District ||
              "";
          }

          if (
            place &&
            !placeManuallyEdited
          ) {
            place.value =
              district?.value ||
              postOffice.District ||
              "";
          }

          setStatus(
            pinStatus,
            "State, district, and place filled automatically.",
            "success"
          );

        } catch (error) {
          console.error(
            "PINCODE ERROR:",
            error
          );

          setStatus(
            pinStatus,
            error.message ||
              "Unable to fetch pincode details.",
            "error"
          );
        }
      }
    );
  }

  /* =====================================================
     AADHAAR
  ===================================================== */

  function setupAadhaarValidation() {
    if (!aadhaarNumber) {
      return;
    }

    aadhaarNumber.inputMode =
      "numeric";

    aadhaarNumber.maxLength =
      12;

    aadhaarNumber.addEventListener(
      "input",
      function () {
        let filteredValue =
          this.value
            .replace(
              /\D/g,
              ""
            )
            .slice(
              0,
              12
            );

        if (
          filteredValue.length >
            0 &&
          /^[01]/.test(
            filteredValue
          )
        ) {
          filteredValue =
            filteredValue.replace(
              /^[01]/,
              ""
            );
        }

        this.value =
          filteredValue;
      }
    );

    if (hasAadhaar) {
      hasAadhaar.addEventListener(
        "change",
        function () {
          aadhaarNumber.required =
            this.value ===
            "Yes";

          if (
            this.value ===
            "No"
          ) {
            aadhaarNumber.value =
              "";
          }
        }
      );
    }
  }

  /* =====================================================
     MOBILE VALIDATION
  ===================================================== */

  function setupMobileValidation(
    input
  ) {
    if (!input) {
      return;
    }

    input.inputMode =
      "numeric";

    input.maxLength =
      10;

    input.addEventListener(
      "input",
      function () {
        this.value =
          this.value
            .replace(
              /\D/g,
              ""
            )
            .slice(
              0,
              10
            );

        if (
          input ===
          mobileInput
        ) {
          isMobileOtpVerified =
            false;

          if (mobileOtpInput) {
            mobileOtpInput.value =
              "";

            mobileOtpInput.readOnly =
              false;
          }

          setStatus(
            mobileOtpStatus,
            "Mobile OTP not verified.",
            ""
          );



          if (mobileResendTimer) {
            clearInterval(
              mobileResendTimer
            );

            mobileResendTimer =
              null;
          }
        }
      }
    );
  }

  /* =====================================================
     EMAIL VALIDATION
  ===================================================== */

  function setupEmailValidation() {
    if (!emailInput) {
      return;
    }

    emailInput.addEventListener(
      "input",
      function () {
        this.value =
          this.value.replace(
            /\s/g,
            ""
          );

        isEmailOtpVerified =
          false;

        if (emailOtpInput) {
          emailOtpInput.value =
            "";

          emailOtpInput.readOnly =
            false;
        }

        setStatus(
          emailOtpStatus,
          "Email OTP not verified.",
          ""
        );



        if (emailResendTimer) {
          clearInterval(
            emailResendTimer
          );

          emailResendTimer =
            null;
        }
      }
    );
  }

  /* =====================================================
     CHARACTER RESTRICTIONS
  ===================================================== */

  function setupNameFieldRestriction(
    inputId
  ) {
    const input =
      document.getElementById(
        inputId
      );

    if (!input) {
      return;
    }

    input.addEventListener(
      "input",
      function () {
        const filteredValue =
          this.value.replace(
            /[^A-Za-z .]/g,
            ""
          );

        if (
          this.value !==
          filteredValue
        ) {
          this.value =
            filteredValue;
        }
      }
    );
  }

  function setupSubjectsFieldRestriction(
    inputId
  ) {
    const input =
      document.getElementById(
        inputId
      );

    if (!input) {
      return;
    }

    input.addEventListener(
      "input",
      function () {
        const filteredValue =
          this.value.replace(
            /[^A-Za-z ,]/g,
            ""
          );

        if (
          this.value !==
          filteredValue
        ) {
          this.value =
            filteredValue;
        }
      }
    );
  }

  function setupAllCharacterRestrictions() {
    setupNameFieldRestriction(
      "fullName"
    );

    setupNameFieldRestriction(
      "parentName"
    );

    setupNameFieldRestriction(
      "nationality"
    );

    setupNameFieldRestriction(
      "otherCaste"
    );

    setupNameFieldRestriction(
      "educationCourse"
    );

    setupNameFieldRestriction(
      "educationBoard"
    );

    setupNameFieldRestriction(
      "place"
    );

    setupSubjectsFieldRestriction(
      "educationSubjects"
    );
  }

  /* =====================================================
     EDUCATION
  ===================================================== */

  function setupEducationValidation() {
    if (
      !academicLevel ||
      !educationCourse ||
      !educationSubjects
    ) {
      return;
    }

    academicLevel.addEventListener(
      "change",
      function () {
        if (
          this.value ===
          "8th Standard"
        ) {
          educationCourse.placeholder =
            "Example: 8th Standard";

          educationSubjects.placeholder =
            "Tamil, English, Maths, Science, Social Science";

        } else if (
          this.value ===
          "10th Standard"
        ) {
          educationCourse.placeholder =
            "Example: SSC / X / Matric";

          educationSubjects.placeholder =
            "Tamil, English, Maths, Science, Social Science";

        } else if (
          this.value ===
          "12th Standard"
        ) {
          educationCourse.placeholder =
            "Example: HSC / XII";

          educationSubjects.placeholder =
            "Physics, Chemistry, Biology, Maths";
        }
      }
    );

    educationSubjects.addEventListener(
      "input",
      function () {
        const subjects =
          this.value
            .split(",")
            .map(
              function (
                subject
              ) {
                return subject.trim();
              }
            )
            .filter(
              Boolean
            );

        if (
          subjects.length >=
          2
        ) {
          let allValid =
            true;

          for (
            let i = 0;
            i <
            subjects.length;
            i++
          ) {
            if (
              !/^[A-Za-z ]+$/.test(
                subjects[i]
              )
            ) {
              allValid =
                false;

              break;
            }
          }

          if (allValid) {
            this.setCustomValidity(
              ""
            );
          }
        }
      }
    );

    if (educationYear) {
      educationYear.inputMode =
        "numeric";

      educationYear.maxLength =
        4;

      educationYear.addEventListener(
        "input",
        function () {
          this.value =
            this.value
              .replace(
                /\D/g,
                ""
              )
              .slice(
                0,
                4
              );
        }
      );
    }
  }

  /* =====================================================
     FILE VALIDATION
  ===================================================== */

  function setupFileValidation() {
    const rules = {
      photoUpload: {
        allowedTypes: [
          "image/jpeg",
          "image/png"
        ],

        message:
          "Upload only JPG, JPEG, or PNG image files."
      },

      parentSignature: {
        allowedTypes: [
          "image/jpeg",
          "image/png"
        ],

        message:
          "Upload only JPG, JPEG, or PNG image files."
      },

      aadhaarUpload: {
        allowedTypes: [
          "application/pdf"
        ],

        message:
          "Upload only a PDF file."
      },

      educationCertificateUpload: {
        allowedTypes: [
          "application/pdf"
        ],

        message:
          "Upload only a PDF file."
      }
    };

    uploadFields.forEach(
      function (fieldId) {
        const input =
          document.getElementById(
            fieldId
          );

        const preview =
          document.getElementById(
            `${fieldId}Preview`
          );

        const rule =
          rules[fieldId];

        if (
          !input ||
          !rule
        ) {
          return;
        }

        input.addEventListener(
          "change",
          function () {
            if (preview) {
              preview.innerHTML =
                "";
            }

            const file =
              this.files?.[0];

            if (!file) {
              return;
            }

            if (
              !rule.allowedTypes.includes(
                file.type
              )
            ) {
              this.value =
                "";

              alert(
                rule.message
              );

              return;
            }

            if (!preview) {
              return;
            }

            const fileName =
              document.createElement(
                "p"
              );

            fileName.textContent =
              `Selected: ${file.name}`;

            preview.appendChild(
              fileName
            );

            const fileUrl =
              URL.createObjectURL(
                file
              );

            const viewLink =
              document.createElement(
                "a"
              );

            viewLink.href =
              fileUrl;

            viewLink.target =
              "_blank";

            viewLink.rel =
              "noopener";

            viewLink.textContent =
              "View File";

            preview.appendChild(
              viewLink
            );

            if (
              file.type.startsWith(
                "image/"
              )
            ) {
              const image =
                document.createElement(
                  "img"
                );

              image.src =
                fileUrl;

              image.alt =
                file.name;

              preview.appendChild(
                image
              );
            }
          }
        );
      }
    );
  }

  /* =====================================================
     OTP INPUT
  ===================================================== */

  function setupOtpInput(input) {
    if (!input) {
      return;
    }

    input.inputMode =
      "numeric";

    input.maxLength =
      6;

    input.autocomplete =
      "off";

    input.setAttribute(
      "autocomplete",
      "off"
    );

    input.setAttribute(
      "autocorrect",
      "off"
    );

    input.setAttribute(
      "autocapitalize",
      "off"
    );

    input.setAttribute(
      "spellcheck",
      "false"
    );

    input.addEventListener(
      "paste",
      function (event) {
        event.preventDefault();

        return false;
      }
    );

    input.addEventListener(
      "drop",
      function (event) {
        event.preventDefault();

        return false;
      }
    );

    input.addEventListener(
      "contextmenu",
      function (event) {
        event.preventDefault();

        return false;
      }
    );

    input.addEventListener(
      "input",
      function () {
        this.value =
          this.value
            .replace(
              /\D/g,
              ""
            )
            .slice(
              0,
              6
            );
      }
    );
  }

  /* =====================================================
     SEND MOBILE OTP
     IMPORTANT FIX:
     SEND MOBILE + EMAIL
  ===================================================== */

  async function sendMobileOtp(
    isResend = false
  ) {
    const mobile =
      mobileInput?.value
        .trim() ||
      "";

    const email =
      emailInput?.value
        .trim()
        .toLowerCase() ||
      "";

    let success = false;

    /* -----------------------------
       MOBILE VALIDATION
    ----------------------------- */

    if (
      !/^[6-9]\d{9}$/.test(
        mobile
      )
    ) {
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

    mobileInput?.setCustomValidity(
      ""
    );

    try {
      if (sendMobileOtpBtn) {
        sendMobileOtpBtn.disabled =
          true;

        sendMobileOtpBtn.textContent =
          isResend
            ? "Resending..."
            : "Sending...";
      }

      setStatus(
        mobileOtpStatus,
        isResend
          ? "Resending mobile OTP..."
          : "Sending mobile OTP...",
        ""
      );

      console.log(
        "SEND MOBILE OTP API:",
        `${API_BASE_URL}/send-mobile-otp`
      );

      console.log(
        "SEND MOBILE OTP PAYLOAD:",
        {
          mobile:
            mobile,

          email:
            email
        }
      );

      const response =
        await fetch(
          `${API_BASE_URL}/send-mobile-otp`,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                mobile:
                  mobile,

                email:
                  email
              })
          }
        );

      const result =
        await readJsonResponse(
          response,
          "The mobile OTP API returned an invalid response."
        );

      console.log(
        "SEND MOBILE OTP RESPONSE:",
        result
      );

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Mobile OTP sending failed."
        );
      }

      isMobileOtpVerified =
        false;

      mobileOtpSent =
        true;

      showMobileOtpControls();

      success = true;

      if (mobileOtpInput) {
        mobileOtpInput.focus();
      }

      setStatus(
        mobileOtpStatus,
        isResend
          ? "OTP resent successfully"
          : "Mobile OTP sent successfully. Check your phone.",
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
        if (!success) {
          sendMobileOtpBtn.disabled =
            false;

          sendMobileOtpBtn.textContent =
            mobileOtpSent
              ? "Resend OTP"
              : "Send OTP";
        }
      }
    }

    if (success) {
      startMobileResendCooldown();
    }
  }

  /* =====================================================
     VERIFY MOBILE OTP
     IMPORTANT FIX:
     SEND MOBILE + EMAIL + OTP
  ===================================================== */

  async function verifyMobileOtp() {
    const mobile =
      mobileInput?.value
        .trim() ||
      "";

    const email =
      emailInput?.value
        .trim()
        .toLowerCase() ||
      "";

    const otp =
      mobileOtpInput?.value
        .trim() ||
      "";

    if (
      !/^[6-9]\d{9}$/.test(
        mobile
      )
    ) {
      setStatus(
        mobileOtpStatus,
        "Enter a valid 10-digit mobile number.",
        "error"
      );

      return;
    }

    if (
      !/^\d{6}$/.test(
        otp
      )
    ) {
      setStatus(
        mobileOtpStatus,
        "Enter the complete 6-digit mobile OTP.",
        "error"
      );

      return;
    }

    try {
      if (verifyMobileOtpBtn) {
        verifyMobileOtpBtn.disabled =
          true;

        verifyMobileOtpBtn.textContent =
          "Verifying...";
      }

      console.log(
        "VERIFY MOBILE OTP API:",
        `${API_BASE_URL}/verify-mobile-otp`
      );

      console.log(
        "VERIFY MOBILE OTP PAYLOAD:",
        {
          mobile:
            mobile,

          email:
            email,

          otp:
            otp
        }
      );

      const response =
        await fetch(
          `${API_BASE_URL}/verify-mobile-otp`,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                mobile:
                  mobile,

                email:
                  email,

                otp:
                  otp
              })
          }
        );

      const result =
        await readJsonResponse(
          response,
          "The mobile OTP verification API returned an invalid response."
        );

      console.log(
        "VERIFY MOBILE OTP RESPONSE:",
        result
      );

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Mobile OTP verification failed."
        );
      }

      isMobileOtpVerified =
        true;

      if (mobileInput) {
        mobileInput.readOnly =
          true;
      }

      hideMobileOtpControlsAfterVerification();

      setStatus(
        mobileOtpStatus,
        "Mobile OTP verified successfully.",
        "success"
      );

    } catch (error) {
      isMobileOtpVerified =
        false;

      console.error(
        "MOBILE OTP VERIFY ERROR:",
        error
      );

      setStatus(
        mobileOtpStatus,
        error.message ||
          "Incorrect mobile OTP.",
        "error"
      );

    } finally {
      if (verifyMobileOtpBtn) {
        verifyMobileOtpBtn.disabled =
          false;

        verifyMobileOtpBtn.textContent =
          "Verify OTP";
      }
    }
  }

  /* =====================================================
     SEND EMAIL OTP
  ===================================================== */

  async function sendEmailOtp(
    isResend = false
  ) {
    const email =
      emailInput?.value
        .trim()
        .toLowerCase() ||
      "";

    let success = false;

    const emailPattern =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/;

    if (
      !emailPattern.test(
        email
      )
    ) {
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

    emailInput?.setCustomValidity(
      ""
    );

    try {
      if (sendEmailOtpBtn) {
        sendEmailOtpBtn.disabled =
          true;

        sendEmailOtpBtn.textContent =
          isResend
            ? "Resending..."
            : "Sending...";
      }

      setStatus(
        emailOtpStatus,
        isResend
          ? "Resending email OTP..."
          : "Sending email OTP...",
        ""
      );

      console.log(
        "SEND EMAIL OTP API:",
        `${API_BASE_URL}/send-email-otp`
      );

      const response =
        await fetch(
          `${API_BASE_URL}/send-email-otp`,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                email:
                  email
              })
          }
        );

      const result =
        await readJsonResponse(
          response,
          "The email OTP API returned an invalid response."
        );

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Email OTP sending failed."
        );
      }

      isEmailOtpVerified =
        false;

      emailOtpSent =
        true;

      showEmailOtpControls();

      success = true;

      if (emailOtpInput) {
        emailOtpInput.focus();
      }

      setStatus(
        emailOtpStatus,
        isResend
          ? "OTP resent successfully"
          : "Email OTP sent successfully. Check your inbox or spam folder.",
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
        if (!success) {
          sendEmailOtpBtn.disabled =
            false;

          sendEmailOtpBtn.textContent =
            emailOtpSent
              ? "Resend OTP"
              : "Send OTP";
        }
      }
    }

    if (success) {
      startEmailResendCooldown();
    }
  }

  /* =====================================================
     VERIFY EMAIL OTP
  ===================================================== */

  async function verifyEmailOtp() {
    const email =
      emailInput?.value
        .trim()
        .toLowerCase() ||
      "";

    const otp =
      emailOtpInput?.value
        .trim() ||
      "";

    if (
      !/^\d{6}$/.test(
        otp
      )
    ) {
      setStatus(
        emailOtpStatus,
        "Enter the complete 6-digit email OTP.",
        "error"
      );

      return;
    }

    try {
      if (verifyEmailOtpBtn) {
        verifyEmailOtpBtn.disabled =
          true;

        verifyEmailOtpBtn.textContent =
          "Verifying...";
      }

      console.log(
        "VERIFY EMAIL OTP API:",
        `${API_BASE_URL}/verify-email-otp`
      );

      const response =
        await fetch(
          `${API_BASE_URL}/verify-email-otp`,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                email:
                  email,

                otp:
                  otp
              })
          }
        );

      const result =
        await readJsonResponse(
          response,
          "The email OTP verification API returned an invalid response."
        );

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Email OTP verification failed."
        );
      }

      isEmailOtpVerified =
        true;

      if (emailInput) {
        emailInput.readOnly =
          true;
      }

      hideEmailOtpControlsAfterVerification();

      setStatus(
        emailOtpStatus,
        "Email OTP verified successfully.",
        "success"
      );

    } catch (error) {
      isEmailOtpVerified =
        false;

      setStatus(
        emailOtpStatus,
        error.message ||
          "Incorrect email OTP.",
        "error"
      );

    } finally {
      if (verifyEmailOtpBtn) {
        verifyEmailOtpBtn.disabled =
          false;

        verifyEmailOtpBtn.textContent =
          "Verify OTP";
      }
    }
  }

  /* =====================================================
     OTP BUTTONS
  ===================================================== */

  function setupOtpButtons() {
    setupOtpInput(
      mobileOtpInput
    );

    setupOtpInput(
      emailOtpInput
    );

    restoreOtpControls();

    if (sendMobileOtpBtn) {
      sendMobileOtpBtn.type =
        "button";

      sendMobileOtpBtn.addEventListener(
        "click",
        function () {
          sendMobileOtp(
            mobileOtpSent
          );
        }
      );
    }

    if (verifyMobileOtpBtn) {
      verifyMobileOtpBtn.type =
        "button";

      verifyMobileOtpBtn.addEventListener(
        "click",
        verifyMobileOtp
      );
    }

    if (sendEmailOtpBtn) {
      sendEmailOtpBtn.type =
        "button";

      sendEmailOtpBtn.addEventListener(
        "click",
        function () {
          sendEmailOtp(
            emailOtpSent
          );
        }
      );
    }

    if (verifyEmailOtpBtn) {
      verifyEmailOtpBtn.type =
        "button";

      verifyEmailOtpBtn.addEventListener(
        "click",
        verifyEmailOtp
      );
    }




  }

  /* =====================================================
     COURSE VALIDATION
  ===================================================== */

  function validateCourse() {
    const course =
      document.getElementById(
        "courseName"
      );

    if (
      !course?.value.trim()
    ) {
      alert(
        "Please select a course."
      );

      return false;
    }

    return true;
  }

  /* =====================================================
     AADHAAR VALIDATION
  ===================================================== */

  function validateAadhaar() {
    if (
      hasAadhaar?.value ===
        "Yes" &&
      !/^[2-9]\d{11}$/.test(
        aadhaarNumber?.value.trim() ||
          ""
      )
    ) {
      aadhaarNumber?.setCustomValidity(
        "Aadhaar number must start with digits 2 to 9 and be exactly 12 digits."
      );

      return false;
    }

    aadhaarNumber?.setCustomValidity(
      ""
    );

    return true;
  }

  /* =====================================================
     EDUCATION SUBJECT VALIDATION
  ===================================================== */

  function validateEducationSubjects() {
    const subjects =
      educationSubjects?.value
        .split(",")
        .map(
          function (s) {
            return s.trim();
          }
        )
        .filter(
          function (s) {
            return s.length >
              0;
          }
        ) ||
      [];

    if (
      subjects.length <
      2
    ) {
      educationSubjects?.setCustomValidity(
        "Please enter all subjects separated by commas. At least two subjects are required."
      );

      return false;
    }

    for (
      let i = 0;
      i <
      subjects.length;
      i++
    ) {
      if (
        !/^[A-Za-z ]+$/.test(
          subjects[i]
        )
      ) {
        educationSubjects?.setCustomValidity(
          "Please enter all subjects separated by commas. At least two subjects are required."
        );

        return false;
      }
    }

    educationSubjects.setCustomValidity(
      ""
    );

    return true;
  }

  /* =====================================================
     EDUCATION DETAILS VALIDATION
  ===================================================== */

  function validateEducationDetails() {
    if (
      !academicLevel?.value.trim()
    ) {
      academicLevel?.setCustomValidity(
        "Academic Level is required."
      );

      return false;
    }

    academicLevel?.setCustomValidity(
      ""
    );

    if (
      !educationCourse?.value.trim()
    ) {
      educationCourse?.setCustomValidity(
        "Qualification / Course is required."
      );

      return false;
    }

    educationCourse?.setCustomValidity(
      ""
    );

    if (
      !educationBoard?.value.trim()
    ) {
      educationBoard?.setCustomValidity(
        "University / Board is required."
      );

      return false;
    }

    educationBoard?.setCustomValidity(
      ""
    );

    if (
      !educationYear?.value.trim()
    ) {
      educationYear?.setCustomValidity(
        "Year of Passing is required."
      );

      return false;
    }

    if (
      !/^\d{4}$/.test(
        educationYear.value.trim()
      )
    ) {
      educationYear?.setCustomValidity(
        "Year of Passing must be exactly 4 digits."
      );

      return false;
    }

    educationYear?.setCustomValidity(
      ""
    );

    if (
      !educationGrade?.value.trim()
    ) {
      educationGrade?.setCustomValidity(
        "Grade / Percentage is required."
      );

      return false;
    }

    educationGrade?.setCustomValidity(
      ""
    );

    return true;
  }

  /* =====================================================
     OTP VERIFICATION CHECK
  ===================================================== */

  function validateOtpVerification() {
    if (
      !isEmailOtpVerified
    ) {
      setStatus(
        emailOtpStatus,
        "Please verify your email address using OTP before submitting the application.",
        "error"
      );

      showOtpPanel(
        emailOtpPanel
      );

      emailOtpPanel?.scrollIntoView(
        {
          behavior: "smooth",
          block: "center"
        }
      );

      return false;
    }

    if (
      !isMobileOtpVerified
    ) {
      setStatus(
        mobileOtpStatus,
        "Please verify your mobile number using OTP before submitting the application.",
        "error"
      );

      showOtpPanel(
        mobileOtpPanel
      );

      mobileOtpPanel?.scrollIntoView(
        {
          behavior: "smooth",
          block: "center"
        }
      );

      return false;
    }

    return true;
  }

  /* =====================================================
     DOB VALIDATION
  ===================================================== */

  function validateDob() {
    if (!dob?.value) {
      showDobError(
        "Date of Birth is required."
      );
      dobDisplay?.reportValidity();
      return false;
    }

    const calculatedAge =
      calculateAge(
        dob.value
      );

    if (
      calculatedAge === "" ||
      calculatedAge < 15 ||
      calculatedAge > 40
    ) {
      showDobError(
        "Only applicants aged between 15 and 40 years can apply."
      );
      dobDisplay?.reportValidity();
      return false;
    }

    clearDobError();
    return true;
  }

  /* =====================================================
     MOBILE VALIDATION
  ===================================================== */

  function validateMobile(
    input,
    isRequired = false
  ) {
    if (
      isRequired &&
      !input?.value
    ) {
      input?.setCustomValidity(
        "Mobile number is required."
      );

      return false;
    }

    if (
      input?.value &&
      !/^[6-9]\d{9}$/.test(
        input.value
      )
    ) {
      input?.setCustomValidity(
        "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9."
      );

      return false;
    }

    input?.setCustomValidity(
      ""
    );

    return true;
  }

  /* =====================================================
     EMAIL VALIDATION
  ===================================================== */

  function validateEmail() {
    if (
      !emailInput?.value
    ) {
      emailInput?.setCustomValidity(
        "Email address is required."
      );

      return false;
    }

    const emailPattern =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?$/;

    if (
      !emailPattern.test(
        emailInput.value
      )
    ) {
      emailInput?.setCustomValidity(
        "Please enter a valid email address."
      );

      return false;
    }

    emailInput?.setCustomValidity(
      ""
    );

    return true;
  }

  /* =====================================================
     PINCODE VALIDATION
  ===================================================== */

  function validatePincode() {
    if (
      !pinCode?.value
    ) {
      pinCode?.setCustomValidity(
        "Pincode is required."
      );

      return false;
    }

    if (
      !/^[1-9][0-9]{5}$/.test(
        pinCode.value
      )
    ) {
      pinCode?.setCustomValidity(
        "Enter a valid 6-digit Indian PIN code."
      );

      return false;
    }

    pinCode?.setCustomValidity(
      ""
    );

    return true;
  }

  /* =====================================================
     SUBMIT APPLICATION
  ===================================================== */

  async function submitApplication(
    event
  ) {
    console.log(
      "SUBMIT APPLICATION FUNCTION CALLED"
    );

    event.preventDefault();

    const branchSelect =
      document.getElementById(
        "branch_name"
      );

    if (branchCategory) {
      if (
        !branchCategory.value.trim()
      ) {
        branchCategory.setCustomValidity(
          "Please select a Branch Category"
        );
      } else {
        branchCategory.setCustomValidity(
          ""
        );
      }
    }

    if (branchSelect) {
      if (
        !branchSelect.value.trim()
      ) {
        branchSelect.setCustomValidity(
          "Please select a Branch Name"
        );
      } else {
        branchSelect.setCustomValidity(
          ""
        );
      }
    }

    if (
      !form.checkValidity()
    ) {
      console.log(
        "FORM CHECK VALIDITY FAILED"
      );

      form.reportValidity();

      return;
    }

    if (
      !validateCourse()
    ) {
      return;
    }

    if (
      !validateDob()
    ) {
      return;
    }

    if (
      !validateAadhaar()
    ) {
      return;
    }

    if (
      !validateMobile(
        mobileInput,
        true
      )
    ) {
      return;
    }

    if (
      !validateEmail()
    ) {
      return;
    }

    if (
      !validatePincode()
    ) {
      return;
    }

    if (
      !validateEducationDetails()
    ) {
      return;
    }

    if (
      !validateEducationSubjects()
    ) {
      educationSubjects?.reportValidity();

      return;
    }

    if (
      !validateOtpVerification()
    ) {
      return;
    }

    const originalButtonText =
      submitButton?.textContent ||
      "Submit Application";

    try {
      if (submitButton) {
        submitButton.disabled =
          true;

        submitButton.textContent =
          "Submitting...";
      }

      const formData =
        new FormData(
          form
        );

      const branchName =
        branchSelect?.value.trim() ||
        "";

      console.log(
        "Selected Branch:",
        branchName
      );

      formData.set(
        "branch_name",
        branchName
      );

      formData.set(
        "branch_category",
        branchCategory?.value.trim() || ""
      );

      console.log(
        "branch_name in FormData:",
        formData.get("branch_name")
      );

      formData.set(
        "applicationNo",
        applicationNo?.value ||
          (await generateApplicationNo())
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

      const response =
        await fetch(
          `${API_BASE_URL}/admissions`,
          {
            method:
              "POST",

            body:
              formData
          }
        );

      const result =
        await readJsonResponse(
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
        result.data?.applicationNo ||
        formData.get(
          "applicationNo"
        );

      alert(
        `Your application was submitted successfully.\nApplication No: ${submittedApplicationNo}`
      );

      await resetCompleteForm();

      window.scrollTo({
        top:
          0,

        behavior:
          "smooth"
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
        submitButton.disabled =
          false;

        submitButton.textContent =
          originalButtonText;
      }
    }
  }

  /* =====================================================
     RESET FORM
  ===================================================== */

  async function resetCompleteForm() {
    form.reset();

    const allInputs =
      form.querySelectorAll(
        "input, select, textarea"
      );

    allInputs.forEach(
      function (input) {
        input.setCustomValidity(
          ""
        );
      }
    );

    isMobileOtpVerified =
      false;

    isEmailOtpVerified =
      false;

    placeManuallyEdited =
      false;

    if (mobileInput) {
      mobileInput.readOnly =
        false;
    }

    if (emailInput) {
      emailInput.readOnly =
        false;
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

    uploadFields.forEach(
      function (fieldId) {
        const preview =
          document.getElementById(
            `${fieldId}Preview`
          );

        if (preview) {
          preview.innerHTML =
            "";
        }
      }
    );

    const courseInput =
      document.getElementById(
        "courseSearchInput"
      );

    const courseValue =
      document.getElementById(
        "courseName"
      );

    if (courseInput) {
      courseInput.value =
        "";
    }

    if (courseValue) {
      courseValue.value =
        "";
    }

    populateBranchLocations(
      branchCategory?.value || ""
    );

    if (applicationNo) {
      sessionStorage.removeItem(
        APP_NO_SESSION_KEY
      );

      const next =
        await generateApplicationNo();

      applicationNo.value = next;

      sessionStorage.setItem(
        APP_NO_SESSION_KEY,
        next
      );
    }

    setupDeclarationDate();
  }

  /* =====================================================
     RESET BUTTON
  ===================================================== */

  function setupResetButton() {
    const resetButton =
      form?.querySelector(
        ".reset-btn"
      );

    if (!resetButton) {
      return;
    }

    resetButton.addEventListener(
      "click",
      function (event) {
        event.preventDefault();

        resetCompleteForm();
      }
    );
  }

  /* =====================================================
     INITIALIZE
  ===================================================== */

  async function initialize() {
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

    await setupApplicationNumber();

    setupBranchCategory();

    setupCourseDropdown();

    setupAgeValidation();

    setupDeclarationDate();

    setupDeclarationPlace();

    setupSameAddress();

    setupPincodeValidation();

    setupAadhaarValidation();

    setupMobileValidation(
      mobileInput
    );

    setupMobileValidation(
      alternateOne
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

/* =====================================================
   BACK TO DOWNLOADS
===================================================== */

function goBackToDownloads() {
  window.location.href =
    "downloads.html#student";
}