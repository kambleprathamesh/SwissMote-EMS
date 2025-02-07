const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const streamifier = require("streamifier"); // Add this for handling buffer

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Log Cloudinary Connection Status
if (
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
) {
  console.log("✅ Cloudinary Connected Successfully!");
} else {
  console.error("❌ Cloudinary Connection Failed! Check .env file.");
}

// Function to upload image buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: "Swiss" },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary Upload Error:", error);
          reject(error);
        } else {
          console.log("✅ Cloudinary Upload Successful:", result.secure_url);
          resolve(result.secure_url);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = { uploadToCloudinary };
