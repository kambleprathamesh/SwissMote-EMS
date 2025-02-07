const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Required for all users
    profileImage: { type: String }, // Cloudinary URL for user profile picture
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Events the user has registered for
    createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }], // Events the user has organized
    contactNumber: { type: String }, // Optional field for user contact
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
