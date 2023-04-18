import morgan from "morgan";
import createError from "http-errors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

// Import for file upload start
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
// Import for file upload start

dotenv.config();

// import routes start
import category from "./routes/category.js";
import product from "./routes/product.js";
// import routes end

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  next();
});

// Config Public Folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Successful api message
app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

//middlewares use start
app.use(express.static(__dirname + "/public/"));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3001"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//middlewares use end

// File Upload Start from index that will be uploaded in public/upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
// File Upload End

// All routes start
app.use("/api/category", category);
app.use("/api/product", product);
// All routes end

// Error Handling
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
