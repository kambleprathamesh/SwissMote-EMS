const express = require("express");
const { createEvent } = require("../controller/eventController");
const { authenticateUser } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Route to create an event (only authenticated users can create)
router.post("/create", authenticateUser, upload.single("image"), createEvent);

module.exports = router;
