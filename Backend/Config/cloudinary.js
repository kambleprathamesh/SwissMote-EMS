const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (buffer, fileFormat) => {
  try {
    const result = cloudinary.uploader
      .upload_stream(
        { folder: "Swiss", resource_type: "image", format: fileFormat },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            throw new Error("Image upload failed");
          }
          return result.secure_url;
        }
      )
      .end(buffer);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { uploadToCloudinary };
