import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image allowed"), false);
      }
    }

    if (file.fieldname === "pdf") {
      if (file.mimetype !== "application/pdf") {
        return cb(new Error("Only PDF allowed"), false);
      }
    }

    cb(null, true);
  },
});

export default upload;
