const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Signin Controller
const signin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // If no password is provided, check for guest login
    if (!password) {
      if (role !== "guest") {
        return res.status(400).json({ message: "Invalid role for guest login." });
      }

      // Check if the email exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Email not registered. Guest login not allowed." });
      }

      // Generate JWT token for guest users
      const token = jwt.sign(
        { userId: user._id, role: "guest" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ message: "Guest login successful", token });
    }

    // Normal user login (Organizer)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Default role is "organizer" if no role is specified
    const userRole = role === "guest" ? "guest" : "organizer";

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: userRole },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


module.exports = { signup, signin };
