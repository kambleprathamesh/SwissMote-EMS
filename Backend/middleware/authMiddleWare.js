const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("req.user in middlewrae", req.user);
    console.log(req.user);

    // If no role is specified, default to "user"
    if (!req.user.role) {
      req.user.role = "user";
    }
    console.log("TOKEN VERIFIED");
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

const authorizeGuest = (req, res, next) => {
  if (req.user.role !== "guest") {
    return res
      .status(403)
      .json({ message: "Access Denied. Only guest access allowed." });
  }
  next();
};

module.exports = { authenticateUser, authorizeGuest };
