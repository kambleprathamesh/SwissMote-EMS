const Event = require("../model/events");
const { uploadToCloudinary } = require("../config/cloudinary");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      capacity,
      registrationLink,
      isPaid,
      ticketPrice,
      duration,
      tags,
      isPrivate,
      hostContact,
    } = req.body;

    // Ensure organizer is set from authenticated user
    const organizer = req.user.id;

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.path);
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      image: imageUrl,
      organizer,
      capacity,
      registrationLink,
      isPaid,
      ticketPrice,
      duration,
      tags,
      isPrivate,
      hostContact,
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {createEvent};
