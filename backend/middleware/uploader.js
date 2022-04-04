const multer = require("multer");
const imageFilter = function (request, file, cb) {
  const is_image = file.mimetype.split("/")[0];
  if (is_image === "image") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const myStorage = multer.diskStorage({
  filename: function (request, file, cb) {
    const file_name = Date.now() + file.originalname;
    cb(null, file_name);
  },
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/public/images");
  },
  fileFilter: imageFilter,
});

const upload = multer({
  storage: myStorage,
  fileFilter: imageFilter,
});

module.exports = upload;
