const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadToCloudinary = async (fileBuffer) => {
  if (!fileBuffer) return null;

  const base64 = `data:image/png;base64,${fileBuffer.toString("base64")}`;

  const response = await cloudinary.uploader.upload(base64, {
    resource_type: "auto",
    folder: "images",
  });

  return response.secure_url;
};
module.exports = { uploadToCloudinary };
