document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("admissionForm");
  const applicationNo = document.getElementById("applicationNo");
  const dob = document.getElementById("dob");
  const age = document.getElementById("age");
  const sameAddress = document.getElementById("sameAddress");
  const presentAddress = document.getElementById("presentAddress");
  const permanentAddress = document.getElementById("permanentAddress");
  const pinCode = document.getElementById("pinCode");
  const state = document.getElementById("state");
  const district = document.getElementById("district");
  const pinStatus = document.getElementById("pinStatus");
  const academicLevel = document.getElementById("academicLevel");
  const educationCourse = document.getElementById("educationCourse");
  const educationSubjects = document.getElementById("educationSubjects");

  const API_BASE_URL = "http://localhost:3000/api";

  let isEmailOtpVerified = false;
  let isMobileOtpVerified = false;
  let generatedMobileOtp = "";

  const uploadFields = [
    "photoUpload",
    "aadhaarUpload",
    "educationCertificateUpload",
    "parentSignature"
  ];

  function generateApplicationNo() {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    return "GCARE" + year + random;
  }

  function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
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
      const isInsideDropdown = event.target.closest(".custom-course-dropdown");

      if (!isInsideDropdown) {
        courseOptions.classList.remove("show");
      }
    });
  }

  function calculateAge(dobValue) {
    if (!dobValue) return "";

    const today = new Date();
    const birthDate = new Date(dobValue);

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    return calculatedAge >= 0 ? calculatedAge : "";
  }

  function setupAgeCalculation() {
    if (!dob || !age) return;

    dob.addEventListener("change", function () {
      age.value = calculateAge(this.value);
    });
  }

  function setupSameAddress() {
    if (!sameAddress || !presentAddress || !permanentAddress) return;

    sameAddress.addEventListener("change", function () {
      if (this.value === "Yes") {
        permanentAddress.value = presentAddress.value;
        permanentAddress.setAttribute("readonly", "readonly");
      } else {
        permanentAddress.value = "";
        permanentAddress.removeAttribute("readonly");
      }
    });

    presentAddress.addEventListener("input", function () {
      if (sameAddress.value === "Yes") {
        permanentAddress.value = this.value;
      }
    });
  }

  function setupPinCodeAutoFill() {
    if (!pinCode || !state || !district || !pinStatus) return;

    pinCode.addEventListener("input", async function () {
      const enteredPin = this.value.trim();

      state.value = "";
      district.value = "";
      pinStatus.textContent = "";
      pinStatus.classList.remove("error");

      if (!/^[0-9]{6}$/.test(enteredPin)) return;

      try {
        pinStatus.textContent = "Fetching state and district...";

        const response = await fetch(
          "https://api.postalpincode.in/pincode/" + enteredPin
        );

        const data = await response.json();

        if (
          data &&
          data[0] &&
          data[0].Status === "Success" &&
          data[0].PostOffice &&
          data[0].PostOffice.length > 0
        ) {
          const postOffice = data[0].PostOffice[0];

          state.value = postOffice.State || "";
          district.value = postOffice.District || "";

          pinStatus.textContent = "State and district filled automatically.";
        } else {
          pinStatus.textContent =
            "Invalid pin code. Please check and enter again.";
          pinStatus.classList.add("error");
        }
      } catch (error) {
        pinStatus.textContent =
          "Unable to fetch details. Please enter state and district manually.";
        pinStatus.classList.add("error");
      }
    });
  }

  function setupEducationLevel() {
    if (!academicLevel || !educationCourse || !educationSubjects) return;

    academicLevel.addEventListener("change", function () {
      if (this.value === "8th Standard") {
        educationCourse.placeholder = "Example: 8th Standard";
        educationSubjects.placeholder =
          "Example: Tamil, English, Maths, Science, Social Science";
      }

      if (this.value === "10th Standard") {
        educationCourse.placeholder = "Example: SSC / X / Matric";
        educationSubjects.placeholder =
          "Example: Tamil, English, Maths, Science, Social Science";
      }

      if (this.value === "12th Standard") {
        educationCourse.placeholder = "Example: HSC / XII";
        educationSubjects.placeholder =
          "Example: Physics, Chemistry, Biology, Maths / Commerce, Accountancy";
      }

      educationCourse.value = "";
      educationSubjects.value = "";
    });
  }

  function setupFilePreview() {
    uploadFields.forEach(function (fieldId) {
      const input = document.getElementById(fieldId);
      const preview = document.getElementById(fieldId + "Preview");

      if (!input || !preview) return;

      input.addEventListener("change", function () {
        preview.innerHTML = "";

        const file = this.files[0];

        if (!file) return;

        const fileUrl = URL.createObjectURL(file);

        const viewLink = document.createElement("a");
        viewLink.href = fileUrl;
        viewLink.target = "_blank";
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

  function validateCourse() {
    const courseValue = document.getElementById("courseName");

    if (!courseValue || courseValue.value.trim() === "") {
      alert("Please select a course.");
      return false;
    }

    return true;
  }

  function validateMobile() {
    const mobile = document.getElementById("mobile");

    if (!mobile) return true;

    if (!/^[0-9]{10}$/.test(mobile.value.trim())) {
      alert("Please enter a valid 10 digit mobile number.");
      mobile.focus();
      return false;
    }

    return true;
  }

  function validatePinCode() {
    if (!pinCode) return true;

    if (!/^[0-9]{6}$/.test(pinCode.value.trim())) {
      alert("Please enter a valid 6 digit pin code.");
      pinCode.focus();
      return false;
    }

    return true;
  }

  function validateAadhaar() {
    const hasAadhaar = document.getElementById("hasAadhaar");
    const aadhaarNumber = document.getElementById("aadhaarNumber");

    if (!hasAadhaar || !aadhaarNumber) return true;

    if (
      hasAadhaar.value === "Yes" &&
      !/^[0-9]{12}$/.test(aadhaarNumber.value.trim())
    ) {
      alert("Please enter a valid 12 digit Aadhaar number.");
      aadhaarNumber.focus();
      return false;
    }

    return true;
  }

  function validateEducationDetails() {
    const educationBoard = document.getElementById("educationBoard");
    const educationYear = document.getElementById("educationYear");
    const educationGrade = document.getElementById("educationGrade");

    if (!academicLevel || academicLevel.value.trim() === "") {
      alert("Please select academic level.");
      academicLevel.focus();
      return false;
    }

    if (!educationCourse || educationCourse.value.trim() === "") {
      alert("Please enter qualification / name of course.");
      educationCourse.focus();
      return false;
    }

    if (!educationBoard || educationBoard.value.trim() === "") {
      alert("Please enter university / board.");
      educationBoard.focus();
      return false;
    }

    if (!educationSubjects || educationSubjects.value.trim() === "") {
      alert("Please enter subjects.");
      educationSubjects.focus();
      return false;
    }

    if (!educationYear || !/^[0-9]{4}$/.test(educationYear.value.trim())) {
      alert("Please enter a valid year of passing.");
      educationYear.focus();
      return false;
    }

    if (!educationGrade || educationGrade.value.trim() === "") {
      alert("Please enter grade / percentage.");
      educationGrade.focus();
      return false;
    }

    return true;
  }

  function validateUploadedFiles() {
    const photoUpload = document.getElementById("photoUpload");
    const aadhaarUpload = document.getElementById("aadhaarUpload");
    const educationCertificateUpload = document.getElementById(
      "educationCertificateUpload"
    );

    if (!photoUpload.files.length) {
      alert("Please upload passport size photo.");
      photoUpload.focus();
      return false;
    }

    if (!aadhaarUpload.files.length) {
      alert("Please upload Aadhaar card.");
      aadhaarUpload.focus();
      return false;
    }

    if (!educationCertificateUpload.files.length) {
      alert("Please upload education certificate.");
      educationCertificateUpload.focus();
      return false;
    }

    return true;
  }

  function validateOtpVerification() {
    if (!isEmailOtpVerified) {
      alert("Please verify email OTP before final submission.");
      return false;
    }

    if (!isMobileOtpVerified) {
      alert("Please verify mobile OTP before final submission.");
      return false;
    }

    return true;
  }

  function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();

      reader.onload = function () {
        resolve({
          name: file.name,
          type: file.type,
          data: reader.result
        });
      };

      reader.onerror = function () {
        reject("File reading failed.");
      };

      reader.readAsDataURL(file);
    });
  }

  async function getUploadedFiles() {
    const files = {};

    for (const fieldId of uploadFields) {
      const input = document.getElementById(fieldId);
      const file = input && input.files.length ? input.files[0] : null;

      files[fieldId] = await fileToBase64(file);
    }

    return files;
  }

  function getInputValue(name) {
    const input = form.querySelector(`[name="${name}"]`);
    return input ? input.value.trim() : "";
  }

  function saveApplication(applicationData) {
    const existingApplications =
      JSON.parse(localStorage.getItem("studentApplications")) || [];

    existingApplications.push(applicationData);

    localStorage.setItem(
      "studentApplications",
      JSON.stringify(existingApplications)
    );
  }

  function clearPreviews() {
    uploadFields.forEach(function (fieldId) {
      const preview = document.getElementById(fieldId + "Preview");

      if (preview) {
        preview.innerHTML = "";
      }
    });
  }

  function resetCourseDropdown() {
    const courseInput = document.getElementById("courseSearchInput");
    const courseValue = document.getElementById("courseName");

    if (courseInput) courseInput.value = "";
    if (courseValue) courseValue.value = "";
  }

  function resetOtpSection() {
    const emailOtpInput = document.getElementById("emailOtp");
    const emailOtpStatus = document.getElementById("emailOtpStatus");
    const mobileOtpInput = document.getElementById("mobileOtp");
    const mobileOtpStatus = document.getElementById("mobileOtpStatus");
    const otpSection = document.getElementById("otpSection");

    isEmailOtpVerified = false;
    isMobileOtpVerified = false;
    generatedMobileOtp = "";

    if (emailOtpInput) emailOtpInput.value = "";
    if (mobileOtpInput) mobileOtpInput.value = "";

    if (emailOtpStatus) {
      emailOtpStatus.textContent = "Email OTP not verified.";
      emailOtpStatus.classList.remove("success");
    }

    if (mobileOtpStatus) {
      mobileOtpStatus.textContent = "Mobile OTP not verified.";
      mobileOtpStatus.classList.remove("success");
    }

    if (otpSection) {
      otpSection.classList.remove("show");
    }
  }

  function setupOtpVerification() {
    const sendEmailOtpBtn = document.getElementById("sendEmailOtpBtn");
    const verifyEmailOtpBtn = document.getElementById("verifyEmailOtpBtn");
    const emailOtpInput = document.getElementById("emailOtp");
    const emailOtpStatus = document.getElementById("emailOtpStatus");

    const sendMobileOtpBtn = document.getElementById("sendMobileOtpBtn");
    const verifyMobileOtpBtn = document.getElementById("verifyMobileOtpBtn");
    const mobileOtpInput = document.getElementById("mobileOtp");
    const mobileOtpStatus = document.getElementById("mobileOtpStatus");

    const emailInput = document.getElementById("email");
    const mobileInput = document.getElementById("mobile");
    const finalVerifySubmitBtn = document.getElementById("finalVerifySubmitBtn");

    if (
      !sendEmailOtpBtn ||
      !verifyEmailOtpBtn ||
      !emailOtpInput ||
      !emailOtpStatus ||
      !sendMobileOtpBtn ||
      !verifyMobileOtpBtn ||
      !mobileOtpInput ||
      !mobileOtpStatus ||
      !emailInput ||
      !mobileInput ||
      !finalVerifySubmitBtn
    ) {
      return;
    }

    sendEmailOtpBtn.addEventListener("click", async function () {
      const email = emailInput.value.trim();

      if (!email) {
        alert("Please enter email address first.");
        emailInput.focus();
        return;
      }

      try {
        sendEmailOtpBtn.disabled = true;
        sendEmailOtpBtn.textContent = "Sending...";

        const response = await fetch(`${API_BASE_URL}/send-email-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to send email OTP.");
        }

        isEmailOtpVerified = false;
        emailOtpStatus.textContent = "Email OTP sent. Please check your email.";
        emailOtpStatus.classList.remove("success");
      } catch (error) {
        isEmailOtpVerified = false;
        emailOtpStatus.textContent =
          "Email OTP sending failed. Please check backend OTP API.";
        emailOtpStatus.classList.remove("success");
      } finally {
        sendEmailOtpBtn.disabled = false;
        sendEmailOtpBtn.textContent = "Send Email OTP";
      }
    });

    verifyEmailOtpBtn.addEventListener("click", async function () {
      const email = emailInput.value.trim();
      const otp = emailOtpInput.value.trim();

      if (!email) {
        alert("Please enter email address first.");
        emailInput.focus();
        return;
      }

      if (!otp) {
        alert("Please enter email OTP.");
        emailOtpInput.focus();
        return;
      }

      try {
        verifyEmailOtpBtn.disabled = true;
        verifyEmailOtpBtn.textContent = "Verifying...";

        const response = await fetch(`${API_BASE_URL}/verify-email-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, otp })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Invalid email OTP.");
        }

        isEmailOtpVerified = true;
        emailOtpStatus.textContent = "Email OTP verified successfully.";
        emailOtpStatus.classList.add("success");
      } catch (error) {
        isEmailOtpVerified = false;
        emailOtpStatus.textContent = "Invalid email OTP.";
        emailOtpStatus.classList.remove("success");
      } finally {
        verifyEmailOtpBtn.disabled = false;
        verifyEmailOtpBtn.textContent = "Verify";
      }
    });

    sendMobileOtpBtn.addEventListener("click", function () {
      const mobile = mobileInput.value.trim();

      if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10 digit mobile number first.");
        mobileInput.focus();
        return;
      }

      generatedMobileOtp = generateOtp();
      isMobileOtpVerified = false;

      mobileOtpStatus.textContent =
        "Dummy mobile OTP sent. Testing OTP: " + generatedMobileOtp;
      mobileOtpStatus.classList.remove("success");
    });

    verifyMobileOtpBtn.addEventListener("click", function () {
      const enteredOtp = mobileOtpInput.value.trim();

      if (!enteredOtp) {
        alert("Please enter mobile OTP.");
        mobileOtpInput.focus();
        return;
      }

      if (enteredOtp === generatedMobileOtp) {
        isMobileOtpVerified = true;
        mobileOtpStatus.textContent = "Mobile OTP verified successfully.";
        mobileOtpStatus.classList.add("success");
      } else {
        isMobileOtpVerified = false;
        mobileOtpStatus.textContent = "Invalid mobile OTP.";
        mobileOtpStatus.classList.remove("success");
      }
    });

    finalVerifySubmitBtn.addEventListener("click", async function () {
      if (!validateOtpVerification()) return;

      const originalButtonText = finalVerifySubmitBtn.textContent;

      try {
        finalVerifySubmitBtn.disabled = true;
        finalVerifySubmitBtn.textContent = "Submitting...";

        const uploadedFiles = await getUploadedFiles();

        const applicationData = {
          applicationNo: applicationNo.value,
          courseName: getInputValue("courseName"),
          title: getInputValue("title"),
          fullName: getInputValue("fullName"),
          dob: getInputValue("dob"),
          age: getInputValue("age"),
          gender: getInputValue("gender"),
          hasAadhaar: getInputValue("hasAadhaar"),
          aadhaarNumber: getInputValue("aadhaarNumber"),
          parentName: getInputValue("parentName"),
          nationality: getInputValue("nationality"),
          caste: getInputValue("caste"),
          otherCaste: getInputValue("otherCaste"),
          presentAddress: getInputValue("presentAddress"),
          pinCode: getInputValue("pinCode"),
          state: getInputValue("state"),
          district: getInputValue("district"),
          sameAddress: getInputValue("sameAddress"),
          permanentAddress: getInputValue("permanentAddress"),
          telephone: getInputValue("telephone"),
          mobile: getInputValue("mobile"),
          alternateOne: getInputValue("alternateOne"),
          alternateTwo: getInputValue("alternateTwo"),
          email: getInputValue("email"),
          academicLevel: getInputValue("academicLevel"),
          educationCourse: getInputValue("educationCourse"),
          educationBoard: getInputValue("educationBoard"),
          educationSubjects: getInputValue("educationSubjects"),
          educationYear: getInputValue("educationYear"),
          educationGrade: getInputValue("educationGrade"),
          declarationDate: getInputValue("declarationDate"),
          place: getInputValue("place"),
          status: "Pending",
          submittedAt: new Date().toLocaleString(),
          files: uploadedFiles
        };

        saveApplication(applicationData);

        alert(
          "Application submitted successfully. Your Application No. is " +
            applicationNo.value +
            "."
        );

        form.reset();
        clearPreviews();
        resetCourseDropdown();
        resetOtpSection();

        const submitButton = document.getElementById("submitApplicationBtn");

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Submit Application";
        }

        applicationNo.value = generateApplicationNo();

        if (pinStatus) {
          pinStatus.textContent = "";
          pinStatus.classList.remove("error");
        }
      } catch (error) {
        console.error("Final submit error:", error);
        alert("Something went wrong. Please try again.");
      } finally {
        finalVerifySubmitBtn.disabled = false;
        finalVerifySubmitBtn.textContent = originalButtonText;
      }
    });

    emailInput.addEventListener("input", function () {
      isEmailOtpVerified = false;
      emailOtpInput.value = "";
      emailOtpStatus.textContent = "Email OTP not verified.";
      emailOtpStatus.classList.remove("success");
    });

    mobileInput.addEventListener("input", function () {
      isMobileOtpVerified = false;
      generatedMobileOtp = "";
      mobileOtpInput.value = "";
      mobileOtpStatus.textContent = "Mobile OTP not verified.";
      mobileOtpStatus.classList.remove("success");
    });
  }

  function setupSubmit() {
    if (!form) return;

    const otpSection = document.getElementById("otpSection");
    const submitButton = document.getElementById("submitApplicationBtn");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateCourse()) return;
      if (!validateMobile()) return;
      if (!validatePinCode()) return;
      if (!validateAadhaar()) return;
      if (!validateEducationDetails()) return;
      if (!validateUploadedFiles()) return;

      if (otpSection) {
        otpSection.classList.add("show");

        setTimeout(function () {
          otpSection.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }, 100);
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "OTP Verification Required";
      }
    });
  }

  function setupResetButton() {
    const resetButton = form.querySelector(".reset-btn");

    if (!resetButton) return;

    resetButton.addEventListener("click", function () {
      setTimeout(function () {
        clearPreviews();
        resetCourseDropdown();
        resetOtpSection();

        const submitButton = document.getElementById("submitApplicationBtn");

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Submit Application";
        }

        if (applicationNo) {
          applicationNo.value = generateApplicationNo();
        }

        if (pinStatus) {
          pinStatus.textContent = "";
          pinStatus.classList.remove("error");
        }
      }, 0);
    });
  }

  function initialize() {
    if (applicationNo) {
      applicationNo.value = generateApplicationNo();
    }

    setupCourseDropdown();
    setupAgeCalculation();
    setupSameAddress();
    setupPinCodeAutoFill();
    setupEducationLevel();
    setupFilePreview();
    setupOtpVerification();
    setupSubmit();
    setupResetButton();
  }

  initialize();
});

function goBackToDownloads() {
  window.location.href = "downloads.html#student";
}