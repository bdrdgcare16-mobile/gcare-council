// const { ContactMessage } = require("../models");

// const createContactMessage = async (data) => {
//   return await ContactMessage.create({
//     fullName: data.fullName,
//     mobile: data.mobile,
//     email: data.email,
//     address: data.address,
//     city: data.city,
//     message: data.message,
//     course: data.course || null,
//     enquiryType: data.enquiryType || null
//   });
// };

// const getAllContactMessages = async () => {
//   return await ContactMessage.findAll({
//     order: [["id", "DESC"]]
//   });
// };

// const getContactMessageById = async (id) => {
//   return await ContactMessage.findByPk(id);
// };

// const updateContactMessage = async (id, data) => {
//   const contact = await ContactMessage.findByPk(id);

//   if (!contact) return null;

//   await contact.update({
//     fullName: data.fullName ?? contact.fullName,
//     mobile: data.mobile ?? contact.mobile,
//     email: data.email ?? contact.email,
//     address: data.address ?? contact.address,
//     city: data.city ?? contact.city,
//     message: data.message ?? contact.message,
//     // course: data.course ?? contact.course,
//     // enquiryType: data.enquiryType ?? contact.enquiryType
//   });

//   return contact;
// };

// const deleteContactMessage = async (id) => {
//   const contact = await ContactMessage.findByPk(id);

//   if (!contact) return null;

//   await contact.destroy();
//   return true;
// };

// module.exports = {
//   createContactMessage,
//   getAllContactMessages,
//   getContactMessageById,
//   updateContactMessage,
//   deleteContactMessage
// };



const {
  ContactMessage
} = require("../models");


/* =====================================================
   CREATE
===================================================== */

const createContactMessage =
  async (data) => {

    console.log(
      "CONTACT SERVICE DATA:",
      data
    );

    if (!data.email) {
      throw new Error(
        "Email is missing before contact database insert."
      );
    }

    return await ContactMessage.create({
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
    });
  };


/* =====================================================
   GET ALL
===================================================== */

const getAllContactMessages =
  async () => {
    return await ContactMessage.findAll({
      order: [
        ["id", "DESC"]
      ]
    });
  };


/* =====================================================
   GET ONE
===================================================== */

const getContactMessageById =
  async (id) => {
    return await ContactMessage.findByPk(
      id
    );
  };


/* =====================================================
   UPDATE
===================================================== */

const updateContactMessage =
  async (id, data) => {

    const contact =
      await ContactMessage.findByPk(
        id
      );

    if (!contact) {
      return null;
    }

    await contact.update({
      fullName:
        data.fullName ??
        contact.fullName,

      mobile:
        data.mobile ??
        contact.mobile,

      email:
        data.email ??
        contact.email,

      address:
        data.address ??
        contact.address,

      city:
        data.city ??
        contact.city,

      message:
        data.message ??
        contact.message
    });

    return contact;
  };


/* =====================================================
   DELETE
===================================================== */

const deleteContactMessage =
  async (id) => {

    const contact =
      await ContactMessage.findByPk(
        id
      );

    if (!contact) {
      return null;
    }

    await contact.destroy();

    return true;
  };


module.exports = {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage
};