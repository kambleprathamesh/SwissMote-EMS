const Event = require("../model/events");
const User = require("../model/user");
const { uploadToCloudinary } = require("../config/cloudinary");
const user = require("../model/user");

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
      category,
      status,
    } = req.body;

    if ((!title, !description, !date, !time, !location)) {
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
      category,
      status,
    });

    const event = await newEvent.save();
    console.log("event", event);
    await user.findByIdAndUpdate(
      { _id: organizer },
      { $push: { createdEvents: event._id } }
    );

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

//update event
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
    console.log("req.file in update controller", req.file);
    // Handle image update (if a new image is uploaded)
    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.buffer);
      updateData.image = imageUrl; // Update image URL
    }

    console.log("updateData", updateData);

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

//delete event
const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params; // Get eventId from URL params

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ensure only the organizer (creator) can delete the event
    if (event.organizer.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not authorized to delete this event",
      });
    }

    // Delete the event from the Event collection
    await Event.findByIdAndDelete(eventId);

    // Update the user document: Remove event from createdEvents array
    await User.findByIdAndUpdate(
      req.user.userId,
      {
        $pull: { createdEvents: eventId }, // $pull removes the eventId from createdEvents array
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Route to get filtered events based on status
const getFilteredData = async (req, res) => {
  try {
    // Get filters from query params
    const { category, startDate, endDate, status } = req.query;

    console.log("req.query", req.query);
    // Build the query object dynamically
    let query = {};

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Filter by date range if provided
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate); // Greater than or equal to start date
      }
      if (endDate) {
        query.date.$lte = new Date(endDate); // Less than or equal to end date
      }
    }

    // Get current date and time to validate event dates
    const currentDateTime = new Date();

    // Filter by status if provided (Upcoming, Past)
    if (status) {
      if (status === "upcoming") {
        // Upcoming events have a future date and time
        query.date = { $gte: currentDateTime };
      } else if (status === "past") {
        // Past events have a date and time in the past
        query.date = { $lt: currentDateTime }; // Less than current date and time
      }
    }

    // Fetch events based on query
    const events = await Event.find(query);
    console.log("EVENTS LENGTH", events.length);
    // Return the list of eventss
    res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createEvent, updateEvent, deleteEvent, getFilteredData };
