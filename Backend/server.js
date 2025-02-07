const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS

//AUTH ROUTES
app.use("/api/auth", authRoutes); // Register the routes
app.use("/api/event", eventRoutes);

// Connect to Database
connectDB();

app.get("/", (req, res) => {
  res.send("Event Management API is running...");
});

// Start the Server
console.log(process.env.PORT);
const PORT = process.env.PORT || 8000;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
