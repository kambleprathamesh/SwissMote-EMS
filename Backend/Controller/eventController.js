const Event = require("../model/events");
const { uploadToCloudinary } = require("../config/cloudinary");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      capacity,
      registrationLink,
      isPaid,
      ticketPrice,
      duration,
      tags,
      hostContact,
    } = req.body;

    if ((!title, !!description, !date, !time, !location)) {
      return res.status(400).json({
        message: "Please fill Required Fields",
      });
    }
    // Ensure organizer is set from authenticated user
    const organizer = req.user.userId;

    // Convert tags to an array if it's not already
    const tagArray = tags
      ? Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag) => tag.trim())
      : [];

    console.log(tagArray);

    console.log("REQ FILE", req.file);
    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.buffer);
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

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params; // Get eventId from URL params
    const {
      title,
      description,
      date,
      time,
      location,
      capacity,
      registrationLink,
      isPaid,
      ticketPrice,
      duration,
      tags,
      hostContact,
    } = req.body;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ensure only the organizer (creator) can update the event
    if (event.organizer.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not authorized to update this event",
      });
    }

    // Prepare updated data object
    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (date) updateData.date = date;
    if (time) updateData.time = time;
    if (location) updateData.location = location;
    if (capacity) updateData.capacity = capacity;
    if (registrationLink) updateData.registrationLink = registrationLink;
    if (isPaid !== undefined) updateData.isPaid = isPaid;
    if (ticketPrice !== undefined) updateData.ticketPrice = ticketPrice;
    if (duration) updateData.duration = duration;
    if (tags) {
      // Convert tags to array if provided
      updateData.tags = Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag) => tag.trim());
    }
    if (hostContact) updateData.hostContact = hostContact;

    // Handle image update (if a new image is uploaded)
    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.buffer);
      updateData.image = imageUrl; // Update image URL
    }

    // Update event in the database
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true, // Return the updated event
    });

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createEvent, updateEvent };
