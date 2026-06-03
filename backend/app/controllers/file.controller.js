import { uploadToCloudinary } from "../utils/cloudinary.util.js";

export const fileUpload = async (req, res) => {
  const file = req.file;
  console.log(file);
  const url = await uploadToCloudinary(file?.buffer);

  res.status(200).json({
    status: "success",
    url,
  });
};
