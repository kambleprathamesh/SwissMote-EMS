const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Cloudinary URL
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    capacity: {
      type: Number, // Optional
    },
    registrationLink: {
      type: String, // Optional external form link
    },
    isPaid: {
      type: Boolean,
      default: false, // Defaults to a free event
    },
    ticketPrice: {
      type: Number,
      default: 0, // Optional, used only if isPaid is true
    },
    duration: {
      type: String, // e.g., "2 hours", "3 days"
    },
    tags: {
      type: [String], // Example: ["AI", "Hackathon"]
    },
    hostContact: {
      type: String, // Organizer’s contact details
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
