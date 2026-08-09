document.addEventListener("DOMContentLoaded", function () {
  const API_BASE_URL = "https://backend-production-c5cb.up.railway.app";
  const INTERNSHIP_API_URL = `${API_BASE_URL}/api/internships`;

  const form = document.getElementById("internshipForm");
  const enrolmentNumber = document.getElementById("enrolmentNumber");
  const centreCode = document.getElementById("centreCode");
  const studentName = document.getElementById("studentName");
  const fatherName = document.getElementById("fatherName");
  const dateOfBirth = document.getElementById("dateOfBirth");
  const dobHelp = document.getElementById("dobHelp");
  const address = document.getElementById("address");
  const pinCode = document.getElementById("pinCode");
  const phoneNumber = document.getElementById("phoneNumber");
  const email = document.getElementById("email");
  const candidateSignature = document.getElementById("candidateSignature");
  const resetBtn = document.getElementById("resetBtn");
  const submitBtn = document.getElementById("submitBtn");
  const successPopup = document.getElementById("successPopup");
  const popupCloseBtn = document.getElementById("popupCloseBtn");

  function setError(input, errorId, message) {
    const error = document.getElementById(errorId);
    if (input) input.classList.add("input-error");
    if (error) error.textContent = message;
  }

  function clearError(input, errorId) {
    const error = document.getElementById(errorId);
    if (input) input.classList.remove("input-error");
    if (error) error.textContent = "";
  }

  enrolmentNumber.addEventListener("input", function () {
    this.value = this.value.replace(/[^A-Za-z0-9/-]/g, "");
    if (this.value.trim()) {
      clearError(enrolmentNumber, "enrolmentNumberError");
    }
  });

  function validateEnrolmentNumber() {
    const value = enrolmentNumber.value.trim();

    if (!value) {
      setError(
        enrolmentNumber,
        "enrolmentNumberError",
        "Enrolment Number is required."
      );
      return false;
    }

    clearError(enrolmentNumber, "enrolmentNumberError");
    return true;
  }

  centreCode.addEventListener("input", function () {
    this.value = this.value
      .replace(/[^A-Za-z0-9/-]/g, "")
      .toUpperCase();

    if (this.value.trim()) {
      clearError(centreCode, "centreCodeError");
    }
  });

  function validateCentreCode() {
    const value = centreCode.value.trim();

    if (!value) {
      setError(
        centreCode,
        "centreCodeError",
        "Centre Code is required."
      );
      return false;
    }

    clearError(centreCode, "centreCodeError");
    return true;
  }

  function allowNameOnly(input) {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^A-Za-z\s.'-]/g, "");
    });
  }

  allowNameOnly(studentName);
  allowNameOnly(fatherName);

  function validateStudentName() {
    const value = studentName.value.trim();

    if (!value) {
      setError(
        studentName,
        "studentNameError",
        "Student Name is required."
      );
      return false;
    }

    if (value.length < 2) {
      setError(
        studentName,
        "studentNameError",
        "Enter a valid Student Name."
      );
      return false;
    }

    clearError(studentName, "studentNameError");
    return true;
  }

  function validateFatherName() {
    const value = fatherName.value.trim();

    if (!value) {
      setError(
        fatherName,
        "fatherNameError",
        "Father's Name is required."
      );
      return false;
    }

    if (value.length < 2) {
      setError(
        fatherName,
        "fatherNameError",
        "Enter a valid Father's Name."
      );
      return false;
    }

    clearError(fatherName, "fatherNameError");
    return true;
  }

  function validateSex() {
    const selected = document.querySelector('input[name="sex"]:checked');
    const error = document.getElementById("sexError");

    if (!selected) {
      error.textContent = "Please select Sex.";
      return false;
    }

    error.textContent = "";
    return true;
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function configureDOBRange() {
    const today = new Date();

    const latestDOB = new Date(
      today.getFullYear() - 15,
      today.getMonth(),
      today.getDate()
    );

    const earliestDOB = new Date(
      today.getFullYear() - 21,
      today.getMonth(),
      today.getDate()
    );

    earliestDOB.setDate(earliestDOB.getDate() + 1);

    dateOfBirth.min = formatDate(earliestDOB);
    dateOfBirth.max = formatDate(latestDOB);

    if (dobHelp) {
      dobHelp.textContent = "Age must be between 15 and 20 years.";
    }
  }

  configureDOBRange();

  function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  function validateDOB() {
    const value = dateOfBirth.value;

    if (!value) {
      setError(
        dateOfBirth,
        "dateOfBirthError",
        "Date of Birth is required."
      );
      return false;
    }

    const dob = new Date(value + "T00:00:00");

    if (Number.isNaN(dob.getTime())) {
      setError(
        dateOfBirth,
        "dateOfBirthError",
        "Enter a valid Date of Birth."
      );
      return false;
    }

    const age = calculateAge(dob);

    if (age < 15 || age > 20) {
      setError(
        dateOfBirth,
        "dateOfBirthError",
        "Age must be between 15 and 20 years."
      );
      return false;
    }

    if (value < dateOfBirth.min || value > dateOfBirth.max) {
      setError(
        dateOfBirth,
        "dateOfBirthError",
        "Select a valid Date of Birth for age 15 to 20 years."
      );
      return false;
    }

    clearError(dateOfBirth, "dateOfBirthError");
    return true;
  }

  address.addEventListener("input", function () {
    if (this.value.trim().length >= 10) {
      clearError(address, "addressError");
    }
  });

  function validateAddress() {
    const value = address.value.trim();

    if (!value) {
      setError(
        address,
        "addressError",
        "Address for Correspondence is required."
      );
      return false;
    }

    if (value.length < 10) {
      setError(
        address,
        "addressError",
        "Enter the complete correspondence address."
      );
      return false;
    }

    if (!/[A-Za-z]/.test(value)) {
      setError(
        address,
        "addressError",
        "Enter a valid correspondence address."
      );
      return false;
    }

    clearError(address, "addressError");
    return true;
  }

  pinCode.addEventListener("keydown", function (event) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Home",
      "End"
    ];

    if (allowedKeys.includes(event.key)) return;

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      setError(
        pinCode,
        "pinCodeError",
        "Pin Code must contain numbers only."
      );
      return;
    }

    if (this.value.length === 0 && event.key !== "6") {
      event.preventDefault();
      setError(
        pinCode,
        "pinCodeError",
        "Tamil Nadu Pin Code must start with 6."
      );
      return;
    }

    if (
      this.value.length >= 6 &&
      this.selectionStart === this.selectionEnd
    ) {
      event.preventDefault();
    }
  });

  pinCode.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "").slice(0, 6);

    if (value.length > 0 && !value.startsWith("6")) {
      this.value = "";
      setError(
        pinCode,
        "pinCodeError",
        "Tamil Nadu Pin Code must start with 6."
      );
      return;
    }

    this.value = value;

    if (value.length === 0) {
      clearError(pinCode, "pinCodeError");
      return;
    }

    if (value.length < 6) {
      const remaining = 6 - value.length;
      setError(
        pinCode,
        "pinCodeError",
        remaining === 1
          ? "1 digit remaining."
          : `${remaining} digits remaining.`
      );
      return;
    }

    clearError(pinCode, "pinCodeError");
  });

  function validatePinCode() {
    const value = pinCode.value.trim();

    if (!value) {
      setError(pinCode, "pinCodeError", "Pin Code is required.");
      return false;
    }

    if (!/^6[0-9]{5}$/.test(value)) {
      setError(
        pinCode,
        "pinCodeError",
        "Enter a valid 6-digit Tamil Nadu Pin Code."
      );
      return false;
    }

    clearError(pinCode, "pinCodeError");
    return true;
  }

  phoneNumber.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "").slice(0, 10);

    if (value.length > 0 && !/^[6-9]/.test(value)) {
      this.value = "";
      setError(
        phoneNumber,
        "phoneNumberError",
        "Indian mobile number must start with 6, 7, 8, or 9."
      );
      return;
    }

    this.value = value;

    if (!value) {
      clearError(phoneNumber, "phoneNumberError");
      return;
    }

    if (value.length < 10) {
      const remaining = 10 - value.length;

      setError(
        phoneNumber,
        "phoneNumberError",
        remaining === 1
          ? "1 digit remaining."
          : `${remaining} digits remaining.`
      );
      return;
    }

    if (/^(\d)\1{9}$/.test(value)) {
      setError(
        phoneNumber,
        "phoneNumberError",
        "Repeated digits are not accepted as a valid mobile number."
      );
      return;
    }

    const invalidNumbers = [
      "1234567890",
      "9876543210"
    ];

    if (invalidNumbers.includes(value)) {
      setError(
        phoneNumber,
        "phoneNumberError",
        "Enter a valid Indian mobile number."
      );
      return;
    }

    clearError(phoneNumber, "phoneNumberError");
  });

  function validatePhone() {
    const value = phoneNumber.value.trim();

    if (!value) {
      setError(
        phoneNumber,
        "phoneNumberError",
        "Phone Number is required."
      );
      return false;
    }

    if (!/^[6-9][0-9]{9}$/.test(value)) {
      setError(
        phoneNumber,
        "phoneNumberError",
        "Enter a valid 10-digit Indian mobile number."
      );
      return false;
    }

    if (/^(\d)\1{9}$/.test(value)) {
      setError(
        phoneNumber,
        "phoneNumberError",
        "Repeated digits are not accepted as a valid mobile number."
      );
      return false;
    }

    const invalidNumbers = [
      "1234567890",
      "9876543210"
    ];

    if (invalidNumbers.includes(value)) {
      setError(
        phoneNumber,
        "phoneNumberError",
        "Enter a valid Indian mobile number."
      );
      return false;
    }

    clearError(phoneNumber, "phoneNumberError");
    return true;
  }

  email.addEventListener("input", function () {
    const value = this.value;

    if (!value) {
      clearError(email, "emailError");
      return;
    }

    if (/[A-Z]/.test(value)) {
      setError(
        email,
        "emailError",
        "Capital letters are not allowed in Email ID."
      );
      return;
    }

    if (/\s/.test(value)) {
      setError(
        email,
        "emailError",
        "Spaces are not allowed in Email ID."
      );
      return;
    }

    if (/[^a-z0-9@.]/.test(value)) {
      setError(
        email,
        "emailError",
        "Only lowercase letters, numbers, @ and . are allowed."
      );
      return;
    }

    const emailPattern =
      /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/;

    if (emailPattern.test(value)) {
      clearError(email, "emailError");
    }
  });

  function validateEmail() {
    const value = email.value.trim();

    if (!value) {
      setError(
        email,
        "emailError",
        "Email ID is required."
      );
      return false;
    }

    const emailPattern =
      /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/;

    if (!emailPattern.test(value)) {
      setError(
        email,
        "emailError",
        "Enter a valid Email ID, for example name@gmail.com."
      );
      return false;
    }

    clearError(email, "emailError");
    return true;
  }

  function validateCandidateSignature() {
    const error = document.getElementById("candidateSignatureError");
    const file = candidateSignature.files[0];

    if (!file) {
      candidateSignature.classList.add("input-error");
      error.textContent = "Candidate Signature is required.";
      return false;
    }

    const allowedMimeTypes = [
      "image/jpeg",
      "image/png"
    ];

    const fileName = file.name.toLowerCase();

    const validExtension =
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".jpeg") ||
      fileName.endsWith(".png");

    if (
      !allowedMimeTypes.includes(file.type) ||
      !validExtension
    ) {
      candidateSignature.value = "";
      candidateSignature.classList.add("input-error");
      error.textContent =
        "Only JPG, JPEG, and PNG files are allowed.";
      return false;
    }

    const maxFileSize = 5 * 1024 * 1024;

    if (file.size > maxFileSize) {
      candidateSignature.value = "";
      candidateSignature.classList.add("input-error");
      error.textContent =
        "Candidate Signature image must be less than 5 MB.";
      return false;
    }

    candidateSignature.classList.remove("input-error");
    error.textContent = "";
    return true;
  }

  enrolmentNumber.addEventListener(
    "blur",
    validateEnrolmentNumber
  );
  centreCode.addEventListener(
    "blur",
    validateCentreCode
  );
  studentName.addEventListener(
    "blur",
    validateStudentName
  );
  fatherName.addEventListener(
    "blur",
    validateFatherName
  );
  dateOfBirth.addEventListener(
    "change",
    validateDOB
  );
  address.addEventListener(
    "blur",
    validateAddress
  );
  pinCode.addEventListener(
    "blur",
    validatePinCode
  );
  phoneNumber.addEventListener(
    "blur",
    validatePhone
  );
  email.addEventListener(
    "blur",
    validateEmail
  );
  candidateSignature.addEventListener(
    "change",
    validateCandidateSignature
  );

  document
    .querySelectorAll('input[name="sex"]')
    .forEach(function (radio) {
      radio.addEventListener("change", validateSex);
    });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formValid =
      validateEnrolmentNumber() &&
      validateCentreCode() &&
      validateStudentName() &&
      validateFatherName() &&
      validateSex() &&
      validateDOB() &&
      validateAddress() &&
      validatePinCode() &&
      validatePhone() &&
      validateEmail() &&
      validateCandidateSignature();

    if (!formValid) {
      const firstInvalid =
        document.querySelector(".input-error");

      if (firstInvalid) {
        firstInvalid.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

        setTimeout(function () {
          try {
            firstInvalid.focus();
          } catch (error) {
            console.log(error);
          }
        }, 300);
      }

      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    }

    try {
      const formData = new FormData(form);

      const employmentDetails = [
        {
          organizationName:
            formData.get("organization1") || "",
          designation:
            formData.get("designation1") || "",
          joiningDate:
            formData.get("joiningDate1") || "",
          leavingDate:
            formData.get("leavingDate1") || "",
          jobProfile:
            formData.get("jobProfile1") || ""
        },
        {
          organizationName:
            formData.get("organization2") || "",
          designation:
            formData.get("designation2") || "",
          joiningDate:
            formData.get("joiningDate2") || "",
          leavingDate:
            formData.get("leavingDate2") || "",
          jobProfile:
            formData.get("jobProfile2") || ""
        }
      ];

      formData.set(
        "employmentDetails",
        JSON.stringify(employmentDetails)
      );

      console.log(
        "Sending Internship Application to:",
        INTERNSHIP_API_URL
      );

      const response = await fetch(
        INTERNSHIP_API_URL,
        {
          method: "POST",
          body: formData
        }
      );

      let result;

      try {
        result = await response.json();
      } catch (jsonError) {
        throw new Error(
          "Backend returned an invalid response."
        );
      }

      console.log(
        "Internship API Response:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result.message ||
          "Unable to submit internship application."
        );
      }

      if (successPopup) {
        successPopup.classList.add("show");
      }

      form.reset();

      document
        .querySelectorAll(".error")
        .forEach(function (error) {
          error.textContent = "";
        });

      document
        .querySelectorAll(".input-error")
        .forEach(function (input) {
          input.classList.remove("input-error");
        });

      configureDOBRange();

    } catch (error) {
      console.error(
        "INTERNSHIP SUBMIT ERROR:",
        error
      );

      alert(
        error.message ||
        "Unable to submit Internship Application. Please try again."
      );
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Application";
      }
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      const confirmReset = window.confirm(
        "Are you sure you want to clear the form?"
      );

      if (!confirmReset) return;

      form.reset();

      document
        .querySelectorAll(".error")
        .forEach(function (error) {
          error.textContent = "";
        });

      document
        .querySelectorAll(".input-error")
        .forEach(function (input) {
          input.classList.remove("input-error");
        });

      configureDOBRange();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  if (popupCloseBtn && successPopup) {
    popupCloseBtn.addEventListener("click", function () {
      successPopup.classList.remove("show");
    });

    successPopup.addEventListener("click", function (event) {
      if (event.target === successPopup) {
        successPopup.classList.remove("show");
      }
    });
  }
});