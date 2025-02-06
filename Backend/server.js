const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");
const authRoutes=require("./Routes/authRoutes")
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS



//AUTH ROUTES
app.use("/api/auth", authRoutes);  // Register the routes

// Connect to Database
connectDB();

app.get("/", (req, res) => {
  res.send("Event Management API is running...");
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
