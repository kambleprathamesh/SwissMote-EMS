const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan"); // For logging requests
const http = require("http"); // Required for WebSockets
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoute = require("./routes/userRoute");

const initializeWebSockets = require("./config/socket"); // Import WebSocket setup

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app); // Create HTTP server for WebSockets

const corsOptions = {
  origin: "http://localhost:5174", // Update this to your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(express.json()); // Body parser for JSON requests
app.use(express.urlencoded({ extended: true })); // Body parser for form-data
app.use(cors(corsOptions)); // Enable CORS
app.use(morgan("dev")); // Log HTTP requests

// Connect to Database
connectDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1); // Exit if DB connection fails
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("Event Management API is running...");
});

// Initialize WebSockets (modular approach)
initializeWebSockets(server);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// Start the Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
