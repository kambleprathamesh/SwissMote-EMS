const express = require("express");
const { signup, signin } = require("../Controller/authController");
const { validateSignup, validateSignin } = require("../Validators/authValidators");

const router = express.Router();

// Routes with Zod validation
router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);

module.exports = router;
