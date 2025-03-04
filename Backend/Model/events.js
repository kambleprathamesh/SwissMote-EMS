const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: {
      type: String,
      require: true,
    },
    location: { type: String, required: true },
    image: { type: String }, // Cloudinary URL
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String },
    status: { type: String, enum: ["upcoming", "past"] },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    capacity: { type: Number }, // Optional
    registrationLink: { type: String }, // External form link
    isPaid: { type: Boolean, default: false },
    ticketPrice: { type: Number, default: 0 },
    duration: { type: String },
    tags: { type: [String] }, // Ensures it's stored as an array
    hostContact: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
