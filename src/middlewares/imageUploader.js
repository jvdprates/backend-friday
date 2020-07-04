const multer = require("multer");

const storage = multer.memoryStorage();

const config = {
  dest: `./public/profileImages`,
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png"];
    if (allowedMimes.includes(file.mimetype)) cb(null, true);
    else cb({ error: "Invalid file type" });
  },
};
const imageUploader = (imageName) => {
  const uploader = multer(config).single(imageName);

  return (req, res, next) => {
    uploader(req, res, (err) => {
      if (err) return res.status(400).send(err);
      if (!req.file && !req.body[imageName])
        return res.status(400).json({ error: `${imageName} is required` });

      return next();
    });
  };
};

module.exports = imageUploader;
