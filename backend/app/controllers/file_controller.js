const { uploadToCloudinary } = require("../utils/cloudinary");

module.exports = {
  fileUpload: async function (req, res) {
    const file = req.file;
    console.log(file);
    const url = await uploadToCloudinary(file?.buffer);

    res.status(200).json({
      status: "success",
      url,
    });
  },
};
