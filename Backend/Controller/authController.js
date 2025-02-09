const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// Signup Controller
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
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

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(role, email, password);

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Handle guest login
    if (!password) {
      if (role !== "guest") {
        return res
          .status(403)
          .json({ message: "Guest login not allowed for this role" });
      }

      // Check if the email exists in the database
      const user = await User.findOne({ email }).select("-password");
      if (!user) {
        return res
          .status(404)
          .json({ message: "Email not registered. Guest login not allowed" });
      }

      // Generate JWT token for guest users
      const token = jwt.sign(
        { userId: user._id, role: "guest" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res
        .status(200)
        .json({ message: "Guest login successful", user, token });
    }

    // Normal user login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const userid = user._id;
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    return res.status(200).json({ message: "Login successful", token, userid });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { signup, signin };

module.exports = { signup, signin };
