// document.addEventListener("DOMContentLoaded", function () {
//   const enquiryForm = document.getElementById("enquiryForm");
//   const otpSection = document.getElementById("otpSection");
//   const mobileOtpInput = document.getElementById("mobileOtpInput");
//   const emailOtpInput = document.getElementById("emailOtpInput");
//   const verifyBtn = document.getElementById("verifyBtn");
//   const verificationMessages = document.getElementById("verificationMessages");
//   const verificationInfo = document.getElementById("verificationInfo");
//   const submitBtn = document.querySelector(".submit-btn");

//   const DEMO_MOBILE_OTP = "123456";
//   const DEMO_EMAIL_OTP = "654321";
//   const API_BASE_URL = "https://backend-2kz6.onrender.com/api/contact";

//   let pendingFormData = null;
//   let isSubmitting = false;

//   if (!enquiryForm) {
//     console.error("Enquiry form not found");
//     return;
//   }

//   function showMessage(type, html) {
//     if (!verificationMessages || !verificationInfo) return;
//     verificationMessages.style.display = "block";
//     verificationInfo.className = type;
//     verificationInfo.innerHTML = html;
//   }

//   function hideMessage() {
//     if (!verificationMessages || !verificationInfo) return;
//     verificationMessages.style.display = "none";
//     verificationInfo.className = "";
//     verificationInfo.innerHTML = "";
//   }

//   function resetOtpSection() {
//     if (otpSection) otpSection.style.display = "none";
//     if (mobileOtpInput) mobileOtpInput.value = "";
//     if (emailOtpInput) emailOtpInput.value = "";
//     if (verifyBtn) {
//       verifyBtn.style.display = "none";
//       verifyBtn.disabled = false;
//       verifyBtn.textContent = "Verify";
//     }
//   }

//   function resetFullForm() {
//     enquiryForm.reset();
//     resetOtpSection();
//     hideMessage();
//     pendingFormData = null;
//     isSubmitting = false;

//     if (submitBtn) {
//       submitBtn.disabled = false;
//       submitBtn.textContent = "Submit";
//     }
//   }

//   function validateForm(data) {
//     const errors = [];

//     if (!data.fullName || data.fullName.length < 2) {
//       errors.push("Please enter your full name with at least 2 characters.");
//     }

//     const mobileRegex = /^[6-9]\d{9}$/;
//     if (!data.mobile) {
//       errors.push("Please enter your mobile number.");
//     } else if (!mobileRegex.test(data.mobile)) {
//       errors.push("Please enter a valid 10-digit mobile number starting with 6 to 9.");
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!data.email) {
//       errors.push("Please enter your email address.");
//     } else if (!emailRegex.test(data.email)) {
//       errors.push("Please enter a valid email address.");
//     }

//     if (!data.address || data.address.length < 5) {
//       errors.push("Please enter your address with at least 5 characters.");
//     }

//     if (!data.city || data.city.length < 2) {
//       errors.push("Please enter your city with at least 2 characters.");
//     }

//     if (!data.message || data.message.length < 10) {
//       errors.push("Please enter your message with at least 10 characters.");
//     }

//     if (errors.length > 0) {
//       showMessage(
//         "verification-error",
//         errors.map((error) => `<div>❌ ${error}</div>`).join("")
//       );
//       return false;
//     }

//     return true;
//   }

//   enquiryForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     if (isSubmitting) return;

//     hideMessage();

//     const formData = {
//       fullName: document.getElementById("fullName")?.value.trim() || "",
//       mobile: document.getElementById("mobile")?.value.trim() || "",
//       email: document.getElementById("email")?.value.trim() || "",
//       address: document.getElementById("address")?.value.trim() || "",
//       city: document.getElementById("city")?.value.trim() || "",
//       message: document.getElementById("message")?.value.trim() || ""
//     };

//     if (!validateForm(formData)) {
//       return;
//     }

//     pendingFormData = formData;
//     isSubmitting = true;

//     if (submitBtn) {
//       submitBtn.disabled = true;
//       submitBtn.textContent = "Sending OTP...";
//     }

//     setTimeout(() => {
//       if (otpSection) otpSection.style.display = "block";

//       showMessage(
//         "verification-info",
//         `
//           <div style="margin-bottom: 10px;">✅ OTP has been sent to your mobile number: <strong>${formData.mobile}</strong></div>
//           <div style="margin-bottom: 10px;">✅ OTP has been sent to your email address: <strong>${formData.email}</strong></div>
//           <div>Please enter both OTPs below to verify your mobile and email.</div>
//         `
//       );

//       if (submitBtn) {
//         submitBtn.disabled = false;
//         submitBtn.textContent = "Submit";
//       }

//       isSubmitting = false;

//       if (mobileOtpInput) {
//         mobileOtpInput.focus();
//       }
//     }, 1000);
//   });

//   function checkOtpInputs() {
//     if (!mobileOtpInput || !emailOtpInput || !verifyBtn) return;

//     const mobileOtpValue = mobileOtpInput.value.trim();
//     const emailOtpValue = emailOtpInput.value.trim();

//     verifyBtn.style.display =
//       mobileOtpValue.length > 0 && emailOtpValue.length > 0 ? "block" : "none";
//   }

//   if (mobileOtpInput) {
//     mobileOtpInput.addEventListener("input", function () {
//       this.value = this.value.replace(/\D/g, "").slice(0, 6);
//       checkOtpInputs();
//     });
//   }

//   if (emailOtpInput) {
//     emailOtpInput.addEventListener("input", function () {
//       this.value = this.value.replace(/\D/g, "").slice(0, 6);
//       checkOtpInputs();
//     });
//   }

//   if (verifyBtn) {
//     verifyBtn.addEventListener("click", async function () {
//       if (!pendingFormData) {
//         showMessage(
//           "verification-error",
//           `<div>❌ No form data found. Please fill and submit the form again.</div>`
//         );
//         return;
//       }

//       const enteredMobileOtp = mobileOtpInput?.value.trim() || "";
//       const enteredEmailOtp = emailOtpInput?.value.trim() || "";

//       const originalText = this.textContent;
//       this.textContent = "Verifying...";
//       this.disabled = true;

//       setTimeout(async () => {
//         const mobileValid = enteredMobileOtp === DEMO_MOBILE_OTP;
//         const emailValid = enteredEmailOtp === DEMO_EMAIL_OTP;

//         if (mobileValid && emailValid) {
//           showMessage(
//             "verification-success",
//             `
//               <div style="margin-bottom: 10px;">✅ <strong>Mobile OTP verified successfully</strong></div>
//               <div style="margin-bottom: 10px;">✅ <strong>Email OTP verified successfully</strong></div>
//               <div>Submitting your contact details...</div>
//             `
//           );

//           try {
//             const response = await fetch(API_BASE_URL, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json"
//               },
//               body: JSON.stringify(pendingFormData)
//             });

//             const contentType = response.headers.get("content-type");
//             let result;

//             if (contentType && contentType.includes("application/json")) {
//               result = await response.json();
//             } else {
//               throw new Error("Server did not return valid JSON.");
//             }

//             if (!response.ok) {
//               throw new Error(result.error || result.message || "Failed to submit contact form.");
//             }

//             showMessage(
//               "verification-success",
//               `
//                 <div style="margin-bottom: 10px;">✅ <strong>Mobile OTP verified successfully</strong></div>
//                 <div style="margin-bottom: 10px;">✅ <strong>Email OTP verified successfully</strong></div>
//                 <div style="margin-bottom: 10px;">✅ <strong>Your contact details have been submitted successfully.</strong></div>
//               `
//             );

//             setTimeout(() => {
//               resetFullForm();
//             }, 2500);
//           } catch (error) {
//             console.error("Backend submission failed:", error);
//             showMessage(
//               "verification-error",
//               `
//                 <div>❌ <strong>Backend submission failed</strong></div>
//                 <div style="margin-top: 8px;">${error.message}</div>
//               `
//             );
//           }
//         } else {
//           const errors = [];

//           if (!mobileValid) {
//             errors.push("Invalid Mobile OTP");
//           }

//           if (!emailValid) {
//             errors.push("Invalid Email OTP");
//           }

//           showMessage(
//             "verification-error",
//             `
//               ${errors.map((error) => `<div>❌ <strong>${error}</strong></div>`).join("")}
//               <div style="margin-top: 15px; font-size: 14px; padding: 10px; background: rgba(244, 208, 63, 0.1); border-radius: 5px;">
//                 Demo Mobile OTP: <strong>${DEMO_MOBILE_OTP}</strong><br>
//                 Demo Email OTP: <strong>${DEMO_EMAIL_OTP}</strong>
//               </div>
//             `
//           );

//           if (!mobileValid && mobileOtpInput) {
//             mobileOtpInput.value = "";
//             mobileOtpInput.focus();
//           }

//           if (!emailValid && emailOtpInput) {
//             emailOtpInput.value = "";
//             if (mobileValid) {
//               emailOtpInput.focus();
//             }
//           }

//           verifyBtn.style.display = "none";
//         }

//         this.textContent = originalText;
//         this.disabled = false;
//       }, 1000);
//     });
//   }

//   const inputs = enquiryForm.querySelectorAll("input, textarea");
//   inputs.forEach((input) => {
//     input.addEventListener("blur", function () {
//       const formData = {
//         fullName: document.getElementById("fullName")?.value.trim() || "",
//         mobile: document.getElementById("mobile")?.value.trim() || "",
//         email: document.getElementById("email")?.value.trim() || "",
//         address: document.getElementById("address")?.value.trim() || "",
//         city: document.getElementById("city")?.value.trim() || "",
//         message: document.getElementById("message")?.value.trim() || ""
//       };

//       validateForm(formData);
//     });
//   });

//   const mobileInput = document.getElementById("mobile");
//   if (mobileInput) {
//     mobileInput.addEventListener("input", function () {
//       this.value = this.value.replace(/\D/g, "").slice(0, 10);
//     });
//   }
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

  const API_BASE_URL = "https://backend-2kz6.onrender.com/api/contact";
  const OTP_API = "https://backend-2kz6.onrender.com/api/otp/send-otp";

  let pendingFormData = null;
  let isSubmitting = false;

  function showMessage(type, html) {
    verificationMessages.style.display = "block";
    verificationInfo.className = type;
    verificationInfo.innerHTML = html;
  }

  function hideMessage() {
    verificationMessages.style.display = "none";
    verificationInfo.innerHTML = "";
  }

  function resetOtpSection() {
    otpSection.style.display = "none";
    mobileOtpInput.value = "";
    emailOtpInput.value = "";
    verifyBtn.style.display = "none";
  }

  function resetFullForm() {
    enquiryForm.reset();
    resetOtpSection();
    hideMessage();
    pendingFormData = null;
    isSubmitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }

  enquiryForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (isSubmitting) return;

    hideMessage();

    const formData = {
      fullName: document.getElementById("fullName").value.trim(),
      mobile: document.getElementById("mobile").value.trim(),
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim(),
      city: document.getElementById("city").value.trim(),
      message: document.getElementById("message").value.trim()
    };

    pendingFormData = formData;
    isSubmitting = true;

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending OTP...";

    try {
      const response = await fetch(OTP_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP failed");
      }

      otpSection.style.display = "block";

      showMessage(
        "verification-info",
        `✅ OTP sent to your email: <strong>${formData.email}</strong>`
      );

    } catch (error) {
      showMessage("verification-error", `❌ ${error.message}`);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
    isSubmitting = false;
  });

  function checkOtpInputs() {
    const mobileOtpValue = mobileOtpInput.value.trim();
    const emailOtpValue = emailOtpInput.value.trim();

    verifyBtn.style.display =
      mobileOtpValue.length === 6 && emailOtpValue.length === 6
        ? "block"
        : "none";
  }

  mobileOtpInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
    checkOtpInputs();
  });

  emailOtpInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
    checkOtpInputs();
  });

  verifyBtn.addEventListener("click", async function () {
    if (!pendingFormData) return;

    const enteredEmailOtp = emailOtpInput.value.trim();

    if (enteredEmailOtp.length !== 6) {
      showMessage("verification-error", "❌ Enter valid OTP");
      return;
    }

    showMessage(
      "verification-success",
      "✅ OTP verified (demo). Submitting data..."
    );

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(pendingFormData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submit failed");
      }

      showMessage(
        "verification-success",
        "✅ Form submitted successfully!"
      );

      setTimeout(resetFullForm, 2000);

    } catch (error) {
      showMessage("verification-error", `❌ ${error.message}`);
    }
  });
});