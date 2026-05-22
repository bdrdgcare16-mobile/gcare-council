
// console.log("ADMISSION JS LOADED - EMAIL OTP AUTO SEND WITHOUT POPUP VERSION");

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("admissionForm");
//   const applicationNo = document.getElementById("applicationNo");
//   const dob = document.getElementById("dob");
//   const age = document.getElementById("age");
//   const sameAddress = document.getElementById("sameAddress");
//   const presentAddress = document.getElementById("presentAddress");
//   const permanentAddress = document.getElementById("permanentAddress");
//   const pinCode = document.getElementById("pinCode");
//   const state = document.getElementById("state");
//   const district = document.getElementById("district");
//   const pinStatus = document.getElementById("pinStatus");
//   const academicLevel = document.getElementById("academicLevel");
//   const educationCourse = document.getElementById("educationCourse");
//   const educationSubjects = document.getElementById("educationSubjects");

//   const submitButton = document.getElementById("submitApplicationBtn");
//   const otpSection = document.getElementById("otpSection");

//   const sendEmailOtpBtn = document.getElementById("sendEmailOtpBtn");
//   const verifyEmailOtpBtn = document.getElementById("verifyEmailOtpBtn");
//   const emailOtpInput = document.getElementById("emailOtp");
//   const emailOtpStatus = document.getElementById("emailOtpStatus");

//   const sendMobileOtpBtn = document.getElementById("sendMobileOtpBtn");
//   const verifyMobileOtpBtn = document.getElementById("verifyMobileOtpBtn");
//   const mobileOtpInput = document.getElementById("mobileOtp");
//   const mobileOtpStatus = document.getElementById("mobileOtpStatus");

//   const emailInput = document.getElementById("email");
//   const mobileInput = document.getElementById("mobile");
//   const finalVerifySubmitBtn = document.getElementById("finalVerifySubmitBtn");

// const API_BASE_URL = "https://backend-2kz6.onrender.com/api";
//   const DUMMY_MOBILE_OTP = "123456";

//   let isEmailOtpVerified = false;
//   let isMobileOtpVerified = false;

//   const uploadFields = [
//     "photoUpload",
//     "aadhaarUpload",
//     "educationCertificateUpload",
//     "parentSignature"
//   ];

//   function generateApplicationNo() {
//     const year = new Date().getFullYear();
//     const random = Math.floor(10000 + Math.random() * 90000);
//     return "GCARE" + year + random;
//   }

//   async function readJsonResponse(response, fallbackMessage) {
//     const text = await response.text();

//     try {
//       return JSON.parse(text);
//     } catch (error) {
//       console.log("NON JSON RESPONSE:", text);
//       throw new Error(fallbackMessage);
//     }
//   }

//   function setStatus(element, message, type) {
//     if (!element) return;

//     element.textContent = message;
//     element.classList.remove("success");
//     element.classList.remove("error");

//     if (type) {
//       element.classList.add(type);
//     }
//   }

//   function setFinalSubmitMessage(message, type) {
//     setStatus(emailOtpStatus, message, type);

//     if (mobileOtpStatus) {
//       mobileOtpStatus.textContent =
//         type === "success"
//           ? "Application submitted successfully."
//           : "Please check the application submission status.";
//       mobileOtpStatus.classList.remove("success");
//       mobileOtpStatus.classList.remove("error");

//       if (type) {
//         mobileOtpStatus.classList.add(type);
//       }
//     }
//   }

//   function setupCourseDropdown() {
//     const courseInput = document.getElementById("courseSearchInput");
//     const courseValue = document.getElementById("courseName");
//     const courseOptions = document.getElementById("courseOptions");

//     if (!courseInput || !courseValue || !courseOptions) return;

//     courseInput.addEventListener("click", function () {
//       courseOptions.classList.toggle("show");
//     });

//     courseOptions.addEventListener("click", function (event) {
//       const selectedOption = event.target.closest(".course-option");
//       if (!selectedOption) return;

//       const selectedValue = selectedOption.getAttribute("data-value");
//       courseInput.value = selectedValue;
//       courseValue.value = selectedValue;
//       courseOptions.classList.remove("show");
//     });

//     document.addEventListener("click", function (event) {
//       const isInsideDropdown = event.target.closest(".custom-course-dropdown");

//       if (!isInsideDropdown) {
//         courseOptions.classList.remove("show");
//       }
//     });
//   }

//   function calculateAge(dobValue) {
//     if (!dobValue) return "";

//     const today = new Date();
//     const birthDate = new Date(dobValue);

//     let calculatedAge = today.getFullYear() - birthDate.getFullYear();
//     const monthDifference = today.getMonth() - birthDate.getMonth();

//     if (
//       monthDifference < 0 ||
//       (monthDifference === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       calculatedAge--;
//     }

//     return calculatedAge >= 0 ? calculatedAge : "";
//   }

//   function setupAgeCalculation() {
//     if (!dob || !age) return;

//     dob.addEventListener("change", function () {
//       age.value = calculateAge(this.value);
//     });
//   }

//   function setupSameAddress() {
//     if (!sameAddress || !presentAddress || !permanentAddress) return;

//     sameAddress.addEventListener("change", function () {
//       if (this.value === "Yes") {
//         permanentAddress.value = presentAddress.value;
//         permanentAddress.setAttribute("readonly", "readonly");
//       } else {
//         permanentAddress.value = "";
//         permanentAddress.removeAttribute("readonly");
//       }
//     });

//     presentAddress.addEventListener("input", function () {
//       if (sameAddress.value === "Yes") {
//         permanentAddress.value = this.value;
//       }
//     });
//   }

//   function setupPinCodeAutoFill() {
//     if (!pinCode || !state || !district || !pinStatus) return;

//     pinCode.addEventListener("input", async function () {
//       const enteredPin = this.value.trim();

//       state.value = "";
//       district.value = "";
//       pinStatus.textContent = "";
//       pinStatus.classList.remove("error");

//       if (!/^[0-9]{6}$/.test(enteredPin)) return;

//       try {
//         pinStatus.textContent = "Fetching state and district...";

//         const response = await fetch(
//           "https://api.postalpincode.in/pincode/" + enteredPin
//         );

//         const data = await response.json();

//         if (
//           data &&
//           data[0] &&
//           data[0].Status === "Success" &&
//           data[0].PostOffice &&
//           data[0].PostOffice.length > 0
//         ) {
//           const postOffice = data[0].PostOffice[0];

//           state.value = postOffice.State || "";
//           district.value = postOffice.District || "";
//           pinStatus.textContent = "State and district filled automatically.";
//         } else {
//           pinStatus.textContent = "Invalid pin code. Please check and enter again.";
//           pinStatus.classList.add("error");
//         }
//       } catch (error) {
//         pinStatus.textContent =
//           "Unable to fetch details. Please enter state and district manually.";
//         pinStatus.classList.add("error");
//       }
//     });
//   }

//   function setupEducationLevel() {
//     if (!academicLevel || !educationCourse || !educationSubjects) return;

//     academicLevel.addEventListener("change", function () {
//       if (this.value === "8th Standard") {
//         educationCourse.placeholder = "Example: 8th Standard";
//         educationSubjects.placeholder =
//           "Example: Tamil, English, Maths, Science, Social Science";
//       }

//       if (this.value === "10th Standard") {
//         educationCourse.placeholder = "Example: SSC / X / Matric";
//         educationSubjects.placeholder =
//           "Example: Tamil, English, Maths, Science, Social Science";
//       }

//       if (this.value === "12th Standard") {
//         educationCourse.placeholder = "Example: HSC / XII";
//         educationSubjects.placeholder =
//           "Example: Physics, Chemistry, Biology, Maths / Commerce, Accountancy";
//       }

//       educationCourse.value = "";
//       educationSubjects.value = "";
//     });
//   }

//   function setupFilePreview() {
//     uploadFields.forEach(function (fieldId) {
//       const input = document.getElementById(fieldId);
//       const preview = document.getElementById(fieldId + "Preview");

//       if (!input || !preview) return;

//       input.addEventListener("change", function () {
//         preview.innerHTML = "";

//         const file = this.files[0];
//         if (!file) return;

//         const fileUrl = URL.createObjectURL(file);

//         const viewLink = document.createElement("a");
//         viewLink.href = fileUrl;
//         viewLink.target = "_blank";
//         viewLink.textContent = "View File";
//         preview.appendChild(viewLink);

//         if (file.type.startsWith("image/")) {
//           const image = document.createElement("img");
//           image.src = fileUrl;
//           image.alt = file.name;
//           preview.appendChild(image);
//         }
//       });
//     });
//   }

//   function validateCourse() {
//     const courseValue = document.getElementById("courseName");

//     if (!courseValue || courseValue.value.trim() === "") {
//       alert("Please select a course.");
//       return false;
//     }

//     return true;
//   }

//   function validateMobile() {
//     const mobile = document.getElementById("mobile");

//     if (!mobile) return true;

//     if (!/^[0-9]{10}$/.test(mobile.value.trim())) {
//       alert("Please enter a valid 10 digit mobile number.");
//       mobile.focus();
//       return false;
//     }

//     return true;
//   }

//   function validatePinCode() {
//     if (!pinCode) return true;

//     if (!/^[0-9]{6}$/.test(pinCode.value.trim())) {
//       alert("Please enter a valid 6 digit pin code.");
//       pinCode.focus();
//       return false;
//     }

//     return true;
//   }

//   function validateAadhaar() {
//     const hasAadhaar = document.getElementById("hasAadhaar");
//     const aadhaarNumber = document.getElementById("aadhaarNumber");

//     if (!hasAadhaar || !aadhaarNumber) return true;

//     if (
//       hasAadhaar.value === "Yes" &&
//       !/^[0-9]{12}$/.test(aadhaarNumber.value.trim())
//     ) {
//       alert("Please enter a valid 12 digit Aadhaar number.");
//       aadhaarNumber.focus();
//       return false;
//     }

//     return true;
//   }

//   function validateEducationDetails() {
//     const educationBoard = document.getElementById("educationBoard");
//     const educationYear = document.getElementById("educationYear");
//     const educationGrade = document.getElementById("educationGrade");

//     if (!academicLevel || academicLevel.value.trim() === "") {
//       alert("Please select academic level.");
//       academicLevel.focus();
//       return false;
//     }

//     if (!educationCourse || educationCourse.value.trim() === "") {
//       alert("Please enter qualification / name of course.");
//       educationCourse.focus();
//       return false;
//     }

//     if (!educationBoard || educationBoard.value.trim() === "") {
//       alert("Please enter university / board.");
//       educationBoard.focus();
//       return false;
//     }

//     if (!educationSubjects || educationSubjects.value.trim() === "") {
//       alert("Please enter subjects.");
//       educationSubjects.focus();
//       return false;
//     }

//     if (!educationYear || !/^[0-9]{4}$/.test(educationYear.value.trim())) {
//       alert("Please enter a valid year of passing.");
//       educationYear.focus();
//       return false;
//     }

//     if (!educationGrade || educationGrade.value.trim() === "") {
//       alert("Please enter grade / percentage.");
//       educationGrade.focus();
//       return false;
//     }

//     return true;
//   }

//   function validateUploadedFiles() {
//     const photoUpload = document.getElementById("photoUpload");
//     const aadhaarUpload = document.getElementById("aadhaarUpload");
//     const educationCertificateUpload = document.getElementById(
//       "educationCertificateUpload"
//     );

//     if (!photoUpload || !photoUpload.files.length) {
//       alert("Please upload passport size photo.");
//       if (photoUpload) photoUpload.focus();
//       return false;
//     }

//     if (!aadhaarUpload || !aadhaarUpload.files.length) {
//       alert("Please upload Aadhaar card.");
//       if (aadhaarUpload) aadhaarUpload.focus();
//       return false;
//     }

//     if (!educationCertificateUpload || !educationCertificateUpload.files.length) {
//       alert("Please upload education certificate.");
//       if (educationCertificateUpload) educationCertificateUpload.focus();
//       return false;
//     }

//     return true;
//   }

//   function validateOtpVerification() {
//     if (!isEmailOtpVerified) {
//       setFinalSubmitMessage("Please verify email OTP before final submission.", "error");
//       return false;
//     }

//     if (!isMobileOtpVerified) {
//       setFinalSubmitMessage("Please verify mobile OTP before final submission.", "error");
//       return false;
//     }

//     return true;
//   }

//   function validateMainFormBeforeOtp() {
//     if (!validateCourse()) return false;
//     if (!validateMobile()) return false;
//     if (!validatePinCode()) return false;
//     if (!validateAadhaar()) return false;
//     if (!validateEducationDetails()) return false;
//     if (!validateUploadedFiles()) return false;

//     if (!emailInput || emailInput.value.trim() === "") {
//       alert("Please enter email address.");
//       emailInput.focus();
//       return false;
//     }

//     return true;
//   }

//   function clearPreviews() {
//     uploadFields.forEach(function (fieldId) {
//       const preview = document.getElementById(fieldId + "Preview");

//       if (preview) {
//         preview.innerHTML = "";
//       }
//     });
//   }

//   function resetCourseDropdown() {
//     const courseInput = document.getElementById("courseSearchInput");
//     const courseValue = document.getElementById("courseName");

//     if (courseInput) courseInput.value = "";
//     if (courseValue) courseValue.value = "";
//   }

//   function resetOtpSection() {
//     isEmailOtpVerified = false;
//     isMobileOtpVerified = false;

//     if (emailOtpInput) emailOtpInput.value = "";
//     if (mobileOtpInput) mobileOtpInput.value = "";

//     setStatus(emailOtpStatus, "Email OTP not verified.", null);
//     setStatus(mobileOtpStatus, "Mobile OTP not verified.", null);

//     if (otpSection) {
//       otpSection.classList.remove("show");
//     }

//     if (submitButton) {
//       submitButton.disabled = false;
//       submitButton.textContent = "Submit Application";
//     }

//     if (finalVerifySubmitBtn) {
//       finalVerifySubmitBtn.disabled = false;
//       finalVerifySubmitBtn.textContent = "Verify OTP & Submit Final Application";
//     }
//   }

//   function blockOtpPaste(input, statusElement) {
//     if (!input) return;

//     input.setAttribute("autocomplete", "off");
//     input.setAttribute("inputmode", "numeric");
//     input.setAttribute("pattern", "[0-9]*");

//     input.addEventListener("paste", function (event) {
//       event.preventDefault();

//       setStatus(
//         statusElement,
//         "Copy-paste is not allowed. Please type the OTP manually.",
//         "error"
//       );
//     });

//     input.addEventListener("drop", function (event) {
//       event.preventDefault();
//     });

//     input.addEventListener("contextmenu", function (event) {
//       event.preventDefault();
//     });

//     input.addEventListener("keydown", function (event) {
//       const allowedKeys = [
//         "Backspace",
//         "Delete",
//         "ArrowLeft",
//         "ArrowRight",
//         "Tab",
//         "Home",
//         "End"
//       ];

//       if (allowedKeys.includes(event.key)) {
//         return;
//       }

//       if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
//         return;
//       }

//       if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c") {
//         return;
//       }

//       if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "x") {
//         return;
//       }

//       if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v") {
//         event.preventDefault();

//         setStatus(
//           statusElement,
//           "Copy-paste is not allowed. Please type the OTP manually.",
//           "error"
//         );

//         return;
//       }

//       if (!/^[0-9]$/.test(event.key)) {
//         event.preventDefault();
//         return;
//       }

//       if (this.value.length >= 6) {
//         event.preventDefault();
//       }
//     });

//     input.addEventListener("input", function () {
//       this.value = this.value.replace(/[^0-9]/g, "").slice(0, 6);
//     });
//   }

//   async function sendEmailOtp() {
//     const email = emailInput.value.trim();
//     const mobile = mobileInput.value.trim();

//     if (!email) {
//       setStatus(emailOtpStatus, "Please enter email address first.", "error");
//       emailInput.focus();
//       return false;
//     }

//     if (!/^[0-9]{10}$/.test(mobile)) {
//       setStatus(
//         emailOtpStatus,
//         "Please enter a valid 10 digit mobile number first.",
//         "error"
//       );
//       mobileInput.focus();
//       return false;
//     }

//     try {
//       sendEmailOtpBtn.disabled = true;
//       sendEmailOtpBtn.textContent = "Sending...";
//       setStatus(emailOtpStatus, "Sending email OTP...", null);

//       const response = await fetch(`${API_BASE_URL}/send-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: email,
//           mobile: mobile
//         })
//       });

//       const result = await readJsonResponse(
//         response,
//         "Send OTP API returned an invalid response."
//       );

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to send email OTP.");
//       }

//       isEmailOtpVerified = false;
//       emailOtpInput.value = "";

//       setStatus(
//         emailOtpStatus,
//         "Email OTP sent successfully. Please check your email inbox or spam folder.",
//         "success"
//       );

//       return true;
//     } catch (error) {
//       console.error("Email OTP send error:", error);

//       isEmailOtpVerified = false;

//       setStatus(
//         emailOtpStatus,
//         error.message || "Email OTP sending failed. Please check backend API.",
//         "error"
//       );

//       return false;
//     } finally {
//       sendEmailOtpBtn.disabled = false;
//       sendEmailOtpBtn.textContent = "Resend Email OTP";
//     }
//   }

//   async function verifyEmailOtp() {
//     const email = emailInput.value.trim();
//     const otp = emailOtpInput.value.trim();

//     if (!email) {
//       setStatus(emailOtpStatus, "Please enter email address first.", "error");
//       emailInput.focus();
//       return false;
//     }

//     if (!/^[0-9]{6}$/.test(otp)) {
//       setStatus(emailOtpStatus, "Please type the 6 digit email OTP.", "error");
//       emailOtpInput.focus();
//       return false;
//     }

//     try {
//       verifyEmailOtpBtn.disabled = true;
//       verifyEmailOtpBtn.textContent = "Verifying...";

//       const response = await fetch(`${API_BASE_URL}/verify-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: email,
//           otp: otp
//         })
//       });

//       const result = await readJsonResponse(
//         response,
//         "Verify OTP API returned an invalid response."
//       );

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Invalid email OTP.");
//       }

//       isEmailOtpVerified = true;

//       setStatus(emailOtpStatus, "Email OTP verified successfully.", "success");

//       return true;
//     } catch (error) {
//       console.error("Email OTP verify error:", error);

//       isEmailOtpVerified = false;

//       setStatus(
//         emailOtpStatus,
//         error.message || "Invalid email OTP.",
//         "error"
//       );

//       return false;
//     } finally {
//       verifyEmailOtpBtn.disabled = false;
//       verifyEmailOtpBtn.textContent = "Verify";
//     }
//   }

//   function sendDummyMobileOtp() {
//     const mobile = mobileInput.value.trim();

//     if (!/^[0-9]{10}$/.test(mobile)) {
//       setStatus(
//         mobileOtpStatus,
//         "Please enter a valid 10 digit mobile number first.",
//         "error"
//       );
//       mobileInput.focus();
//       return false;
//     }

//     isMobileOtpVerified = false;
//     mobileOtpInput.value = "";

//     setStatus(
//       mobileOtpStatus,
//       "Dummy mobile OTP sent. Please type 123456 manually.",
//       null
//     );

//     return true;
//   }

//   function verifyDummyMobileOtp() {
//     const enteredOtp = mobileOtpInput.value.trim();

//     if (!/^[0-9]{6}$/.test(enteredOtp)) {
//       setStatus(mobileOtpStatus, "Please type the 6 digit mobile OTP.", "error");
//       mobileOtpInput.focus();
//       return false;
//     }

//     if (enteredOtp === DUMMY_MOBILE_OTP) {
//       isMobileOtpVerified = true;
//       setStatus(mobileOtpStatus, "Mobile OTP verified successfully.", "success");
//       return true;
//     }

//     isMobileOtpVerified = false;
//     setStatus(mobileOtpStatus, "Invalid mobile OTP. Please type 123456.", "error");
//     return false;
//   }

//   async function submitFinalApplication() {
//     if (!validateOtpVerification()) return;

//     const originalButtonText = finalVerifySubmitBtn.textContent;

//     try {
//       finalVerifySubmitBtn.disabled = true;
//       finalVerifySubmitBtn.textContent = "Submitting...";

//       const formData = new FormData(form);

//       if (!formData.get("applicationNo")) {
//         formData.set(
//           "applicationNo",
//           applicationNo.value || generateApplicationNo()
//         );
//       }

//       formData.set("emailOtpVerified", "true");
//       formData.set("mobileOtpType", "dummy");
//       formData.set("mobileOtpVerified", "true");

//       const response = await fetch(`${API_BASE_URL}/admissions`, {
//         method: "POST",
//         body: formData
//       });

//       const result = await readJsonResponse(
//         response,
//         "Admission submit API returned an invalid response."
//       );

//       if (!response.ok || !result.success) {
//         throw new Error(result.message || "Failed to submit admission form.");
//       }

//       const submittedApplicationNo =
//         formData.get("applicationNo") || applicationNo.value;

//       setFinalSubmitMessage(
//         "Application submitted successfully. Your Application No. is " +
//           submittedApplicationNo +
//           ". Admin notification email has been sent.",
//         "success"
//       );

//       finalVerifySubmitBtn.textContent = "Application Submitted";
//       finalVerifySubmitBtn.disabled = true;

//       if (submitButton) {
//         submitButton.textContent = "Application Submitted";
//         submitButton.disabled = true;
//       }

//       setTimeout(function () {
//         form.reset();
//         clearPreviews();
//         resetCourseDropdown();
//         resetOtpSection();

//         if (applicationNo) {
//           applicationNo.value = generateApplicationNo();
//         }

//         if (pinStatus) {
//           pinStatus.textContent = "";
//           pinStatus.classList.remove("error");
//         }

//         if (otpSection) {
//           otpSection.classList.remove("show");
//         }

//         window.scrollTo({
//           top: 0,
//           behavior: "smooth"
//         });
//       }, 3500);
//     } catch (error) {
//       console.error("Final submit error:", error);

//       setFinalSubmitMessage(
//         error.message || "Failed to submit admission form. Please try again.",
//         "error"
//       );

//       finalVerifySubmitBtn.disabled = false;
//       finalVerifySubmitBtn.textContent = originalButtonText;
//     }
//   }

//   function setupOtpVerification() {
//     if (
//       !sendEmailOtpBtn ||
//       !verifyEmailOtpBtn ||
//       !emailOtpInput ||
//       !emailOtpStatus ||
//       !sendMobileOtpBtn ||
//       !verifyMobileOtpBtn ||
//       !mobileOtpInput ||
//       !mobileOtpStatus ||
//       !emailInput ||
//       !mobileInput ||
//       !finalVerifySubmitBtn
//     ) {
//       console.error("OTP elements missing. Please check admission-online.html IDs.");
//       return;
//     }

//     sendEmailOtpBtn.type = "button";
//     verifyEmailOtpBtn.type = "button";
//     sendMobileOtpBtn.type = "button";
//     verifyMobileOtpBtn.type = "button";
//     finalVerifySubmitBtn.type = "button";

//     blockOtpPaste(emailOtpInput, emailOtpStatus);
//     blockOtpPaste(mobileOtpInput, mobileOtpStatus);

//     sendEmailOtpBtn.addEventListener("click", async function () {
//       await sendEmailOtp();
//     });

//     verifyEmailOtpBtn.addEventListener("click", async function () {
//       await verifyEmailOtp();
//     });

//     sendMobileOtpBtn.addEventListener("click", function () {
//       sendDummyMobileOtp();
//     });

//     verifyMobileOtpBtn.addEventListener("click", function () {
//       verifyDummyMobileOtp();
//     });

//     finalVerifySubmitBtn.addEventListener("click", async function () {
//       await submitFinalApplication();
//     });

//     emailInput.addEventListener("input", function () {
//       isEmailOtpVerified = false;
//       emailOtpInput.value = "";
//       setStatus(emailOtpStatus, "Email OTP not verified.", null);
//     });

//     mobileInput.addEventListener("input", function () {
//       isMobileOtpVerified = false;
//       mobileOtpInput.value = "";
//       setStatus(mobileOtpStatus, "Mobile OTP not verified.", null);
//     });
//   }

//   function setupSubmit() {
//     if (!form) return;

//     form.addEventListener("submit", async function (event) {
//       event.preventDefault();

//       if (!validateMainFormBeforeOtp()) return;

//       if (otpSection) {
//         otpSection.classList.add("show");

//         setTimeout(function () {
//           otpSection.scrollIntoView({
//             behavior: "smooth",
//             block: "center"
//           });
//         }, 100);
//       }

//       if (submitButton) {
//         submitButton.disabled = true;
//         submitButton.textContent = "OTP Verification Required";
//       }

//       sendDummyMobileOtp();
//       await sendEmailOtp();
//     });
//   }

//   function setupResetButton() {
//     if (!form) return;

//     const resetButton = form.querySelector(".reset-btn");

//     if (!resetButton) return;

//     resetButton.addEventListener("click", function () {
//       setTimeout(function () {
//         clearPreviews();
//         resetCourseDropdown();
//         resetOtpSection();

//         if (applicationNo) {
//           applicationNo.value = generateApplicationNo();
//         }

//         if (pinStatus) {
//           pinStatus.textContent = "";
//           pinStatus.classList.remove("error");
//         }
//       }, 0);
//     });
//   }

//   function setupNumberOnlyFields() {
//     const numberFields = [
//       { id: "mobile", max: 10 },
//       { id: "alternateOne", max: 10 },
//       { id: "alternateTwo", max: 10 },
//       { id: "pinCode", max: 6 },
//       { id: "aadhaarNumber", max: 12 },
//       { id: "educationYear", max: 4 }
//     ];

//     numberFields.forEach(function (field) {
//       const input = document.getElementById(field.id);

//       if (!input) return;

//       input.addEventListener("input", function () {
//         this.value = this.value.replace(/[^0-9]/g, "").slice(0, field.max);
//       });
//     });
//   }

//   function initialize() {
//     if (!form) return;

//     if (applicationNo) {
//       applicationNo.value = generateApplicationNo();
//     }

//     setupCourseDropdown();
//     setupAgeCalculation();
//     setupSameAddress();
//     setupPinCodeAutoFill();
//     setupEducationLevel();
//     setupFilePreview();
//     setupOtpVerification();
//     setupSubmit();
//     setupResetButton();
//     setupNumberOnlyFields();
//   }

//   initialize();
// });

// function goBackToDownloads() {
//   window.location.href = "downloads.html#student";
// }


console.log("ADMISSION JS LOADED - EMAIL OTP AUTO SEND WITHOUT POPUP VERSION");

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

  const submitButton = document.getElementById("submitApplicationBtn");
  const otpSection = document.getElementById("otpSection");

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

 const API_BASE_URL = "https://backend-2kz6.onrender.com/api";
  const DUMMY_MOBILE_OTP = "123456";

  let isEmailOtpVerified = false;
  let isMobileOtpVerified = false;

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

  async function readJsonResponse(response, fallbackMessage) {
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch (error) {
      console.log("NON JSON RESPONSE:", text);
      throw new Error(fallbackMessage);
    }
  }

  function setStatus(element, message, type) {
    if (!element) return;

    element.textContent = message;
    element.classList.remove("success");
    element.classList.remove("error");

    if (type) {
      element.classList.add(type);
    }
  }

  function setFinalSubmitMessage(message, type) {
    setStatus(emailOtpStatus, message, type);

    if (mobileOtpStatus) {
      mobileOtpStatus.textContent =
        type === "success"
          ? "Application submitted successfully."
          : "Please check the application submission status.";

      mobileOtpStatus.classList.remove("success");
      mobileOtpStatus.classList.remove("error");

      if (type) {
        mobileOtpStatus.classList.add(type);
      }
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

    const fallbackPinData = {
      "604001": {
        state: "Tamil Nadu",
        district: "Viluppuram"
      },
      "632501": {
        state: "Tamil Nadu",
        district: "Ranipet"
      },
      "600001": {
        state: "Tamil Nadu",
        district: "Chennai"
      },
      "602001": {
        state: "Tamil Nadu",
        district: "Tiruvallur"
      },
      "631001": {
        state: "Tamil Nadu",
        district: "Ranipet"
      },
      "631102": {
        state: "Tamil Nadu",
        district: "Ranipet"
      }
    };

    state.removeAttribute("readonly");
    district.removeAttribute("readonly");

    pinCode.addEventListener("input", async function () {
      const enteredPin = this.value.trim();

      state.value = "";
      district.value = "";
      pinStatus.textContent = "";
      pinStatus.classList.remove("error");

      state.removeAttribute("readonly");
      district.removeAttribute("readonly");

      if (!/^[0-9]{6}$/.test(enteredPin)) {
        return;
      }

      if (fallbackPinData[enteredPin]) {
        state.value = fallbackPinData[enteredPin].state;
        district.value = fallbackPinData[enteredPin].district;
        pinStatus.textContent = "State and district filled automatically.";
        pinStatus.classList.remove("error");
        return;
      }

      try {
        pinStatus.textContent = "Fetching state and district...";

        const response = await fetch(
          "https://api.postalpincode.in/pincode/" + enteredPin
        );

        if (!response.ok) {
          throw new Error("Pin code API failed.");
        }

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
          pinStatus.classList.remove("error");
        } else {
          pinStatus.textContent =
            "Invalid pin code. Please enter state and district manually.";
          pinStatus.classList.add("error");

          state.value = "";
          district.value = "";
          state.removeAttribute("readonly");
          district.removeAttribute("readonly");
        }
      } catch (error) {
        console.error("Pin code fetch error:", error);

        pinStatus.textContent =
          "Unable to fetch details. Please enter state and district manually.";
        pinStatus.classList.add("error");

        state.value = "";
        district.value = "";
        state.removeAttribute("readonly");
        district.removeAttribute("readonly");
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

    if (!photoUpload || !photoUpload.files.length) {
      alert("Please upload passport size photo.");
      if (photoUpload) photoUpload.focus();
      return false;
    }

    if (!aadhaarUpload || !aadhaarUpload.files.length) {
      alert("Please upload Aadhaar card.");
      if (aadhaarUpload) aadhaarUpload.focus();
      return false;
    }

    if (!educationCertificateUpload || !educationCertificateUpload.files.length) {
      alert("Please upload education certificate.");
      if (educationCertificateUpload) educationCertificateUpload.focus();
      return false;
    }

    return true;
  }

  function validateOtpVerification() {
    if (!isEmailOtpVerified) {
      setFinalSubmitMessage("Please verify email OTP before final submission.", "error");
      return false;
    }

    if (!isMobileOtpVerified) {
      setFinalSubmitMessage("Please verify mobile OTP before final submission.", "error");
      return false;
    }

    return true;
  }

  function validateMainFormBeforeOtp() {
    if (!validateCourse()) return false;
    if (!validateMobile()) return false;
    if (!validatePinCode()) return false;
    if (!validateAadhaar()) return false;
    if (!validateEducationDetails()) return false;
    if (!validateUploadedFiles()) return false;

    if (!emailInput || emailInput.value.trim() === "") {
      alert("Please enter email address.");
      emailInput.focus();
      return false;
    }

    return true;
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
    isEmailOtpVerified = false;
    isMobileOtpVerified = false;

    if (emailOtpInput) emailOtpInput.value = "";
    if (mobileOtpInput) mobileOtpInput.value = "";

    setStatus(emailOtpStatus, "Email OTP not verified.", null);
    setStatus(mobileOtpStatus, "Mobile OTP not verified.", null);

    if (otpSection) {
      otpSection.classList.remove("show");
    }

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Application";
    }

    if (finalVerifySubmitBtn) {
      finalVerifySubmitBtn.disabled = false;
      finalVerifySubmitBtn.textContent = "Verify OTP & Submit Final Application";
    }
  }

  function blockOtpPaste(input, statusElement) {
    if (!input) return;

    input.setAttribute("autocomplete", "off");
    input.setAttribute("inputmode", "numeric");
    input.setAttribute("pattern", "[0-9]*");

    input.addEventListener("paste", function (event) {
      event.preventDefault();

      setStatus(
        statusElement,
        "Copy-paste is not allowed. Please type the OTP manually.",
        "error"
      );
    });

    input.addEventListener("drop", function (event) {
      event.preventDefault();
    });

    input.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });

    input.addEventListener("keydown", function (event) {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Home",
        "End"
      ];

      if (allowedKeys.includes(event.key)) {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c") {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "x") {
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v") {
        event.preventDefault();

        setStatus(
          statusElement,
          "Copy-paste is not allowed. Please type the OTP manually.",
          "error"
        );

        return;
      }

      if (!/^[0-9]$/.test(event.key)) {
        event.preventDefault();
        return;
      }

      if (this.value.length >= 6) {
        event.preventDefault();
      }
    });

    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 6);
    });
  }

  async function sendEmailOtp() {
    const email = emailInput.value.trim();
    const mobile = mobileInput.value.trim();

    if (!email) {
      setStatus(emailOtpStatus, "Please enter email address first.", "error");
      emailInput.focus();
      return false;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      setStatus(
        emailOtpStatus,
        "Please enter a valid 10 digit mobile number first.",
        "error"
      );
      mobileInput.focus();
      return false;
    }

    try {
      sendEmailOtpBtn.disabled = true;
      sendEmailOtpBtn.textContent = "Sending...";
      setStatus(emailOtpStatus, "Sending email OTP...", null);

      const response = await fetch(`${API_BASE_URL}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          mobile: mobile
        })
      });

      const result = await readJsonResponse(
        response,
        "Send OTP API returned an invalid response."
      );

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to send email OTP.");
      }

      isEmailOtpVerified = false;
      emailOtpInput.value = "";

      setStatus(
        emailOtpStatus,
        "Email OTP sent successfully. Please check your email inbox or spam folder.",
        "success"
      );

      return true;
    } catch (error) {
      console.error("Email OTP send error:", error);

      isEmailOtpVerified = false;

      setStatus(
        emailOtpStatus,
        error.message || "Email OTP sending failed. Please check backend API.",
        "error"
      );

      return false;
    } finally {
      sendEmailOtpBtn.disabled = false;
      sendEmailOtpBtn.textContent = "Resend Email OTP";
    }
  }

  async function verifyEmailOtp() {
    const email = emailInput.value.trim();
    const otp = emailOtpInput.value.trim();

    if (!email) {
      setStatus(emailOtpStatus, "Please enter email address first.", "error");
      emailInput.focus();
      return false;
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      setStatus(emailOtpStatus, "Please type the 6 digit email OTP.", "error");
      emailOtpInput.focus();
      return false;
    }

    try {
      verifyEmailOtpBtn.disabled = true;
      verifyEmailOtpBtn.textContent = "Verifying...";

      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          otp: otp
        })
      });

      const result = await readJsonResponse(
        response,
        "Verify OTP API returned an invalid response."
      );

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Invalid email OTP.");
      }

      isEmailOtpVerified = true;

      setStatus(emailOtpStatus, "Email OTP verified successfully.", "success");

      return true;
    } catch (error) {
      console.error("Email OTP verify error:", error);

      isEmailOtpVerified = false;

      setStatus(
        emailOtpStatus,
        error.message || "Invalid email OTP.",
        "error"
      );

      return false;
    } finally {
      verifyEmailOtpBtn.disabled = false;
      verifyEmailOtpBtn.textContent = "Verify";
    }
  }

  function sendDummyMobileOtp() {
    const mobile = mobileInput.value.trim();

    if (!/^[0-9]{10}$/.test(mobile)) {
      setStatus(
        mobileOtpStatus,
        "Please enter a valid 10 digit mobile number first.",
        "error"
      );
      mobileInput.focus();
      return false;
    }

    isMobileOtpVerified = false;
    mobileOtpInput.value = "";

    setStatus(
      mobileOtpStatus,
      "Dummy mobile OTP sent. Please type 123456 manually.",
      null
    );

    return true;
  }

  function verifyDummyMobileOtp() {
    const enteredOtp = mobileOtpInput.value.trim();

    if (!/^[0-9]{6}$/.test(enteredOtp)) {
      setStatus(mobileOtpStatus, "Please type the 6 digit mobile OTP.", "error");
      mobileOtpInput.focus();
      return false;
    }

    if (enteredOtp === DUMMY_MOBILE_OTP) {
      isMobileOtpVerified = true;
      setStatus(mobileOtpStatus, "Mobile OTP verified successfully.", "success");
      return true;
    }

    isMobileOtpVerified = false;
    setStatus(mobileOtpStatus, "Invalid mobile OTP. Please type 123456.", "error");
    return false;
  }

  async function submitFinalApplication() {
    if (!validateOtpVerification()) return;

    const originalButtonText = finalVerifySubmitBtn.textContent;

    try {
      finalVerifySubmitBtn.disabled = true;
      finalVerifySubmitBtn.textContent = "Submitting...";

      const formData = new FormData(form);

      if (!formData.get("applicationNo")) {
        formData.set(
          "applicationNo",
          applicationNo.value || generateApplicationNo()
        );
      }

      formData.set("emailOtpVerified", "true");
      formData.set("mobileOtpType", "dummy");
      formData.set("mobileOtpVerified", "true");

      const response = await fetch(`${API_BASE_URL}/admissions`, {
        method: "POST",
        body: formData
      });

      const result = await readJsonResponse(
        response,
        "Admission submit API returned an invalid response."
      );

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to submit admission form.");
      }

      const submittedApplicationNo =
        formData.get("applicationNo") || applicationNo.value;

      setFinalSubmitMessage(
        "Application submitted successfully. Your Application No. is " +
          submittedApplicationNo +
          ". Admin notification email has been sent.",
        "success"
      );

      finalVerifySubmitBtn.textContent = "Application Submitted";
      finalVerifySubmitBtn.disabled = true;

      if (submitButton) {
        submitButton.textContent = "Application Submitted";
        submitButton.disabled = true;
      }

      setTimeout(function () {
        form.reset();
        clearPreviews();
        resetCourseDropdown();
        resetOtpSection();

        if (applicationNo) {
          applicationNo.value = generateApplicationNo();
        }

        if (pinStatus) {
          pinStatus.textContent = "";
          pinStatus.classList.remove("error");
        }

        if (otpSection) {
          otpSection.classList.remove("show");
        }

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 3500);
    } catch (error) {
      console.error("Final submit error:", error);

      setFinalSubmitMessage(
        error.message || "Failed to submit admission form. Please try again.",
        "error"
      );

      finalVerifySubmitBtn.disabled = false;
      finalVerifySubmitBtn.textContent = originalButtonText;
    }
  }

  function setupOtpVerification() {
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
      console.error("OTP elements missing. Please check admission-online.html IDs.");
      return;
    }

    sendEmailOtpBtn.type = "button";
    verifyEmailOtpBtn.type = "button";
    sendMobileOtpBtn.type = "button";
    verifyMobileOtpBtn.type = "button";
    finalVerifySubmitBtn.type = "button";

    blockOtpPaste(emailOtpInput, emailOtpStatus);
    blockOtpPaste(mobileOtpInput, mobileOtpStatus);

    sendEmailOtpBtn.addEventListener("click", async function () {
      await sendEmailOtp();
    });

    verifyEmailOtpBtn.addEventListener("click", async function () {
      await verifyEmailOtp();
    });

    sendMobileOtpBtn.addEventListener("click", function () {
      sendDummyMobileOtp();
    });

    verifyMobileOtpBtn.addEventListener("click", function () {
      verifyDummyMobileOtp();
    });

    finalVerifySubmitBtn.addEventListener("click", async function () {
      await submitFinalApplication();
    });

    emailInput.addEventListener("input", function () {
      isEmailOtpVerified = false;
      emailOtpInput.value = "";
      setStatus(emailOtpStatus, "Email OTP not verified.", null);
    });

    mobileInput.addEventListener("input", function () {
      isMobileOtpVerified = false;
      mobileOtpInput.value = "";
      setStatus(mobileOtpStatus, "Mobile OTP not verified.", null);
    });
  }

  function setupSubmit() {
    if (!form) return;

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (!validateMainFormBeforeOtp()) return;

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

      sendDummyMobileOtp();
      await sendEmailOtp();
    });
  }

  function setupResetButton() {
    if (!form) return;

    const resetButton = form.querySelector(".reset-btn");

    if (!resetButton) return;

    resetButton.addEventListener("click", function () {
      setTimeout(function () {
        clearPreviews();
        resetCourseDropdown();
        resetOtpSection();

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

  function setupNumberOnlyFields() {
    const numberFields = [
      { id: "mobile", max: 10 },
      { id: "alternateOne", max: 10 },
      { id: "alternateTwo", max: 10 },
      { id: "pinCode", max: 6 },
      { id: "aadhaarNumber", max: 12 },
      { id: "educationYear", max: 4 }
    ];

    numberFields.forEach(function (field) {
      const input = document.getElementById(field.id);

      if (!input) return;

      input.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "").slice(0, field.max);
      });
    });
  }

  function initialize() {
    if (!form) return;

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
    setupNumberOnlyFields();
  }

  initialize();
});

function goBackToDownloads() {
  window.location.href = "downloads.html#student";
}