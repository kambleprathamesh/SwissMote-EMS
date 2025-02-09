const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const { getProfile } = require("../controller/userController");
const router = express.Router();

// Routes with Zod validation
router.get("/getUser", authenticateUser, getProfile);
// router.post("/signin", validateSignin, signin);

module.exports = router;
