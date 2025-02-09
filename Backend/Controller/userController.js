const User = require("../model/user");

export const getProfile = async (req, res) => {
  try {
    // Extract user ID from middleware
    const userId = req.user.id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Fetch user profile
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User profile not found." });
    }

    res.status(200).json({ success: true, profile: user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};
