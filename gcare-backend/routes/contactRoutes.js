// const express = require("express");
// const router = express.Router();

// const {
//   submitContactForm,
//   getAllContactForms,
//   getContactFormById,
//   updateContactForm,
//   deleteContactForm
// } = require("../controllers/contactController");

// // 👉 BASE: /api/contact
// router.post("/", submitContactForm);
// router.get("/", getAllContactForms);
// router.get("/:id", getContactFormById);
// router.patch("/:id", updateContactForm);
// router.delete("/:id", deleteContactForm);

// module.exports = router;


const express =
  require("express");

const router =
  express.Router();

const {
  submitContactForm,
  getAllContactForms,
  getContactFormById,
  updateContactForm,
  deleteContactForm
} = require(
  "../controllers/contactController"
);


/*
BASE URL:

/api/contact
*/


router.post(
  "/",
  submitContactForm
);


router.get(
  "/",
  getAllContactForms
);


router.get(
  "/:id",
  getContactFormById
);


router.patch(
  "/:id",
  updateContactForm
);


router.delete(
  "/:id",
  deleteContactForm
);


module.exports =
  router;