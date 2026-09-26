const { ContactMessage } = require('../models');
const debugLog = require('../utils/debugLog');

// Create new contact
const createContactMessage = async (data) => {
  try {
    debugLog('QUERY CREATE DATA:', data);

    const result = await ContactMessage.create({
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,
      address: data.address,
      city: data.city,
      message: data.message,
      mobileOtpVerified: data.mobileOtpVerified ?? false,
      emailOtpVerified: data.emailOtpVerified ?? false
    });

    return result;
  } catch (error) {
    console.error('QUERY CREATE ERROR:', error);
    throw error;
  }
};

// Get all contacts
const getAllContactMessages = async () => {
  try {
    return await ContactMessage.findAll({
      order: [['id', 'DESC']]
    });
  } catch (error) {
    console.error('QUERY GET ALL ERROR:', error);
    throw error;
  }
};

// Get contact by id
const getContactMessageById = async (id) => {
  try {
    return await ContactMessage.findByPk(id);
  } catch (error) {
    console.error('QUERY GET BY ID ERROR:', error);
    throw error;
  }
};

// Update contact by id
const updateContactMessage = async (id, data) => {
  try {
    const contact = await ContactMessage.findByPk(id);

    if (!contact) {
      return null;
    }

    await contact.update({
      fullName: data.fullName ?? contact.fullName,
      mobile: data.mobile ?? contact.mobile,
      email: data.email ?? contact.email,
      address: data.address ?? contact.address,
      city: data.city ?? contact.city,
      message: data.message ?? contact.message,
      mobileOtpVerified: data.mobileOtpVerified ?? contact.mobileOtpVerified,
      emailOtpVerified: data.emailOtpVerified ?? contact.emailOtpVerified
    });

    return contact;
  } catch (error) {
    console.error('QUERY UPDATE ERROR:', error);
    throw error;
  }
};

// Delete contact by id
const deleteContactMessage = async (id) => {
  try {
    const contact = await ContactMessage.findByPk(id);

    if (!contact) {
      return null;
    }

    await contact.destroy();
    return true;
  } catch (error) {
    console.error('QUERY DELETE ERROR:', error);
    throw error;
  }
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage
};