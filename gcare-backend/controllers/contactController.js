// const contactService = require("../services/contactService");

// const submitContactForm = async (req, res) => {
//   try {
//     console.log("Incoming contact payload:", req.body);

//     const {
//       fullName,
//       mobile,
//       email,
//       address,
//       city,
//       message,

//       // 🔥 NEW ENQUIRY FIELDS
//       course,
//       enquiryType
//     } = req.body;

//     // 🔴 VALIDATION
//     if (!fullName || !mobile || !email || !address || !city || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All contact fields are required"
//       });
//     }

//     // 🔥 CREATE OBJECT
//     const newContact = await contactService.createContactMessage({
//       fullName: fullName.trim(),
//       mobile: mobile.trim(),
//       email: email.trim(),
//       address: address.trim(),
//       city: city.trim(),
//       message: message.trim(),

//       // // 🔥 SAVE ENQUIRY DATA ALSO
//       // course: course ? course.trim() : null,
//       // enquiryType: enquiryType ? enquiryType.trim() : null
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Contact + Enquiry saved successfully",
//       data: newContact
//     });

//   } catch (error) {
//     console.error("submitContactForm error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to create contact",
//       error: error.message
//     });
//   }
// };

// // ========================
// // GET ALL
// // ========================
// const getAllContactForms = async (_req, res) => {
//   try {
//     const contacts = await contactService.getAllContactMessages();

//     return res.status(200).json({
//       success: true,
//       data: contacts
//     });
//   } catch (error) {
//     console.error("getAllContactForms error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch contacts",
//       error: error.message
//     });
//   }
// };

// // ========================
// // GET BY ID
// // ========================
// const getContactFormById = async (req, res) => {
//   try {
//     const contact = await contactService.getContactMessageById(req.params.id);

//     if (!contact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact not found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: contact
//     });
//   } catch (error) {
//     console.error("getContactFormById error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch contact",
//       error: error.message
//     });
//   }
// };

// // ========================
// // UPDATE
// // ========================
// const updateContactForm = async (req, res) => {
//   try {
//     const updatedContact = await contactService.updateContactMessage(
//       req.params.id,
//       req.body
//     );

//     if (!updatedContact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact not found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Contact updated successfully",
//       data: updatedContact
//     });
//   } catch (error) {
//     console.error("updateContactForm error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to update contact",
//       error: error.message
//     });
//   }
// };

// // ========================
// // DELETE
// // ========================
// const deleteContactForm = async (req, res) => {
//   try {
//     const deletedContact = await contactService.deleteContactMessage(req.params.id);

//     if (!deletedContact) {
//       return res.status(404).json({
//         success: false,
//         message: "Contact not found"
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Contact deleted successfully"
//     });
//   } catch (error) {
//     console.error("deleteContactForm error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to delete contact",
//       error: error.message
//     });
//   }
// };

// module.exports = {
//   submitContactForm,
//   getAllContactForms,
//   getContactFormById,
//   updateContactForm,
//   deleteContactForm
// };



const contactService =
  require("../services/contactService");

/* =====================================================
   CREATE CONTACT
===================================================== */

const submitContactForm =
  async (req, res) => {
    try {
      console.log(
        "Incoming contact payload:",
        req.body
      );

      const {
        fullName,
        mobile,
        email,
        address,
        city,
        message
      } = req.body || {};

      // =========================================
      // VALIDATION
      // =========================================

      if (!fullName) {
        return res.status(400).json({
          success: false,
          message:
            "Full name is required."
        });
      }

      if (!mobile) {
        return res.status(400).json({
          success: false,
          message:
            "Mobile number is required."
        });
      }

      if (!email) {
        return res.status(400).json({
          success: false,
          message:
            "Email address is required."
        });
      }

      if (!address) {
        return res.status(400).json({
          success: false,
          message:
            "Address is required."
        });
      }

      if (!city) {
        return res.status(400).json({
          success: false,
          message:
            "City is required."
        });
      }

      if (!message) {
        return res.status(400).json({
          success: false,
          message:
            "Message is required."
        });
      }

      // =========================================
      // NORMALIZE
      // =========================================

      const payload = {
        fullName:
          String(fullName).trim(),

        mobile:
          String(mobile).trim(),

        email:
          String(email)
            .trim()
            .toLowerCase(),

        address:
          String(address).trim(),

        city:
          String(city).trim(),

        message:
          String(message).trim()
      };

      console.log(
        "Validated contact payload:",
        payload
      );

      // =========================================
      // CREATE
      // =========================================

      const newContact =
        await contactService
          .createContactMessage(
            payload
          );

      return res.status(201).json({
        success: true,
        message:
          "Contact submitted successfully.",
        data: newContact
      });

    } catch (error) {
      console.error(
        "submitContactForm error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to create contact."
      });
    }
  };


/* =====================================================
   GET ALL
===================================================== */

const getAllContactForms =
  async (_req, res) => {
    try {
      const contacts =
        await contactService
          .getAllContactMessages();

      return res.status(200).json({
        success: true,
        data: contacts
      });

    } catch (error) {
      console.error(
        "getAllContactForms error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch contacts."
      });
    }
  };


/* =====================================================
   GET BY ID
===================================================== */

const getContactFormById =
  async (req, res) => {
    try {
      const contact =
        await contactService
          .getContactMessageById(
            req.params.id
          );

      if (!contact) {
        return res.status(404).json({
          success: false,
          message:
            "Contact not found."
        });
      }

      return res.status(200).json({
        success: true,
        data: contact
      });

    } catch (error) {
      console.error(
        "getContactFormById error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch contact."
      });
    }
  };


/* =====================================================
   UPDATE
===================================================== */

const updateContactForm =
  async (req, res) => {
    try {
      const updatedContact =
        await contactService
          .updateContactMessage(
            req.params.id,
            req.body
          );

      if (!updatedContact) {
        return res.status(404).json({
          success: false,
          message:
            "Contact not found."
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Contact updated successfully.",
        data: updatedContact
      });

    } catch (error) {
      console.error(
        "updateContactForm error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update contact."
      });
    }
  };


/* =====================================================
   DELETE
===================================================== */

const deleteContactForm =
  async (req, res) => {
    try {
      const deletedContact =
        await contactService
          .deleteContactMessage(
            req.params.id
          );

      if (!deletedContact) {
        return res.status(404).json({
          success: false,
          message:
            "Contact not found."
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Contact deleted successfully."
      });

    } catch (error) {
      console.error(
        "deleteContactForm error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete contact."
      });
    }
  };


module.exports = {
  submitContactForm,
  getAllContactForms,
  getContactFormById,
  updateContactForm,
  deleteContactForm
};