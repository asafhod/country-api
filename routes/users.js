const express = require("express");

// import authentication and admin verification middleware
const auth = require("../middleware/auth");
const checkAdmin = require("../middleware/checkAdmin");

// import validation middleware
const { validateLoginReg } = require("../middleware/validator");

// import User controllers
const { login, getUsers, getUser, registerUser, deleteUser } = require("../controllers/users");

// initialize router
const router = express.Router();

// routes
router.route("/").get(auth, checkAdmin, getUsers).post(auth, checkAdmin, validateLoginReg, registerUser);
router.route("/login").post(validateLoginReg, login);
router.route("/:username").get(auth, checkAdmin, getUser).delete(auth, checkAdmin, deleteUser);

module.exports = router;
