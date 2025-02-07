const express = require("express");
const { createEvent, updateEvent } = require("../controller/eventController");
const { authenticateUser } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const uploadImage = upload.single("image");
const router = express.Router();

// Route to create an event (only authenticated users can create)
router.post("/create", authenticateUser, upload.single("image"), createEvent);

// Update route with optional image upload
router.put(
  "/update/:eventId",
  authenticateUser,
  upload.single("image"), // This will handle file upload if it exists
  updateEvent // This will update the event, with or without an image
);

module.exports = router;
