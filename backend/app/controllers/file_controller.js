const { uploadToCloudinary } = require("../utils/cloudinary");
const { BadRequestError } = require("../utils/error");

module.exports = {
  fileUpload: async function (req, res, next) {
    try {
      const file = req.file;
      console.log(file)
      const url = await uploadToCloudinary(file?.buffer);

      res.status(200).json({
        status: "success",
        url,
      });
    } catch (error) {
      next(error);
    }
  },
};
