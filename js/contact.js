


// document.addEventListener("DOMContentLoaded", function () {
//   const enquiryForm = document.getElementById("enquiryForm");
//   const otpSection = document.getElementById("otpSection");
//   const mobileOtpInput = document.getElementById("mobileOtpInput");
//   const emailOtpInput = document.getElementById("emailOtpInput");
//   const verifyBtn = document.getElementById("verifyBtn");
//   const verificationMessages = document.getElementById("verificationMessages");
//   const verificationInfo = document.getElementById("verificationInfo");
//   const submitBtn = document.querySelector(".submit-btn");
//   const mobileInput = document.getElementById("mobile");

//   const API_BASE_URL = "https://backend-2kz6.onrender.com/api";

//   let pendingFormData = null;

//   function showMessage(type, message) {
//     verificationMessages.style.display = "block";
//     verificationInfo.className = type;
//     verificationInfo.textContent = message;
//   }

//   function hideMessage() {
//     verificationMessages.style.display = "none";
//     verificationInfo.textContent = "";
//     verificationInfo.className = "verification-info";
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

//   function checkOtpInputs() {
//     const emailOtp = emailOtpInput.value.trim();

//     if (emailOtp.length === 6) {
//       verifyBtn.style.display = "block";
//     } else {
//       verifyBtn.style.display = "none";
//     }
//   }

//   function allowOnlyManualDigits(inputElement) {
//     inputElement.addEventListener("keydown", function (event) {
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
//         showMessage("verification-error", "Paste is not allowed. Please type the OTP manually.");
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

//     inputElement.addEventListener("input", function () {
//       this.value = this.value.replace(/[^0-9]/g, "").slice(0, 6);
//       checkOtpInputs();
//     });

//     inputElement.addEventListener("paste", function (event) {
//       event.preventDefault();
//       showMessage("verification-error", "Paste is not allowed. Please type the OTP manually.");
//     });

//     inputElement.addEventListener("drop", function (event) {
//       event.preventDefault();
//       showMessage("verification-error", "Drag and drop is not allowed. Please type the OTP manually.");
//     });

//     inputElement.addEventListener("contextmenu", function (event) {
//       event.preventDefault();
//     });
//   }

//   function validateMainForm(formData) {
//     if (!formData.fullName) {
//       throw new Error("Please enter your full name.");
//     }

//     if (!/^[0-9]{10}$/.test(formData.mobile)) {
//       throw new Error("Please enter a valid 10-digit mobile number.");
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       throw new Error("Please enter a valid email address.");
//     }

//     if (!formData.address) {
//       throw new Error("Please enter your address.");
//     }

//     if (!formData.city) {
//       throw new Error("Please enter your city.");
//     }

//     if (!formData.message) {
//       throw new Error("Please enter your message.");
//     }
//   }

//   allowOnlyManualDigits(emailOtpInput);

//   if (mobileOtpInput) {
//     mobileOtpInput.value = "000000";
//     mobileOtpInput.readOnly = true;
//     mobileOtpInput.style.opacity = "0.8";
//     mobileOtpInput.style.cursor = "not-allowed";
//   }

//   mobileInput.addEventListener("input", function () {
//     this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
//   });

//   mobileInput.addEventListener("paste", function (event) {
//     event.preventDefault();

//     const pastedValue = event.clipboardData.getData("text");
//     this.value = pastedValue.replace(/[^0-9]/g, "").slice(0, 10);
//   });

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

//     try {
//       validateMainForm(formData);

//       pendingFormData = formData;

//       submitBtn.textContent = "Sending OTP...";
//       submitBtn.disabled = true;

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

//       const data = await readJsonResponse(res, "Send OTP API error.");

//       if (!data.success) {
//         throw new Error(data.message || "OTP sending failed.");
//       }

//       otpSection.style.display = "block";

//       if (mobileOtpInput) {
//         mobileOtpInput.value = "000000";
//       }

//       emailOtpInput.value = "";
//       verifyBtn.style.display = "none";

//       showMessage(
//         "verification-info",
//         `Email OTP sent to ${formData.email}. Mobile OTP is dummy. Please type the email OTP manually.`
//       );
//     } catch (err) {
//       showMessage("verification-error", err.message);
//     } finally {
//       submitBtn.textContent = "Submit";
//       submitBtn.disabled = false;
//     }
//   });

//   verifyBtn.addEventListener("click", async function () {
//     const enteredEmailOtp = emailOtpInput.value.trim();

//     if (!pendingFormData) {
//       showMessage("verification-error", "Please submit the form first.");
//       return;
//     }

//     if (!/^[0-9]{6}$/.test(enteredEmailOtp)) {
//       showMessage("verification-error", "Please enter a valid 6-digit email OTP.");
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
//         "Verify OTP API error."
//       );

//       if (!verifyData.success) {
//         throw new Error(verifyData.message || "OTP verification failed.");
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
//         "Contact submit API error."
//       );

//       if (!submitData.success) {
//         throw new Error(submitData.message || "Form submit failed.");
//       }

//       showMessage("verification-success", "Form submitted successfully.");

//       enquiryForm.reset();

//       if (mobileOtpInput) {
//         mobileOtpInput.value = "000000";
//       }

//       emailOtpInput.value = "";
//       otpSection.style.display = "none";
//       verifyBtn.style.display = "none";
//       pendingFormData = null;
//     } catch (err) {
//       showMessage("verification-error", err.message);
//     } finally {
//       verifyBtn.textContent = "Verify OTP";
//       verifyBtn.disabled = false;
//     }
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

  const API_BASE_URL = "https://gcarecouncil.in/api";

  let pendingFormData = null;
  let isEmailOtpVerified = false;
  let isMobileOtpVerified = false;

  function showMessage(type, message) {
    if (!verificationMessages || !verificationInfo) return;

    verificationMessages.style.display = "block";
    verificationInfo.className = type;
    verificationInfo.textContent = message;
  }

  function hideMessage() {
    if (!verificationMessages || !verificationInfo) return;

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
    const emailOtp = emailOtpInput ? emailOtpInput.value.trim() : "";
    const mobileOtp = mobileOtpInput ? mobileOtpInput.value.trim() : "";

    if (emailOtp.length === 6 && mobileOtp.length === 6) {
      verifyBtn.style.display = "block";
    } else {
      verifyBtn.style.display = "none";
    }
  }

  function allowOnlyManualDigits(inputElement) {
    if (!inputElement) return;

    inputElement.setAttribute("autocomplete", "off");
    inputElement.setAttribute("inputmode", "numeric");
    inputElement.setAttribute("pattern", "[0-9]*");

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
        showMessage(
          "verification-error",
          "Paste is not allowed. Please type the OTP manually."
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

    inputElement.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 6);
      checkOtpInputs();
    });

    inputElement.addEventListener("paste", function (event) {
      event.preventDefault();
      showMessage(
        "verification-error",
        "Paste is not allowed. Please type the OTP manually."
      );
    });

    inputElement.addEventListener("drop", function (event) {
      event.preventDefault();
      showMessage(
        "verification-error",
        "Drag and drop is not allowed. Please type the OTP manually."
      );
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

  function resetOtpState() {
    isEmailOtpVerified = false;
    isMobileOtpVerified = false;

    if (emailOtpInput) emailOtpInput.value = "";
    if (mobileOtpInput) mobileOtpInput.value = "";

    if (verifyBtn) {
      verifyBtn.style.display = "none";
      verifyBtn.textContent = "Verify OTP";
      verifyBtn.disabled = false;
    }
  }

  async function sendEmailOtp(formData) {
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

    const data = await readJsonResponse(res, "Send email OTP API error.");

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Email OTP sending failed.");
    }

    return data;
  }

  async function sendMobileOtp(formData) {
    const res = await fetch(`${API_BASE_URL}/send-mobile-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mobile: formData.mobile
      })
    });

    const data = await readJsonResponse(res, "Send mobile OTP API error.");

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Mobile OTP sending failed.");
    }

    return data;
  }

  async function verifyEmailOtp(formData, enteredEmailOtp) {
    const verifyRes = await fetch(`${API_BASE_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        otp: enteredEmailOtp
      })
    });

    const verifyData = await readJsonResponse(
      verifyRes,
      "Verify email OTP API error."
    );

    if (!verifyRes.ok || !verifyData.success) {
      throw new Error(verifyData.message || "Email OTP verification failed.");
    }

    return verifyData;
  }

  async function verifyMobileOtp(formData, enteredMobileOtp) {
    const verifyRes = await fetch(`${API_BASE_URL}/verify-mobile-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mobile: formData.mobile,
        otp: enteredMobileOtp
      })
    });

    const verifyData = await readJsonResponse(
      verifyRes,
      "Verify mobile OTP API error."
    );

    if (!verifyRes.ok || !verifyData.success) {
      throw new Error(verifyData.message || "Mobile OTP verification failed.");
    }

    return verifyData;
  }

  async function submitContactForm(formData) {
    const submitRes = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const submitData = await readJsonResponse(
      submitRes,
      "Contact submit API error."
    );

    if (!submitRes.ok || !submitData.success) {
      throw new Error(submitData.message || "Form submit failed.");
    }

    return submitData;
  }

  if (!enquiryForm) {
    console.error("enquiryForm not found. Please check contact.html.");
    return;
  }

  allowOnlyManualDigits(emailOtpInput);
  allowOnlyManualDigits(mobileOtpInput);

  if (mobileOtpInput) {
    mobileOtpInput.readOnly = false;
    mobileOtpInput.value = "";
    mobileOtpInput.placeholder = "Enter mobile OTP";
    mobileOtpInput.style.opacity = "1";
    mobileOtpInput.style.cursor = "text";
  }

  if (emailOtpInput) {
    emailOtpInput.placeholder = "Enter email OTP";
  }

  if (verifyBtn) {
    verifyBtn.style.display = "none";
  }

  if (mobileInput) {
    mobileInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
      resetOtpState();
    });

    mobileInput.addEventListener("paste", function (event) {
      event.preventDefault();

      const pastedValue = event.clipboardData.getData("text");
      this.value = pastedValue.replace(/[^0-9]/g, "").slice(0, 10);
      resetOtpState();
    });
  }

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
      resetOtpState();

      submitBtn.textContent = "Sending OTP...";
      submitBtn.disabled = true;

      await sendEmailOtp(formData);
      await sendMobileOtp(formData);

      if (otpSection) {
        otpSection.style.display = "block";
      }

      showMessage(
        "verification-info",
        `Email OTP has been sent to ${formData.email}. Mobile OTP has been sent to ${formData.mobile}. Please type both OTPs manually.`
      );
    } catch (err) {
      pendingFormData = null;
      showMessage("verification-error", err.message);
    } finally {
      submitBtn.textContent = "Submit";
      submitBtn.disabled = false;
    }
  });

  if (verifyBtn) {
    verifyBtn.addEventListener("click", async function () {
      const enteredEmailOtp = emailOtpInput.value.trim();
      const enteredMobileOtp = mobileOtpInput.value.trim();

      if (!pendingFormData) {
        showMessage("verification-error", "Please submit the form first.");
        return;
      }

      if (!/^[0-9]{6}$/.test(enteredEmailOtp)) {
        showMessage("verification-error", "Please enter a valid 6-digit email OTP.");
        return;
      }

      if (!/^[0-9]{6}$/.test(enteredMobileOtp)) {
        showMessage("verification-error", "Please enter a valid 6-digit mobile OTP.");
        return;
      }

      verifyBtn.textContent = "Verifying...";
      verifyBtn.disabled = true;

      try {
        await verifyEmailOtp(pendingFormData, enteredEmailOtp);
        isEmailOtpVerified = true;

        await verifyMobileOtp(pendingFormData, enteredMobileOtp);
        isMobileOtpVerified = true;

        if (!isEmailOtpVerified || !isMobileOtpVerified) {
          throw new Error("OTP verification failed. Please try again.");
        }

        await submitContactForm(pendingFormData);

        showMessage(
          "verification-success",
          "Email OTP and mobile OTP verified successfully. Form submitted successfully."
        );

        enquiryForm.reset();

        if (mobileOtpInput) {
          mobileOtpInput.value = "";
        }

        if (emailOtpInput) {
          emailOtpInput.value = "";
        }

        if (otpSection) {
          otpSection.style.display = "none";
        }

        verifyBtn.style.display = "none";
        pendingFormData = null;
        isEmailOtpVerified = false;
        isMobileOtpVerified = false;
      } catch (err) {
        isEmailOtpVerified = false;
        isMobileOtpVerified = false;
        showMessage("verification-error", err.message);
      } finally {
        verifyBtn.textContent = "Verify OTP";
        verifyBtn.disabled = false;
      }
    });
  }
});