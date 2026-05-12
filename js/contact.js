
// document.addEventListener("DOMContentLoaded", function () {
//   const enquiryForm = document.getElementById("enquiryForm");
//   const otpSection = document.getElementById("otpSection");
//   const emailOtpInput = document.getElementById("emailOtpInput");
//   const verifyBtn = document.getElementById("verifyBtn");
//   const verificationMessages = document.getElementById("verificationMessages");
//   const verificationInfo = document.getElementById("verificationInfo");
//   const submitBtn = document.querySelector(".submit-btn");

//   const API_BASE_URL = "https://backend-2kz6.onrender.com/api";

//   let pendingFormData = null;

//   function showMessage(type, html) {
//     verificationMessages.style.display = "block";
//     verificationInfo.className = type;
//     verificationInfo.innerHTML = html;
//   }

//   function hideMessage() {
//     verificationMessages.style.display = "none";
//     verificationInfo.innerHTML = "";
//   }

//   async function readJsonResponse(res, fallbackMessage) {
//     const contentType = res.headers.get("content-type");

//     if (contentType && contentType.includes("application/json")) {
//       return await res.json();
//     }

//     const text = await res.text();
//     console.log("NON JSON RESPONSE:", text);
//     throw new Error(fallbackMessage);
//   }

//   enquiryForm.addEventListener("submit", async function (e) {
//     e.preventDefault();
//     hideMessage();

//     const formData = {
//       fullName: document.getElementById("fullName").value.trim(),
//       mobile: document.getElementById("mobile").value.trim(),
//       email: document.getElementById("email").value.trim(),
//       address: document.getElementById("address").value.trim(),
//       city: document.getElementById("city").value.trim(),
//       message: document.getElementById("message").value.trim()
//     };

//     pendingFormData = formData;

//     submitBtn.textContent = "Sending OTP...";
//     submitBtn.disabled = true;

//     try {
//       const res = await fetch(`${API_BASE_URL}/send-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           mobile: formData.mobile
//         })
//       });

//       const data = await readJsonResponse(res, "Send OTP API error");

//       if (!data.success) {
//         throw new Error(data.message || "OTP sending failed");
//       }

//       otpSection.style.display = "block";
//       emailOtpInput.value = "";
//       verifyBtn.style.display = "none";

//       showMessage(
//         "verification-info",
//         `OTP sent to ${formData.email}. Please enter the email OTP.`
//       );
//     } catch (err) {
//       showMessage("verification-error", err.message);
//     }

//     submitBtn.textContent = "Submit";
//     submitBtn.disabled = false;
//   });

//   emailOtpInput.addEventListener("input", function () {
//     this.value = this.value.replace(/\D/g, "").slice(0, 6);
//     verifyBtn.style.display = this.value.length === 6 ? "block" : "none";
//   });

//   verifyBtn.addEventListener("click", async function () {
//     const enteredEmailOtp = emailOtpInput.value.trim();

//     if (!pendingFormData) {
//       showMessage("verification-error", "Please submit the form first.");
//       return;
//     }

//     if (enteredEmailOtp.length !== 6) {
//       showMessage("verification-error", "Enter a valid 6 digit OTP.");
//       return;
//     }

//     verifyBtn.textContent = "Verifying...";
//     verifyBtn.disabled = true;

//     try {
//       const verifyRes = await fetch(`${API_BASE_URL}/verify-otp`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email: pendingFormData.email,
//           otp: enteredEmailOtp
//         })
//       });

//       const verifyData = await readJsonResponse(
//         verifyRes,
//         "Verify OTP API error"
//       );

//       if (!verifyData.success) {
//         throw new Error(verifyData.message || "OTP verification failed");
//       }

//       const submitRes = await fetch(`${API_BASE_URL}/contact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(pendingFormData)
//       });

//       const submitData = await readJsonResponse(
//         submitRes,
//         "Contact submit API error"
//       );

//       if (!submitData.success) {
//         throw new Error(submitData.message || "Form submit failed");
//       }

//       showMessage("verification-success", "Form submitted successfully.");

//       enquiryForm.reset();
//       otpSection.style.display = "none";
//       verifyBtn.style.display = "none";
//       pendingFormData = null;
//     } catch (err) {
//       showMessage("verification-error", err.message);
//     }

//     verifyBtn.textContent = "Verify";
//     verifyBtn.disabled = false;
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  const enquiryForm = document.getElementById("enquiryForm");
  const otpSection = document.getElementById("otpSection");
  const mobileOtpInput = document.getElementById("mobileOtpInput");
  const emailOtpInput = document.getElementById("emailOtpInput");
  const verifyBtn = document.getElementById("verifyBtn");
  const verificationMessages = document.getElementById("verificationMessages");
  const verificationInfo = document.getElementById("verificationInfo");
  const submitBtn = document.querySelector(".submit-btn");
  const mobileInput = document.getElementById("mobile");

  const API_BASE_URL = "https://backend-2kz6.onrender.com/api";

  let pendingFormData = null;

  function showMessage(type, message) {
    verificationMessages.style.display = "block";
    verificationInfo.className = type;
    verificationInfo.textContent = message;
  }

  function hideMessage() {
    verificationMessages.style.display = "none";
    verificationInfo.textContent = "";
    verificationInfo.className = "verification-info";
  }

  async function readJsonResponse(res, fallbackMessage) {
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    }

    const text = await res.text();
    console.log("NON JSON RESPONSE:", text);
    throw new Error(fallbackMessage);
  }

  function checkOtpInputs() {
    const emailOtp = emailOtpInput.value.trim();

    if (emailOtp.length === 6) {
      verifyBtn.style.display = "block";
    } else {
      verifyBtn.style.display = "none";
    }
  }

  function allowOnlyManualDigits(inputElement) {
    inputElement.addEventListener("keydown", function (event) {
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
        showMessage("verification-error", "Paste is not allowed. Please type the OTP manually.");
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

    inputElement.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 6);
      checkOtpInputs();
    });

    inputElement.addEventListener("paste", function (event) {
      event.preventDefault();
      showMessage("verification-error", "Paste is not allowed. Please type the OTP manually.");
    });

    inputElement.addEventListener("drop", function (event) {
      event.preventDefault();
      showMessage("verification-error", "Drag and drop is not allowed. Please type the OTP manually.");
    });

    inputElement.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
  }

  function validateMainForm(formData) {
    if (!formData.fullName) {
      throw new Error("Please enter your full name.");
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      throw new Error("Please enter a valid 10-digit mobile number.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      throw new Error("Please enter a valid email address.");
    }

    if (!formData.address) {
      throw new Error("Please enter your address.");
    }

    if (!formData.city) {
      throw new Error("Please enter your city.");
    }

    if (!formData.message) {
      throw new Error("Please enter your message.");
    }
  }

  allowOnlyManualDigits(emailOtpInput);

  if (mobileOtpInput) {
    mobileOtpInput.value = "000000";
    mobileOtpInput.readOnly = true;
    mobileOtpInput.style.opacity = "0.8";
    mobileOtpInput.style.cursor = "not-allowed";
  }

  mobileInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
  });

  mobileInput.addEventListener("paste", function (event) {
    event.preventDefault();

    const pastedValue = event.clipboardData.getData("text");
    this.value = pastedValue.replace(/[^0-9]/g, "").slice(0, 10);
  });

  enquiryForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    hideMessage();

    const formData = {
      fullName: document.getElementById("fullName").value.trim(),
      mobile: document.getElementById("mobile").value.trim(),
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim(),
      city: document.getElementById("city").value.trim(),
      message: document.getElementById("message").value.trim()
    };

    try {
      validateMainForm(formData);

      pendingFormData = formData;

      submitBtn.textContent = "Sending OTP...";
      submitBtn.disabled = true;

      const res = await fetch(`${API_BASE_URL}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          mobile: formData.mobile
        })
      });

      const data = await readJsonResponse(res, "Send OTP API error.");

      if (!data.success) {
        throw new Error(data.message || "OTP sending failed.");
      }

      otpSection.style.display = "block";

      if (mobileOtpInput) {
        mobileOtpInput.value = "000000";
      }

      emailOtpInput.value = "";
      verifyBtn.style.display = "none";

      showMessage(
        "verification-info",
        `Email OTP sent to ${formData.email}. Mobile OTP is dummy. Please type the email OTP manually.`
      );
    } catch (err) {
      showMessage("verification-error", err.message);
    } finally {
      submitBtn.textContent = "Submit";
      submitBtn.disabled = false;
    }
  });

  verifyBtn.addEventListener("click", async function () {
    const enteredEmailOtp = emailOtpInput.value.trim();

    if (!pendingFormData) {
      showMessage("verification-error", "Please submit the form first.");
      return;
    }

    if (!/^[0-9]{6}$/.test(enteredEmailOtp)) {
      showMessage("verification-error", "Please enter a valid 6-digit email OTP.");
      return;
    }

    verifyBtn.textContent = "Verifying...";
    verifyBtn.disabled = true;

    try {
      const verifyRes = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: pendingFormData.email,
          otp: enteredEmailOtp
        })
      });

      const verifyData = await readJsonResponse(
        verifyRes,
        "Verify OTP API error."
      );

      if (!verifyData.success) {
        throw new Error(verifyData.message || "OTP verification failed.");
      }

      const submitRes = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pendingFormData)
      });

      const submitData = await readJsonResponse(
        submitRes,
        "Contact submit API error."
      );

      if (!submitData.success) {
        throw new Error(submitData.message || "Form submit failed.");
      }

      showMessage("verification-success", "Form submitted successfully.");

      enquiryForm.reset();

      if (mobileOtpInput) {
        mobileOtpInput.value = "000000";
      }

      emailOtpInput.value = "";
      otpSection.style.display = "none";
      verifyBtn.style.display = "none";
      pendingFormData = null;
    } catch (err) {
      showMessage("verification-error", err.message);
    } finally {
      verifyBtn.textContent = "Verify OTP";
      verifyBtn.disabled = false;
    }
  });
});