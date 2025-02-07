const { io } = require("socket.io-client");

// Connect to your WebSocket server (change if hosted)
const socket = io("ws://localhost:7000");

socket.on("connect", () => {
  console.log("✅ Connected to WebSocket Server");

  // Simulate a user joining an event (Replace with actual eventId)
  const eventId = "654321"; // Sample event ID
  socket.emit("joinEvent", { eventId });

  console.log(`🔹 Sent join request for Event ID: ${eventId}`);

  // Listen for attendee count updates
  socket.on("attendeeCount", (count) => {
    console.log(`📢 Updated Attendee Count: ${count}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ Disconnected from WebSocket Server");
  });
});

// Handle connection errors
socket.on("connect_error", (err) => {
  console.error("⚠️ WebSocket Connection Error:", err.message);
});
