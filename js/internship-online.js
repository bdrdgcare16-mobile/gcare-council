document.addEventListener(
  "DOMContentLoaded",
  function () {

    /* =====================================================
       API URL
    ===================================================== */

    const API_BASE_URL =
     "https://backend-production-c5cb.up.railway.app";
    const INTERNSHIP_API_URL =
      `${API_BASE_URL}/api/internships`;


    /* =====================================================
       FORM ELEMENTS
    ===================================================== */

    const form =
      document.getElementById(
        "internshipForm"
      );

    const enrolmentNumber =
      document.getElementById(
        "enrolmentNumber"
      );

    const centreCode =
      document.getElementById(
        "centreCode"
      );

    const studentName =
      document.getElementById(
        "studentName"
      );

    const fatherName =
      document.getElementById(
        "fatherName"
      );

    const dateOfBirth =
      document.getElementById(
        "dateOfBirth"
      );

    const address =
      document.getElementById(
        "address"
      );

    const pinCode =
      document.getElementById(
        "pinCode"
      );

    const phoneNumber =
      document.getElementById(
        "phoneNumber"
      );

    const email =
      document.getElementById(
        "email"
      );

    const candidateSignature =
      document.getElementById(
        "candidateSignature"
      );

    const submitBtn =
      document.getElementById(
        "submitBtn"
      );

    const resetBtn =
      document.getElementById(
        "resetBtn"
      );

    const successPopup =
      document.getElementById(
        "successPopup"
      );

    const popupCloseBtn =
      document.getElementById(
        "popupCloseBtn"
      );


    /* =====================================================
       OTP ELEMENTS
    ===================================================== */

    const sendMobileOtpBtn =
      document.getElementById(
        "sendMobileOtpBtn"
      );

    const mobileOtpPanel =
      document.getElementById(
        "mobileOtpPanel"
      );

    const mobileOtpInput =
      document.getElementById(
        "mobileOtpInput"
      );

    const verifyMobileOtpBtn =
      document.getElementById(
        "verifyMobileOtpBtn"
      );

    const mobileOtpStatus =
      document.getElementById(
        "mobileOtpStatus"
      );


    const sendEmailOtpBtn =
      document.getElementById(
        "sendEmailOtpBtn"
      );

    const emailOtpPanel =
      document.getElementById(
        "emailOtpPanel"
      );

    const emailOtpInput =
      document.getElementById(
        "emailOtpInput"
      );

    const verifyEmailOtpBtn =
      document.getElementById(
        "verifyEmailOtpBtn"
      );

    const emailOtpStatus =
      document.getElementById(
        "emailOtpStatus"
      );


    /* =====================================================
       OTP STATE
    ===================================================== */

    let mobileOtpVerified =
      false;

    let emailOtpVerified =
      false;


    /* =====================================================
       ERROR HELPERS
    ===================================================== */

    function setError(
      input,
      errorId,
      message
    ) {

      const errorElement =
        document.getElementById(
          errorId
        );

      if (
        input
      ) {

        input.classList.add(
          "input-error"
        );

        input.classList.remove(
          "input-valid"
        );

      }

      if (
        errorElement
      ) {

        errorElement.textContent =
          message;

      }

    }


    function clearError(
      input,
      errorId
    ) {

      const errorElement =
        document.getElementById(
          errorId
        );

      if (
        input
      ) {

        input.classList.remove(
          "input-error"
        );

      }

      if (
        errorElement
      ) {

        errorElement.textContent =
          "";

      }

    }


    function markValid(
      input,
      errorId
    ) {

      clearError(
        input,
        errorId
      );

      if (
        input
      ) {

        input.classList.add(
          "input-valid"
        );

      }

    }


    /* =====================================================
       OTP MESSAGE HELPER
    ===================================================== */

    function setOtpStatus(
      element,
      message,
      type
    ) {

      if (
        !element
      ) {
        return;
      }

      element.textContent =
        message || "";

      element.classList.remove(
        "otp-success",
        "otp-error",
        "otp-info"
      );

      if (
        type === "success"
      ) {

        element.classList.add(
          "otp-success"
        );

      } else if (
        type === "error"
      ) {

        element.classList.add(
          "otp-error"
        );

      } else if (
        message
      ) {

        element.classList.add(
          "otp-info"
        );

      }

    }


    /* =====================================================
       SAFE JSON RESPONSE
    ===================================================== */

    async function getResponseJson(
      response
    ) {

      try {

        return await response.json();

      } catch (
        error
      ) {

        return {
          success:
            false,

          message:
            "Invalid response from server."
        };

      }

    }


    /* =====================================================
       ENROLMENT NUMBER
    ===================================================== */

    enrolmentNumber.addEventListener(
      "input",
      function () {

        this.value =
          this.value.replace(
            /[^A-Za-z0-9/-]/g,
            ""
          );

        if (
          this.value.trim()
        ) {

          clearError(
            enrolmentNumber,
            "enrolmentNumberError"
          );

        }

      }
    );


    function validateEnrolmentNumber() {

      const value =
        enrolmentNumber.value.trim();

      if (
        !value
      ) {

        setError(
          enrolmentNumber,
          "enrolmentNumberError",
          "Enrolment Number is required."
        );

        return false;

      }

      markValid(
        enrolmentNumber,
        "enrolmentNumberError"
      );

      return true;

    }


    /* =====================================================
       CENTRE CODE
    ===================================================== */

    centreCode.addEventListener(
      "input",
      function () {

        this.value =
          this.value.replace(
            /[^A-Za-z0-9/-]/g,
            ""
          );

        if (
          this.value.trim()
        ) {

          clearError(
            centreCode,
            "centreCodeError"
          );

        }

      }
    );


    function validateCentreCode() {

      const value =
        centreCode.value.trim();

      if (
        !value
      ) {

        setError(
          centreCode,
          "centreCodeError",
          "Centre Code is required."
        );

        return false;

      }

      markValid(
        centreCode,
        "centreCodeError"
      );

      return true;

    }


    /* =====================================================
       STUDENT NAME
    ===================================================== */

    studentName.addEventListener(
      "input",
      function () {

        this.value =
          this.value.replace(
            /[^A-Za-z\s.'-]/g,
            ""
          );

        if (
          this.value.trim()
        ) {

          clearError(
            studentName,
            "studentNameError"
          );

        }

      }
    );


    function validateStudentName() {

      const value =
        studentName.value.trim();

      if (
        !value
      ) {

        setError(
          studentName,
          "studentNameError",
          "Student Name is required."
        );

        return false;

      }

      if (
        value.length < 2
      ) {

        setError(
          studentName,
          "studentNameError",
          "Enter a valid Student Name."
        );

        return false;

      }

      markValid(
        studentName,
        "studentNameError"
      );

      return true;

    }


    /* =====================================================
       FATHER NAME
    ===================================================== */

    fatherName.addEventListener(
      "input",
      function () {

        this.value =
          this.value.replace(
            /[^A-Za-z\s.'-]/g,
            ""
          );

        if (
          this.value.trim()
        ) {

          clearError(
            fatherName,
            "fatherNameError"
          );

        }

      }
    );


    function validateFatherName() {

      const value =
        fatherName.value.trim();

      if (
        !value
      ) {

        setError(
          fatherName,
          "fatherNameError",
          "Father's Name is required."
        );

        return false;

      }

      if (
        value.length < 2
      ) {

        setError(
          fatherName,
          "fatherNameError",
          "Enter a valid Father's Name."
        );

        return false;

      }

      markValid(
        fatherName,
        "fatherNameError"
      );

      return true;

    }


    /* =====================================================
       SEX
    ===================================================== */

    function validateSex() {

      const selectedSex =
        document.querySelector(
          'input[name="sex"]:checked'
        );

      const error =
        document.getElementById(
          "sexError"
        );

      if (
        !selectedSex
      ) {

        error.textContent =
          "Please select Sex.";

        return false;

      }

      error.textContent =
        "";

      return true;

    }


    document
      .querySelectorAll(
        'input[name="sex"]'
      )
      .forEach(
        function (
          radio
        ) {

          radio.addEventListener(
            "change",
            validateSex
          );

        }
      );


    /* =====================================================
       DATE OF BIRTH
    ===================================================== */

    function getDateString(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    function addYears(date, years) {
      const originalMonth = date.getMonth();
      const originalDay = date.getDate();
      const result = new Date(
        date.getFullYear() + years,
        originalMonth,
        originalDay,
        12,
        0,
        0
      );
      if (result.getMonth() !== originalMonth) {
        result.setDate(0);
      }
      return result;
    }

    function calculateApplicantAge(dobValue) {
      if (!dobValue) {
        return null;
      }

      const parts = dobValue.split("-");

      if (parts.length !== 3) {
        return null;
      }

      const birthYear = Number(parts[0]);
      const birthMonth = Number(parts[1]);
      const birthDay = Number(parts[2]);

      if (
        !Number.isInteger(birthYear) ||
        !Number.isInteger(birthMonth) ||
        !Number.isInteger(birthDay)
      ) {
        return null;
      }

      const today = new Date();

      let age = today.getFullYear() - birthYear;

      const currentMonth = today.getMonth() + 1;
      const currentDay = today.getDate();

      if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDay < birthDay)
      ) {
        age--;
      }

      return age;
    }

    function setDateOfBirthLimits() {
      const today = new Date();
      const minDate = addYears(today, -36);
      minDate.setDate(minDate.getDate() + 1);
      const maxDate = addYears(today, -15);
      if (dateOfBirth) {
        dateOfBirth.min = getDateString(minDate);
        dateOfBirth.max = getDateString(maxDate);
      }
    }

    function validateDateOfBirth() {
      const dobValue = dateOfBirth.value;
      const age = calculateApplicantAge(dobValue);

      if (age === null) {
        if (!dobValue) {
          setError(
            dateOfBirth,
            "dateOfBirthError",
            "Please select your Date of Birth."
          );
        } else {
          setError(
            dateOfBirth,
            "dateOfBirthError",
            "Please select a valid Date of Birth."
          );
        }
        return false;
      }

      if (
        age < 15 ||
        age > 35
      ) {
        setError(
          dateOfBirth,
          "dateOfBirthError",
          "Age must be between 15 and 35 years."
        );
        return false;
      }

      markValid(
        dateOfBirth,
        "dateOfBirthError"
      );

      return true;
    }

    dateOfBirth.addEventListener(
      "change",
      validateDateOfBirth
    );

    setDateOfBirthLimits();

    /* =====================================================
       ADDRESS
    ===================================================== */

    address.addEventListener(
      "input",
      function () {

        if (
          this.value.trim()
        ) {

          clearError(
            address,
            "addressError"
          );

        }

      }
    );


    function validateAddress() {

      const value =
        address.value.trim();

      if (
        !value
      ) {

        setError(
          address,
          "addressError",
          "Address is required."
        );

        return false;

      }

      if (
        value.length < 5
      ) {

        setError(
          address,
          "addressError",
          "Enter a valid Address."
        );

        return false;

      }

      markValid(
        address,
        "addressError"
      );

      return true;

    }


    /* =====================================================
       PIN CODE
    ===================================================== */

    pinCode.addEventListener(
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

        const value =
          this.value;

        if (
          !value
        ) {

          clearError(
            pinCode,
            "pinCodeError"
          );

          return;

        }

        if (
          value.charAt(0) !==
          "6"
        ) {

          setError(
            pinCode,
            "pinCodeError",
            "Tamil Nadu Pin Code must start with 6."
          );

          return;

        }

        if (
          value.length <
          6
        ) {

          setError(
            pinCode,
            "pinCodeError",
            `Enter ${6 - value.length} more digit(s).`
          );

          return;

        }

        clearError(
          pinCode,
          "pinCodeError"
        );

      }
    );


    function validatePinCode() {

      const value =
        pinCode.value.trim();

      if (
        !value
      ) {

        setError(
          pinCode,
          "pinCodeError",
          "Pin Code is required."
        );

        return false;

      }

      if (
        !/^6[0-9]{5}$/.test(
          value
        )
      ) {

        setError(
          pinCode,
          "pinCodeError",
          "Enter a valid 6-digit Tamil Nadu Pin Code starting with 6."
        );

        return false;

      }

      markValid(
        pinCode,
        "pinCodeError"
      );

      return true;

    }


    /* =====================================================
       PHONE NUMBER
    ===================================================== */

    function resetMobileOtpVerification() {

      mobileOtpVerified =
        false;

      phoneNumber.readOnly =
        false;

      if (
        mobileOtpInput
      ) {

        mobileOtpInput.value =
          "";

        mobileOtpInput.readOnly =
          false;

      }

      if (
        mobileOtpPanel
      ) {

        mobileOtpPanel.classList.remove(
          "show"
        );

      }

      if (
        sendMobileOtpBtn
      ) {

        sendMobileOtpBtn.style.display =
          "";

      }

      if (
        verifyMobileOtpBtn
      ) {

        verifyMobileOtpBtn.style.display =
          "";

      }

      setOtpStatus(
        mobileOtpStatus,
        "",
        ""
      );

    }


    phoneNumber.addEventListener(
      "input",
      function () {

        mobileOtpVerified =
          false;

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

        const value =
          this.value;

        if (
          mobileOtpPanel
        ) {

          mobileOtpPanel.classList.remove(
            "show"
          );

        }

        if (
          mobileOtpInput
        ) {

          mobileOtpInput.value =
            "";

        }

        setOtpStatus(
          mobileOtpStatus,
          "",
          ""
        );

        if (
          !value
        ) {

          clearError(
            phoneNumber,
            "phoneNumberError"
          );

          return;

        }

        if (
          !/^[6-9]/.test(
            value
          )
        ) {

          setError(
            phoneNumber,
            "phoneNumberError",
            "Indian mobile number must start with 6, 7, 8, or 9."
          );

          return;

        }

        if (
          value.length <
          10
        ) {

          setError(
            phoneNumber,
            "phoneNumberError",
            `Enter ${10 - value.length} more digit(s).`
          );

          return;

        }

        if (
          /^(\d)\1{9}$/.test(
            value
          )
        ) {

          setError(
            phoneNumber,
            "phoneNumberError",
            "Repeated digits are not accepted as a valid mobile number."
          );

          return;

        }

        const blockedNumbers = [
          "1234567890",
          "9876543210"
        ];

        if (
          blockedNumbers.includes(
            value
          )
        ) {

          setError(
            phoneNumber,
            "phoneNumberError",
            "Enter a valid Indian mobile number."
          );

          return;

        }

        clearError(
          phoneNumber,
          "phoneNumberError"
        );

      }
    );


    function validatePhoneNumber() {

      const value =
        phoneNumber.value.trim();

      if (
        !value
      ) {

        setError(
          phoneNumber,
          "phoneNumberError",
          "Phone Number is required."
        );

        return false;

      }

      if (
        !/^[6-9][0-9]{9}$/.test(
          value
        )
      ) {

        setError(
          phoneNumber,
          "phoneNumberError",
          "Enter a valid 10-digit Indian mobile number."
        );

        return false;

      }

      if (
        /^(\d)\1{9}$/.test(
          value
        )
      ) {

        setError(
          phoneNumber,
          "phoneNumberError",
          "Repeated digits are not accepted as a valid mobile number."
        );

        return false;

      }

      const blockedNumbers = [
        "1234567890",
        "9876543210"
      ];

      if (
        blockedNumbers.includes(
          value
        )
      ) {

        setError(
          phoneNumber,
          "phoneNumberError",
          "Enter a valid Indian mobile number."
        );

        return false;

      }

      markValid(
        phoneNumber,
        "phoneNumberError"
      );

      return true;

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    email.addEventListener(
      "input",
      function () {

        emailOtpVerified =
          false;

        const value =
          this.value;

        if (
          emailOtpPanel
        ) {

          emailOtpPanel.classList.remove(
            "show"
          );

        }

        if (
          emailOtpInput
        ) {

          emailOtpInput.value =
            "";

        }

        setOtpStatus(
          emailOtpStatus,
          "",
          ""
        );

        if (
          !value
        ) {

          clearError(
            email,
            "emailError"
          );

          return;

        }

        if (
          /[A-Z]/.test(
            value
          )
        ) {

          setError(
            email,
            "emailError",
            "Capital letters are not allowed in Email ID."
          );

          return;

        }

        if (
          /\s/.test(
            value
          )
        ) {

          setError(
            email,
            "emailError",
            "Spaces are not allowed in Email ID."
          );

          return;

        }

        if (
          /[^a-z0-9@.]/.test(
            value
          )
        ) {

          setError(
            email,
            "emailError",
            "Only letters, numbers, @ and . are allowed in Email ID."
          );

          return;

        }

        const atCount =
          (
            value.match(
              /@/g
            ) || []
          ).length;

        if (
          atCount >
          1
        ) {

          setError(
            email,
            "emailError",
            "Email ID must contain exactly one @ symbol."
          );

          return;

        }

        clearError(
          email,
          "emailError"
        );

      }
    );


    function validateEmail() {

      const value =
        email.value.trim();

      if (
        !value
      ) {

        setError(
          email,
          "emailError",
          "Email ID is required."
        );

        return false;

      }

      if (
        /[A-Z]/.test(
          value
        )
      ) {

        setError(
          email,
          "emailError",
          "Capital letters are not allowed in Email ID."
        );

        return false;

      }

      if (
        /\s/.test(
          value
        )
      ) {

        setError(
          email,
          "emailError",
          "Spaces are not allowed in Email ID."
        );

        return false;

      }

      if (
        /[^a-z0-9@.]/.test(
          value
        )
      ) {

        setError(
          email,
          "emailError",
          "Only letters, numbers, @ and . are allowed in Email ID."
        );

        return false;

      }

      const atCount =
        (
          value.match(
            /@/g
          ) || []
        ).length;

      if (
        atCount !==
        1
      ) {

        setError(
          email,
          "emailError",
          "Email ID must contain exactly one @ symbol."
        );

        return false;

      }

      const emailPattern =
        /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/;

      if (
        !emailPattern.test(
          value
        )
      ) {

        setError(
          email,
          "emailError",
          "Enter a valid Email ID."
        );

        return false;

      }

      markValid(
        email,
        "emailError"
      );

      return true;

    }


    /* =====================================================
       OTP INPUT DIGITS ONLY
    ===================================================== */

    function configureOtpInput(
      input
    ) {

      if (
        !input
      ) {
        return;
      }

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

      input.addEventListener(
        "paste",
        function (event) {

          event.preventDefault();

        }
      );

      input.addEventListener(
        "copy",
        function (event) {

          event.preventDefault();

        }
      );

      input.addEventListener(
        "cut",
        function (event) {

          event.preventDefault();

        }
      );

      input.addEventListener(
        "contextmenu",
        function (event) {

          event.preventDefault();

        }
      );

    }


    configureOtpInput(
      mobileOtpInput
    );

    configureOtpInput(
      emailOtpInput
    );


    /* =====================================================
       SEND MOBILE OTP
    ===================================================== */

    if (
      sendMobileOtpBtn
    ) {

      sendMobileOtpBtn.addEventListener(
        "click",
        async function () {

          console.log("MOBILE OTP BUTTON CLICKED");

          if (
            !validatePhoneNumber()
          ) {

            phoneNumber.focus();

            return;

          }

          const mobile =
            phoneNumber.value.trim();

          console.log("Mobile OTP payload:", {
            mobile: mobile
          });

          try {

            sendMobileOtpBtn.disabled =
              true;

            sendMobileOtpBtn.textContent =
              "Sending...";

            setOtpStatus(
              mobileOtpStatus,
              "Sending OTP...",
              "info"
            );

            const response =
              await fetch(
                `${API_BASE_URL}/api/send-mobile-otp`,
                {

                  method:
                    "POST",

                  headers: {
                    "Content-Type":
                      "application/json"
                  },

                  body:
                    JSON.stringify({
                      mobile: mobile
                    })

                }
              );

            const result =
              await getResponseJson(
                response
              );

            if (
              !response.ok ||
              result.success ===
              false
            ) {

              throw new Error(
                result.message ||
                "Unable to send mobile OTP."
              );

            }

            mobileOtpVerified =
              false;

            mobileOtpPanel.classList.add(
              "show"
            );

            mobileOtpInput.value =
              "";

            setOtpStatus(
              mobileOtpStatus,
              "OTP sent successfully. Enter the 6-digit OTP.",
              "success"
            );

            mobileOtpInput.focus();

          } catch (
            error
          ) {

            console.error(
              "MOBILE OTP SEND ERROR:",
              error
            );

            setOtpStatus(
              mobileOtpStatus,
              error.message ||
              "Unable to send mobile OTP.",
              "error"
            );

          } finally {

            sendMobileOtpBtn.disabled =
              false;

            sendMobileOtpBtn.textContent =
              "Send OTP";

          }

        }
      );

    }


    /* =====================================================
       VERIFY MOBILE OTP
    ===================================================== */

    if (
      verifyMobileOtpBtn
    ) {

      verifyMobileOtpBtn.addEventListener(
        "click",
        async function () {

          const mobile =
            phoneNumber.value.trim();

          const otp =
            mobileOtpInput.value.trim();

          if (
            !/^[0-9]{6}$/.test(
              otp
            )
          ) {

            setOtpStatus(
              mobileOtpStatus,
              "Enter the complete 6-digit OTP.",
              "error"
            );

            return;

          }

          try {

            verifyMobileOtpBtn.disabled =
              true;

            verifyMobileOtpBtn.textContent =
              "Verifying...";

            const response =
              await fetch(
                `${API_BASE_URL}/api/verify-mobile-otp`,
                {

                  method:
                    "POST",

                  headers: {
                    "Content-Type":
                      "application/json"
                  },

                  body:
                    JSON.stringify({
                      mobile,
                      otp
                    })

                }
              );

            const result =
              await getResponseJson(
                response
              );

            if (
              !response.ok ||
              result.success ===
              false
            ) {

              throw new Error(
                result.message ||
                "Invalid mobile OTP."
              );

            }

            mobileOtpVerified =
              true;

            phoneNumber.readOnly =
              true;

            mobileOtpInput.readOnly =
              true;

            sendMobileOtpBtn.style.display =
              "none";

            verifyMobileOtpBtn.style.display =
              "none";

            markValid(
              phoneNumber,
              "phoneNumberError"
            );

            setOtpStatus(
              mobileOtpStatus,
              "Mobile number verified successfully.",
              "success"
            );

            mobileOtpInput.value = "";
            mobileOtpPanel.style.display = "none";

          } catch (
            error
          ) {

            mobileOtpVerified =
              false;

            setOtpStatus(
              mobileOtpStatus,
              error.message ||
              "Mobile OTP verification failed.",
              "error"
            );

          } finally {

            verifyMobileOtpBtn.disabled =
              false;

            verifyMobileOtpBtn.textContent =
              "Verify OTP";

          }

        }
      );

    }


    /* =====================================================
       SEND EMAIL OTP
    ===================================================== */

    if (
      sendEmailOtpBtn
    ) {

      sendEmailOtpBtn.addEventListener(
        "click",
        async function () {

          if (
            !validateEmail()
          ) {

            email.focus();

            return;

          }

          const emailValue =
            email.value.trim();

          try {

            sendEmailOtpBtn.disabled =
              true;

            sendEmailOtpBtn.textContent =
              "Sending...";

            setOtpStatus(
              emailOtpStatus,
              "Sending OTP...",
              "info"
            );

            const response =
              await fetch(
                `${API_BASE_URL}/api/send-otp`,
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
                        emailValue
                    })

                }
              );

            const result =
              await getResponseJson(
                response
              );

            if (
              !response.ok ||
              result.success ===
              false
            ) {

              throw new Error(
                result.message ||
                "Unable to send email OTP."
              );

            }

            emailOtpVerified =
              false;

            emailOtpPanel.classList.add(
              "show"
            );

            emailOtpInput.value =
              "";

            setOtpStatus(
              emailOtpStatus,
              "OTP sent successfully. Check your email.",
              "success"
            );

            emailOtpInput.focus();

          } catch (
            error
          ) {

            console.error(
              "EMAIL OTP SEND ERROR:",
              error
            );

            setOtpStatus(
              emailOtpStatus,
              error.message ||
              "Unable to send email OTP.",
              "error"
            );

          } finally {

            sendEmailOtpBtn.disabled =
              false;

            sendEmailOtpBtn.textContent =
              "Send OTP";

          }

        }
      );

    }


    /* =====================================================
       VERIFY EMAIL OTP
    ===================================================== */

    if (
      verifyEmailOtpBtn
    ) {

      verifyEmailOtpBtn.addEventListener(
        "click",
        async function () {

          const emailValue =
            email.value.trim();

          const otp =
            emailOtpInput.value.trim();

          if (
            !/^[0-9]{6}$/.test(
              otp
            )
          ) {

            setOtpStatus(
              emailOtpStatus,
              "Enter the complete 6-digit OTP.",
              "error"
            );

            return;

          }

          try {

            verifyEmailOtpBtn.disabled =
              true;

            verifyEmailOtpBtn.textContent =
              "Verifying...";

            const response =
              await fetch(
                `${API_BASE_URL}/api/verify-otp`,
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
                        emailValue,

                      otp
                    })

                }
              );

            const result =
              await getResponseJson(
                response
              );

            if (
              !response.ok ||
              result.success ===
              false
            ) {

              throw new Error(
                result.message ||
                "Invalid email OTP."
              );

            }

            emailOtpVerified =
              true;

            email.readOnly =
              true;

            emailOtpInput.value =
              "";

            emailOtpPanel.classList.remove(
              "show"
            );

            sendEmailOtpBtn.style.display =
              "none";

            verifyEmailOtpBtn.style.display =
              "none";

            markValid(
              email,
              "emailError"
            );

            setOtpStatus(
              emailOtpStatus,
              "Email verified successfully.",
              "success"
            );

          } catch (
            error
          ) {

            emailOtpVerified =
              false;

            setOtpStatus(
              emailOtpStatus,
              error.message ||
              "Email OTP verification failed.",
              "error"
            );

          } finally {

            verifyEmailOtpBtn.disabled =
              false;

            verifyEmailOtpBtn.textContent =
              "Verify OTP";

          }

        }
      );

    }


    /* =====================================================
       EMPLOYMENT STATUS VALIDATION
    ===================================================== */

    const employmentFieldNames = [
      "organization1",
      "designation1",
      "joiningDate1",
      "leavingDate1",
      "jobProfile1"
    ];


    function validateEmploymentStatus() {

      const error =
        document.getElementById(
          "employmentDetailsError"
        );

      let valid =
        true;

      let firstInvalid =
        null;


      employmentFieldNames.forEach(
        function (
          fieldName
        ) {

          const field =
            form.elements[
              fieldName
            ];

          if (
            !field
          ) {
            return;
          }

          const value =
            field.value.trim();

          if (
            !value
          ) {

            field.classList.add(
              "employment-input-error"
            );

            valid =
              false;

            if (
              !firstInvalid
            ) {

              firstInvalid =
                field;

            }

          } else {

            field.classList.remove(
              "employment-input-error"
            );

          }

        }
      );


      if (
        !valid
      ) {

        if (
          error
        ) {

          error.textContent =
            "Please fill in all Employment Status details.";

        }

        if (
          firstInvalid
        ) {

          firstInvalid.focus();

        }

        return false;

      }


      const joiningDate1 =
        form.elements[
          "joiningDate1"
        ].value;

      const leavingDate1 =
        form.elements[
          "leavingDate1"
        ].value;


      if (
        joiningDate1 >
        leavingDate1
      ) {

        if (
          error
        ) {

          error.textContent =
            "Employment Row 1: Date of Leaving cannot be earlier than Joining Date.";

        }

        form.elements[
          "joiningDate1"
        ].classList.add(
          "employment-input-error"
        );

        form.elements[
          "leavingDate1"
        ].classList.add(
          "employment-input-error"
        );

        return false;

      }


      if (
        error
      ) {

        error.textContent =
          "";

      }

      return true;

    }


    employmentFieldNames.forEach(
      function (
        fieldName
      ) {

        const field =
          form.elements[
            fieldName
          ];

        if (
          !field
        ) {
          return;
        }

        field.addEventListener(
          "input",
          function () {

            if (
              this.value.trim()
            ) {

              this.classList.remove(
                "employment-input-error"
              );

            }

          }
        );

        field.addEventListener(
          "change",
          function () {

            if (
              this.value.trim()
            ) {

              this.classList.remove(
                "employment-input-error"
              );

            }

          }
        );

      }
    );


    /* =====================================================
       SIGNATURE VALIDATION
    ===================================================== */

    function validateSignature() {

      const file =
        candidateSignature.files[0];

      if (
        !file
      ) {

        setError(
          candidateSignature,
          "candidateSignatureError",
          "Candidate Signature is required."
        );

        return false;

      }

      const allowedTypes = [
        "image/jpeg",
        "image/png"
      ];

      const fileName =
        file.name.toLowerCase();

      const validExtension =
        fileName.endsWith(
          ".jpg"
        ) ||
        fileName.endsWith(
          ".jpeg"
        ) ||
        fileName.endsWith(
          ".png"
        );

      if (
        !allowedTypes.includes(
          file.type
        ) ||
        !validExtension
      ) {

        candidateSignature.value =
          "";

        setError(
          candidateSignature,
          "candidateSignatureError",
          "Only JPG, JPEG, and PNG files are allowed."
        );

        return false;

      }

      const maxSize =
        5 *
        1024 *
        1024;

      if (
        file.size >
        maxSize
      ) {

        candidateSignature.value =
          "";

        setError(
          candidateSignature,
          "candidateSignatureError",
          "Candidate Signature image must be less than 5 MB."
        );

        return false;

      }

      markValid(
        candidateSignature,
        "candidateSignatureError"
      );

      return true;

    }


    candidateSignature.addEventListener(
      "change",
      validateSignature
    );


    /* =====================================================
       BLUR VALIDATION
    ===================================================== */

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
      validatePhoneNumber
    );

    email.addEventListener(
      "blur",
      validateEmail
    );


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    form.addEventListener(
      "submit",
      async function (
        event
      ) {

        event.preventDefault();


        const dobValid =
          validateDateOfBirth();


        const enrolmentValid =
          validateEnrolmentNumber();

        const centreValid =
          validateCentreCode();

        const studentValid =
          validateStudentName();

        const fatherValid =
          validateFatherName();

        const sexValid =
          validateSex();

        const addressValid =
          validateAddress();

        const pinValid =
          validatePinCode();

        const phoneValid =
          validatePhoneNumber();

        const emailValid =
          validateEmail();

        const employmentValid =
          validateEmploymentStatus();

        const signatureValid =
          validateSignature();


        const normalValidationValid =
          enrolmentValid &&
          centreValid &&
          studentValid &&
          fatherValid &&
          sexValid &&
          dobValid &&
          addressValid &&
          pinValid &&
          phoneValid &&
          emailValid &&
          employmentValid &&
          signatureValid;


        if (
          !normalValidationValid
        ) {

          const firstInvalid =
            document.querySelector(
              ".input-error, .employment-input-error"
            );

          if (
            firstInvalid
          ) {

            firstInvalid.scrollIntoView({
              behavior:
                "smooth",

              block:
                "center"
            });

          }

          return;

        }


        /* =================================================
           MOBILE OTP REQUIRED
        ================================================= */

        if (
          !mobileOtpVerified
        ) {

          setOtpStatus(
            mobileOtpStatus,
            "Please verify your mobile number OTP before submitting.",
            "error"
          );

          phoneNumber.scrollIntoView({
            behavior:
              "smooth",

            block:
              "center"
          });

          return;

        }


        /* =================================================
           EMAIL OTP REQUIRED
        ================================================= */

        if (
          !emailOtpVerified
        ) {

          setOtpStatus(
            emailOtpStatus,
            "Please verify your email OTP before submitting.",
            "error"
          );

          email.scrollIntoView({
            behavior:
              "smooth",

            block:
              "center"
          });

          return;

        }


        /* =================================================
           SUBMIT
        ================================================= */

        submitBtn.disabled =
          true;

        submitBtn.textContent =
          "Submitting...";


        try {

          const formData =
            new FormData(
              form
            );


          const employmentDetails = [
            {

              organizationName:
                form.elements[
                  "organization1"
                ].value.trim(),

              designation:
                form.elements[
                  "designation1"
                ].value.trim(),

              joiningDate:
                form.elements[
                  "joiningDate1"
                ].value,

              leavingDate:
                form.elements[
                  "leavingDate1"
                ].value,

              jobProfile:
                form.elements[
                  "jobProfile1"
                ].value.trim()

            }
          ];


          formData.set(
            "employmentDetails",
            JSON.stringify(
              employmentDetails
            )
          );


          const response =
            await fetch(
              INTERNSHIP_API_URL,
              {

                method:
                  "POST",

                body:
                  formData

              }
            );


          const result =
            await getResponseJson(
              response
            );


          if (
            !response.ok ||
            result.success ===
            false
          ) {

            throw new Error(
              result.message ||
              "Unable to submit internship application."
            );

          }


          if (
            successPopup
          ) {

            successPopup.classList.add(
              "show"
            );

          }


        } catch (
          error
        ) {

          console.error(
            "INTERNSHIP SUBMIT ERROR:",
            error
          );

          let displayMessage =
            error.message ||
            "Unable to submit Internship Application. Please try again.";

          if (
            /^Age must be between 15 and 20 years\.?$/i.test(
              displayMessage
            )
          ) {
            displayMessage =
              "Age must be between 15 and 35 years.";
          }

          submitBtn.disabled =
            false;

          submitBtn.textContent =
            "Submit Application";

          alert(displayMessage);

        } finally {

          submitBtn.disabled =
            false;

          submitBtn.textContent =
            "Submit Application";

        }

      }
    );


    /* =====================================================
       RESET FORM
    ===================================================== */

    function resetCompleteForm() {

      form.reset();


      mobileOtpVerified =
        false;

      emailOtpVerified =
        false;


      phoneNumber.readOnly =
        false;

      email.readOnly =
        false;


      if (
        mobileOtpInput
      ) {

        mobileOtpInput.value =
          "";

        mobileOtpInput.readOnly =
          false;

      }


      if (
        emailOtpInput
      ) {

        emailOtpInput.value =
          "";

        emailOtpInput.readOnly =
          false;

      }


      if (
        mobileOtpPanel
      ) {

        mobileOtpPanel.classList.remove(
          "show"
        );

      }


      if (
        emailOtpPanel
      ) {

        emailOtpPanel.classList.remove(
          "show"
        );

      }


      if (
        sendMobileOtpBtn
      ) {

        sendMobileOtpBtn.style.display =
          "";

        sendMobileOtpBtn.disabled =
          false;

        sendMobileOtpBtn.textContent =
          "Send OTP";

      }


      if (
        sendEmailOtpBtn
      ) {

        sendEmailOtpBtn.style.display =
          "";

        sendEmailOtpBtn.disabled =
          false;

        sendEmailOtpBtn.textContent =
          "Send OTP";

      }


      if (
        verifyMobileOtpBtn
      ) {

        verifyMobileOtpBtn.style.display =
          "";

        verifyMobileOtpBtn.disabled =
          false;

        verifyMobileOtpBtn.textContent =
          "Verify OTP";

      }


      if (
        verifyEmailOtpBtn
      ) {

        verifyEmailOtpBtn.style.display =
          "";

        verifyEmailOtpBtn.disabled =
          false;

        verifyEmailOtpBtn.textContent =
          "Verify OTP";

      }


      document
        .querySelectorAll(
          ".error"
        )
        .forEach(
          function (
            element
          ) {

            element.textContent =
              "";

          }
        );


      document
        .querySelectorAll(
          ".input-error"
        )
        .forEach(
          function (
            element
          ) {

            element.classList.remove(
              "input-error"
            );

          }
        );


      document
        .querySelectorAll(
          ".input-valid"
        )
        .forEach(
          function (
            element
          ) {

            element.classList.remove(
              "input-valid"
            );

          }
        );


      document
        .querySelectorAll(
          ".employment-input-error"
        )
        .forEach(
          function (
            element
          ) {

            element.classList.remove(
              "employment-input-error"
            );

          }
        );


      setOtpStatus(
        mobileOtpStatus,
        "",
        ""
      );


      setOtpStatus(
        emailOtpStatus,
        "",
        ""
      );

    }


    /* =====================================================
       RESET BUTTON
    ===================================================== */

    if (
      resetBtn
    ) {

      resetBtn.addEventListener(
        "click",
        function () {

          const confirmed =
            window.confirm(
              "Are you sure you want to clear the form?"
            );

          if (
            !confirmed
          ) {

            return;

          }

          resetCompleteForm();

          window.scrollTo({
            top:
              0,

            behavior:
              "smooth"
          });

        }
      );

    }


    /* =====================================================
       SUCCESS POPUP
    ===================================================== */

    if (
      popupCloseBtn &&
      successPopup
    ) {

      popupCloseBtn.addEventListener(
        "click",
        function () {

          successPopup.classList.remove(
            "show"
          );

          resetCompleteForm();

          window.scrollTo({
            top:
              0,

            behavior:
              "smooth"
          });

        }
      );

    }

  }
);