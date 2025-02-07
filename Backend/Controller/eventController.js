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
      hostContact,
    } = req.body;

    // Ensure organizer is set from authenticated user
    const organizer = req.user.userId;

    // Convert tags to an array if it's not already
    const tagArray = tags.split(",").map((tag) => tag.trim());

    console.log(tagArray);

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToCloudinary(
        req.file.buffer,
        req.file.mimetype.split("/")[1]
      );
      console.log("imageUrl", imageUrl);
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
      tags: tagArray,
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

module.exports = { createEvent };
