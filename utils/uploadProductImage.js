import multer from "multer";
import { createError } from "./errors.js";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});
const productFilter = (req, file, callback) => {
  if (file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "jpeg") {
    callback(null, true);
  } else {
    callback(createError(500, "Image type must be PNG or JPG"));
  }
};
export const upload_product = multer({ storage: storage, limits: { fileSize: 50000000 }, fileFilter: productFilter });
