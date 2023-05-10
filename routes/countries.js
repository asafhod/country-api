const express = require("express");

// import authentication middleware
const auth = require("../middleware/auth");

// import validation middleware
const { validateAddCountry, validateAddCountries, validateUpdateCountry } = require("../middleware/validator");

// import Country controllers
const {
  getCountries,
  getCountry,
  addCountry,
  addCountries,
  updateCountry,
  deleteCountry,
  deleteCountries,
} = require("../controllers/countries");

// initialize router
const router = express.Router();

// routes
router.route("/").get(getCountries).post(auth, validateAddCountry, addCountry).delete(auth, deleteCountries);
router.route("/batch").post(auth, validateAddCountries, addCountries);
router.route("/:id").get(getCountry).patch(auth, validateUpdateCountry, updateCountry).delete(auth, deleteCountry);

module.exports = router;
