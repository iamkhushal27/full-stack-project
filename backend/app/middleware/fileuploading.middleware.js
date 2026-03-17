import multer from "multer";

const storage = multer.memoryStorage(); // ✅ no folder needed

const fileFilter = (req, file, cb) => {
  // ✅ only allow images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

export const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // ✅ 5MB max
  },
});