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

//   const API_BASE_URL = "https://backend-production-c5cb.up.railway.app/api";

//   let pendingFormData = null;
//   let isEmailOtpVerified = false;
//   let isMobileOtpVerified = false;

//   function showMessage(type, message) {
//     if (!verificationMessages || !verificationInfo) return;

//     verificationMessages.style.display = "block";
//     verificationInfo.className = type;
//     verificationInfo.textContent = message;
//   }

//   function hideMessage() {
//     if (!verificationMessages || !verificationInfo) return;

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
//     const emailOtp = emailOtpInput ? emailOtpInput.value.trim() : "";
//     const mobileOtp = mobileOtpInput ? mobileOtpInput.value.trim() : "";

//     if (emailOtp.length === 6 && mobileOtp.length === 6) {
//       verifyBtn.style.display = "block";
//     } else {
//       verifyBtn.style.display = "none";
//     }
//   }

//   function allowOnlyManualDigits(inputElement) {
//     if (!inputElement) return;

//     inputElement.setAttribute("autocomplete", "off");
//     inputElement.setAttribute("inputmode", "numeric");
//     inputElement.setAttribute("pattern", "[0-9]*");

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
//         showMessage(
//           "verification-error",
//           "Paste is not allowed. Please type the OTP manually."
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

//     inputElement.addEventListener("input", function () {
//       this.value = this.value.replace(/[^0-9]/g, "").slice(0, 6);
//       checkOtpInputs();
//     });

//     inputElement.addEventListener("paste", function (event) {
//       event.preventDefault();
//       showMessage(
//         "verification-error",
//         "Paste is not allowed. Please type the OTP manually."
//       );
//     });

//     inputElement.addEventListener("drop", function (event) {
//       event.preventDefault();
//       showMessage(
//         "verification-error",
//         "Drag and drop is not allowed. Please type the OTP manually."
//       );
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

//   function resetOtpState() {
//     isEmailOtpVerified = false;
//     isMobileOtpVerified = false;

//     if (emailOtpInput) emailOtpInput.value = "";
//     if (mobileOtpInput) mobileOtpInput.value = "";

//     if (verifyBtn) {
//       verifyBtn.style.display = "none";
//       verifyBtn.textContent = "Verify OTP";
//       verifyBtn.disabled = false;
//     }
//   }

//   async function sendEmailOtp(formData) {
//     const res = await fetch(`${API_BASE_URL}/send-otp`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: formData.email,
//         mobile: formData.mobile
//       })
//     });

//     const data = await readJsonResponse(
//       res,
//       "Send email OTP API error."
//     );

//     if (!res.ok || !data.success) {
//       throw new Error(
//         data.message || "Email OTP sending failed."
//       );
//     }

//     return data;
//   }

//   async function sendMobileOtp(formData) {
//     const res = await fetch(`${API_BASE_URL}/send-mobile-otp`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         mobile: formData.mobile
//       })
//     });

//     const data = await readJsonResponse(
//       res,
//       "Send mobile OTP API error."
//     );

//     if (!res.ok || !data.success) {
//       throw new Error(
//         data.message || "Mobile OTP sending failed."
//       );
//     }

//     return data;
//   }

//   async function verifyEmailOtp(formData, enteredEmailOtp) {
//     const verifyRes = await fetch(`${API_BASE_URL}/verify-otp`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         email: formData.email,
//         otp: enteredEmailOtp
//       })
//     });

//     const verifyData = await readJsonResponse(
//       verifyRes,
//       "Verify email OTP API error."
//     );

//     if (!verifyRes.ok || !verifyData.success) {
//       throw new Error(
//         verifyData.message || "Email OTP verification failed."
//       );
//     }

//     return verifyData;
//   }

//   async function verifyMobileOtp(formData, enteredMobileOtp) {
//     const verifyRes = await fetch(`${API_BASE_URL}/verify-mobile-otp`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         mobile: formData.mobile,
//         otp: enteredMobileOtp
//       })
//     });

//     const verifyData = await readJsonResponse(
//       verifyRes,
//       "Verify mobile OTP API error."
//     );

//     if (!verifyRes.ok || !verifyData.success) {
//       throw new Error(
//         verifyData.message || "Mobile OTP verification failed."
//       );
//     }

//     return verifyData;
//   }

//   async function submitContactForm(formData) {
//     const submitRes = await fetch(`${API_BASE_URL}/contact`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(formData)
//     });

//     const submitData = await readJsonResponse(
//       submitRes,
//       "Contact submit API error."
//     );

//     if (!submitRes.ok || !submitData.success) {
//       throw new Error(
//         submitData.message || "Form submit failed."
//       );
//     }

//     return submitData;
//   }

//   if (!enquiryForm) {
//     console.error(
//       "enquiryForm not found. Please check contact.html."
//     );
//     return;
//   }

//   allowOnlyManualDigits(emailOtpInput);
//   allowOnlyManualDigits(mobileOtpInput);

//   if (mobileOtpInput) {
//     mobileOtpInput.readOnly = false;
//     mobileOtpInput.value = "";
//     mobileOtpInput.placeholder = "Enter mobile OTP";
//     mobileOtpInput.style.opacity = "1";
//     mobileOtpInput.style.cursor = "text";
//   }

//   if (emailOtpInput) {
//     emailOtpInput.placeholder = "Enter email OTP";
//   }

//   if (verifyBtn) {
//     verifyBtn.style.display = "none";
//   }

//   if (mobileInput) {
//     mobileInput.addEventListener("input", function () {
//       this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
//       resetOtpState();
//     });

//     mobileInput.addEventListener("paste", function (event) {
//       event.preventDefault();

//       const pastedValue = event.clipboardData.getData("text");
//       this.value = pastedValue.replace(/[^0-9]/g, "").slice(0, 10);
//       resetOtpState();
//     });
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

//     try {
//       validateMainForm(formData);

//       pendingFormData = formData;
//       resetOtpState();

//       submitBtn.textContent = "Sending OTP...";
//       submitBtn.disabled = true;

//       await sendEmailOtp(formData);
//       await sendMobileOtp(formData);

//       if (otpSection) {
//         otpSection.style.display = "block";
//       }

//       showMessage(
//         "verification-info",
//         `Email OTP has been sent to ${formData.email}. Mobile OTP has been sent to ${formData.mobile}. Please type both OTPs manually.`
//       );
//     } catch (err) {
//       pendingFormData = null;
//       showMessage(
//         "verification-error",
//         err.message
//       );
//     } finally {
//       submitBtn.textContent = "Submit";
//       submitBtn.disabled = false;
//     }
//   });

//   if (verifyBtn) {
//     verifyBtn.addEventListener("click", async function () {
//       const enteredEmailOtp = emailOtpInput.value.trim();
//       const enteredMobileOtp = mobileOtpInput.value.trim();

//       if (!pendingFormData) {
//         showMessage(
//           "verification-error",
//           "Please submit the form first."
//         );
//         return;
//       }

//       if (!/^[0-9]{6}$/.test(enteredEmailOtp)) {
//         showMessage(
//           "verification-error",
//           "Please enter a valid 6-digit email OTP."
//         );
//         return;
//       }

//       if (!/^[0-9]{6}$/.test(enteredMobileOtp)) {
//         showMessage(
//           "verification-error",
//           "Please enter a valid 6-digit mobile OTP."
//         );
//         return;
//       }

//       verifyBtn.textContent = "Verifying...";
//       verifyBtn.disabled = true;

//       try {
//         await verifyEmailOtp(
//           pendingFormData,
//           enteredEmailOtp
//         );

//         isEmailOtpVerified = true;

//         await verifyMobileOtp(
//           pendingFormData,
//           enteredMobileOtp
//         );

//         isMobileOtpVerified = true;

//         if (
//           !isEmailOtpVerified ||
//           !isMobileOtpVerified
//         ) {
//           throw new Error(
//             "OTP verification failed. Please try again."
//           );
//         }

//         await submitContactForm(
//           pendingFormData
//         );

//         showMessage(
//           "verification-success",
//           "Email OTP and mobile OTP verified successfully. Form submitted successfully."
//         );

//         enquiryForm.reset();

//         if (mobileOtpInput) {
//           mobileOtpInput.value = "";
//         }

//         if (emailOtpInput) {
//           emailOtpInput.value = "";
//         }

//         if (otpSection) {
//           otpSection.style.display = "none";
//         }

//         verifyBtn.style.display = "none";
//         pendingFormData = null;
//         isEmailOtpVerified = false;
//         isMobileOtpVerified = false;
//       } catch (err) {
//         isEmailOtpVerified = false;
//         isMobileOtpVerified = false;

//         showMessage(
//           "verification-error",
//           err.message
//         );
//       } finally {
//         verifyBtn.textContent = "Verify OTP";
//         verifyBtn.disabled = false;
//       }
//     });
//   }
// });


document.addEventListener(
  "DOMContentLoaded",
  function () {

    const API_BASE_URL =
      ["localhost", "127.0.0.1"].includes(location.hostname)
        ? "http://localhost:3000/api"
        : "https://backend-production-c5cb.up.railway.app/api";


    const enquiryForm =
      document.getElementById(
        "enquiryForm"
      );

    const submitBtn =
      document.getElementById(
        "submitBtn"
      );

    const otpSection =
      document.getElementById(
        "otpSection"
      );

    const emailOtpInput =
      document.getElementById(
        "emailOtpInput"
      );

    const mobileOtpInput =
      document.getElementById(
        "mobileOtpInput"
      );

    const verifyBtn =
      document.getElementById(
        "verifyBtn"
      );

    const verificationMessages =
      document.getElementById(
        "verificationMessages"
      );

    const verificationInfo =
      document.getElementById(
        "verificationInfo"
      );

    const fullNameInput =
      document.getElementById(
        "fullName"
      );

    const mobileInput =
      document.getElementById(
        "mobile"
      );

    const emailInput =
      document.getElementById(
        "email"
      );

    const addressInput =
      document.getElementById(
        "address"
      );

    const cityInput =
      document.getElementById(
        "city"
      );

    const messageInput =
      document.getElementById(
        "message"
      );


    let pendingFormData = null;

    let emailOtpVerified = false;

    let mobileOtpVerified = false;

    let otpsSent = false;


    if (!enquiryForm) {
      console.error(
        "Contact form not found."
      );

      return;
    }


    function showMessage(
      type,
      message
    ) {
      if (
        !verificationMessages ||
        !verificationInfo
      ) {
        return;
      }

      verificationMessages.style.display =
        "block";

      verificationInfo.className =
        type;

      verificationInfo.textContent =
        message;
    }


    function hideMessage() {
      if (
        !verificationMessages ||
        !verificationInfo
      ) {
        return;
      }

      verificationMessages.style.display =
        "none";

      verificationInfo.textContent =
        "";

      verificationInfo.className =
        "verification-info";
    }


    function getFormData() {
      return {
        fullName:
          fullNameInput.value.trim(),

        mobile:
          mobileInput.value.trim(),

        email:
          emailInput.value
            .trim()
            .toLowerCase(),

        address:
          addressInput.value.trim(),

        city:
          cityInput.value.trim(),

        message:
          messageInput.value.trim()
      };
    }


    function validateMainForm(
      data
    ) {

      if (!data.fullName) {
        throw new Error(
          "Please enter your full name."
        );
      }


      if (
        !/^[A-Za-z][A-Za-z\s.'-]*$/.test(
          data.fullName
        )
      ) {
        throw new Error(
          "Please enter a valid full name."
        );
      }


      if (!data.mobile) {
        throw new Error(
          "Please enter your mobile number."
        );
      }


      if (
        !/^[6-9][0-9]{9}$/.test(
          data.mobile
        )
      ) {
        throw new Error(
          "Please enter a valid 10-digit Indian mobile number."
        );
      }


      if (
        /^(\d)\1{9}$/.test(
          data.mobile
        )
      ) {
        throw new Error(
          "Please enter a valid mobile number."
        );
      }


      if (!data.email) {
        throw new Error(
          "Please enter your email address."
        );
      }


      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
          data.email
        )
      ) {
        throw new Error(
          "Please enter a valid email address."
        );
      }


      if (!data.address) {
        throw new Error(
          "Please enter your address."
        );
      }


      if (
        data.address.length < 5
      ) {
        throw new Error(
          "Please enter a valid address."
        );
      }


      if (!data.city) {
        throw new Error(
          "Please enter your city."
        );
      }


      if (
        !/^[A-Za-z\s.'-]+$/.test(
          data.city
        )
      ) {
        throw new Error(
          "Please enter a valid city name."
        );
      }


      if (!data.message) {
        throw new Error(
          "Please enter your message."
        );
      }


      if (
        data.message.length < 3
      ) {
        throw new Error(
          "Message must contain at least 3 characters."
        );
      }
    }


    async function readApiResponse(
      response,
      fallbackMessage
    ) {
      const contentType =
        response.headers.get(
          "content-type"
        ) || "";


      if (
        contentType.includes(
          "application/json"
        )
      ) {
        return await response.json();
      }


      const text =
        await response.text();


      console.error(
        "Non JSON response:",
        text
      );


      throw new Error(
        fallbackMessage
      );
    }


    async function sendEmailOtp(
      data
    ) {
      console.log(
        "SEND EMAIL OTP PAYLOAD:",
        {
          email:
            data.email,

          mobile:
            data.mobile
        }
      );


      const response =
        await fetch(
          `${API_BASE_URL}/send-otp`,
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
                  data.email,

                mobile:
                  data.mobile
              })
          }
        );


      const result =
        await readApiResponse(
          response,
          "Unable to send email OTP."
        );


      console.log(
        "EMAIL OTP RESPONSE:",
        result
      );


      if (
        !response.ok ||
        result.success === false
      ) {
        throw new Error(
          result.message ||
          "Email OTP sending failed."
        );
      }


      return result;
    }


    async function sendMobileOtp(
      data
    ) {
      console.log(
        "SEND MOBILE OTP PAYLOAD:",
        {
          mobile:
            data.mobile,

          email:
            data.email
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
                  data.mobile,

                email:
                  data.email
              })
          }
        );


      const result =
        await readApiResponse(
          response,
          "Unable to send mobile OTP."
        );


      console.log(
        "MOBILE OTP RESPONSE:",
        result
      );


      if (
        !response.ok ||
        result.success === false
      ) {
        throw new Error(
          result.message ||
          "Mobile OTP sending failed."
        );
      }


      return result;
    }


    async function verifyEmailOtp(
      data,
      otp
    ) {
      const response =
        await fetch(
          `${API_BASE_URL}/verify-otp`,
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
                  data.email,

                otp:
                  otp
              })
          }
        );


      const result =
        await readApiResponse(
          response,
          "Unable to verify email OTP."
        );


      if (
        !response.ok ||
        result.success === false
      ) {
        throw new Error(
          result.message ||
          "Email OTP verification failed."
        );
      }


      return result;
    }


    async function verifyMobileOtp(
      data,
      otp
    ) {
      console.log(
        "VERIFY MOBILE OTP PAYLOAD:",
        {
          mobile:
            data.mobile,

          email:
            data.email,

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
                  data.mobile,

                email:
                  data.email,

                otp:
                  otp
              })
          }
        );


      const result =
        await readApiResponse(
          response,
          "Unable to verify mobile OTP."
        );


      if (
        !response.ok ||
        result.success === false
      ) {
        throw new Error(
          result.message ||
          "Mobile OTP verification failed."
        );
      }


      return result;
    }


    async function submitContactForm(
      data
    ) {
      const response =
        await fetch(
          `${API_BASE_URL}/contact`,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify({
                fullName:
                  data.fullName,

                mobile:
                  data.mobile,

                email:
                  data.email,

                address:
                  data.address,

                city:
                  data.city,

                message:
                  data.message
              })
          }
        );


      const result =
        await readApiResponse(
          response,
          "Unable to submit contact form."
        );


      if (
        !response.ok ||
        result.success === false
      ) {
        throw new Error(
          result.message ||
          "Contact form submission failed."
        );
      }


      return result;
    }


    function resetOtpState() {
      emailOtpVerified =
        false;

      mobileOtpVerified =
        false;

      otpsSent =
        false;


      if (emailOtpInput) {
        emailOtpInput.value =
          "";
      }


      if (mobileOtpInput) {
        mobileOtpInput.value =
          "";
      }


      if (verifyBtn) {
        verifyBtn.style.display =
          "none";

        verifyBtn.disabled =
          false;

        verifyBtn.textContent =
          "Verify OTP";
      }


      if (submitBtn) {
        submitBtn.textContent =
          "Submit";
      }
    }


    function checkOtpInputs() {
      if (
        !emailOtpInput ||
        !mobileOtpInput ||
        !verifyBtn
      ) {
        return;
      }


      const emailOtp =
        emailOtpInput.value.trim();


      const mobileOtp =
        mobileOtpInput.value.trim();


      if (
        /^[0-9]{6}$/.test(
          emailOtp
        ) &&
        /^[0-9]{6}$/.test(
          mobileOtp
        )
      ) {
        verifyBtn.style.display =
          "block";
      } else {
        verifyBtn.style.display =
          "none";
      }
    }


    function setupOtpInput(
      input
    ) {
      if (!input) {
        return;
      }


      input.addEventListener(
        "input",
        function () {
          this.value =
            this.value
              .replace(
                /[^0-9]/g,
                ""
              )
              .slice(
                0,
                6
              );


          checkOtpInputs();
        }
      );


      input.addEventListener(
        "paste",
        function (event) {
          event.preventDefault();


          const text =
            event.clipboardData
              .getData(
                "text"
              );


          this.value =
            text
              .replace(
                /[^0-9]/g,
                ""
              )
              .slice(
                0,
                6
              );


          checkOtpInputs();
        }
      );
    }


    setupOtpInput(
      emailOtpInput
    );


    setupOtpInput(
      mobileOtpInput
    );


    if (mobileInput) {
      mobileInput.addEventListener(
        "input",
        function () {
          this.value =
            this.value
              .replace(
                /[^0-9]/g,
                ""
              )
              .slice(
                0,
                10
              );


          resetOtpState();
        }
      );
    }


    if (emailInput) {
      emailInput.addEventListener(
        "input",
        function () {
          resetOtpState();
        }
      );
    }


    enquiryForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();

        hideMessage();


        const formData =
          getFormData();


        try {
          validateMainForm(
            formData
          );


          pendingFormData = {
            ...formData
          };


          resetOtpState();


          if (submitBtn) {
            submitBtn.disabled =
              true;

            submitBtn.textContent =
              "Sending OTP...";
          }


          showMessage(
            "verification-info",
            "Please wait. Sending OTP to your email and mobile number..."
          );


          /*
            EMAIL OTP
          */
          await sendEmailOtp(
            pendingFormData
          );


          /*
            MOBILE OTP
            IMPORTANT:
            pendingFormData contains BOTH
            mobile and email
          */
          await sendMobileOtp(
            pendingFormData
          );


          if (otpSection) {
            otpSection.style.display =
              "block";


            otpSection.scrollIntoView({
              behavior:
                "smooth",

              block:
                "center"
            });
          }


          showMessage(
            "verification-info",
            `OTP sent successfully to ${pendingFormData.email} and ${pendingFormData.mobile}. Please enter both OTPs.`
          );


          otpsSent =
            true;


        } catch (error) {

          console.error(
            "SEND OTP ERROR:",
            error
          );


          showMessage(
            "verification-error",
            error.message ||
            "Unable to send OTP."
          );


        } finally {

          if (submitBtn) {
            submitBtn.disabled =
              false;

            submitBtn.textContent =
              otpsSent
                ? "RESEND OTP"
                : "Submit";
          }

        }
      }
    );


    if (verifyBtn) {
      verifyBtn.addEventListener(
        "click",
        async function () {

          hideMessage();


          if (
            !pendingFormData
          ) {
            showMessage(
              "verification-error",
              "Please submit the contact form first."
            );

            return;
          }


          const emailOtp =
            emailOtpInput
              ? emailOtpInput.value.trim()
              : "";


          const mobileOtp =
            mobileOtpInput
              ? mobileOtpInput.value.trim()
              : "";


          if (
            !/^[0-9]{6}$/.test(
              emailOtp
            )
          ) {
            showMessage(
              "verification-error",
              "Please enter a valid 6-digit email OTP."
            );

            return;
          }


          if (
            !/^[0-9]{6}$/.test(
              mobileOtp
            )
          ) {
            showMessage(
              "verification-error",
              "Please enter a valid 6-digit mobile OTP."
            );

            return;
          }


          try {

            verifyBtn.disabled =
              true;

            verifyBtn.textContent =
              "Verifying...";


            showMessage(
              "verification-info",
              "Verifying email OTP..."
            );


            await verifyEmailOtp(
              pendingFormData,
              emailOtp
            );


            emailOtpVerified =
              true;


            showMessage(
              "verification-info",
              "Email OTP verified. Verifying mobile OTP..."
            );


            await verifyMobileOtp(
              pendingFormData,
              mobileOtp
            );


            mobileOtpVerified =
              true;


            if (
              !emailOtpVerified ||
              !mobileOtpVerified
            ) {
              throw new Error(
                "OTP verification failed."
              );
            }


            showMessage(
              "verification-info",
              "OTP verified successfully. Submitting your enquiry..."
            );


            await submitContactForm(
              pendingFormData
            );


            showMessage(
              "verification-success",
              "Email OTP and mobile OTP verified successfully. Your enquiry has been submitted successfully."
            );


            enquiryForm.reset();


            if (emailOtpInput) {
              emailOtpInput.value =
                "";
            }


            if (mobileOtpInput) {
              mobileOtpInput.value =
                "";
            }


            if (otpSection) {
              otpSection.style.display =
                "none";
            }


            verifyBtn.style.display =
              "none";


            pendingFormData =
              null;

            resetOtpState();


          } catch (error) {

            console.error(
              "VERIFY OTP ERROR:",
              error
            );


            emailOtpVerified =
              false;

            mobileOtpVerified =
              false;


            showMessage(
              "verification-error",
              error.message ||
              "OTP verification failed."
            );


          } finally {

            verifyBtn.disabled =
              false;

            verifyBtn.textContent =
              "Verify OTP";

          }
        }
      );
    }

  }
);