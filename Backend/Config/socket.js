const { Server } = require("socket.io");

const eventAttendees = {}; // Track attendees in memory

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow all origins
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // When a user joins an event
    socket.on("joinEvent", (eventId) => {
      if (!eventAttendees[eventId]) {
        eventAttendees[eventId] = new Set();
      }
      
      eventAttendees[eventId].add(socket.id);
      socket.join(eventId); // ✅ Join event room **before** emitting the count

      console.log(`User ${socket.id} joined event: ${eventId}`);

      // Send updated attendee count to all users in the event room
      io.to(eventId).emit("attendeeCount", eventAttendees[eventId].size);
    });

    // When a user disconnects
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove user from all events they joined
      for (const eventId in eventAttendees) {
        if (eventAttendees[eventId].has(socket.id)) {
          eventAttendees[eventId].delete(socket.id);
          
          // Notify remaining users in the event room
          io.to(eventId).emit("attendeeCount", eventAttendees[eventId].size);

          // Cleanup: If no attendees left, delete the event entry
          if (eventAttendees[eventId].size === 0) {
            delete eventAttendees[eventId];
          }
        }
      }
    });
  });
};
