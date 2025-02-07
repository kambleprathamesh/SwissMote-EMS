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
  (req, res, next) => {
    // If there is a file, run the upload middleware
    if (req.file) {
      return uploadImage(req, res, next);
    }
    // Otherwise, skip the file upload and continue to the controller
    next();
  },
  updateEvent
);

module.exports = router;
