const express = require("express");
const { signup, signin } = require("../controller/authController");
const { validateSignup, validateSignin } = require("../validators/authValidators");

const router = express.Router();

// Routes with Zod validation
router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);

module.exports = router;
