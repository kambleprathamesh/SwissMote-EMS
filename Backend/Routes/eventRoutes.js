const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizeRole,
} = require("../middleware/authMiddleWare");

// Import event controllers
const { createEvent } = require("../controller/eventController");
const upload = require("../middleware/uploadMiddleware");
// updateEvent, deleteEvent, viewEvents, registerEvent
// Routes
// router.get("/events", viewEvents); // Open for all

// router.post("/register/:eventId", authenticateUser, authorizeRole(["guest", "organizer"]), registerEvent);

router.post(
  "/create",
  authenticateUser,
  authorizeRole(["organizer"]),
  upload.single("image"),
  createEvent
);

// router.put("/update/:eventId", authenticateUser, authorizeRole(["organizer"]), updateEvent); // Only Organizers
// router.delete("/delete/:eventId", authenticateUser, authorizeRole(["organizer"]), deleteEvent); // Only Organizers

module.exports = router;
