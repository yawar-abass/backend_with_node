import { join, dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import pkg from "body-parser";
import "dotenv/config";
import session from "express-session";
import connectMongoDbSession from "connect-mongodb-session";
import mongoose from "mongoose";
import tokens from "csrf";

import { get404, get500 } from "./controllers/error.js";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import authRoutes from "./routes/auth.js";

import { User } from "./models/user.js";
import multer from "multer";

const app = express();
const MongoDbStore = connectMongoDbSession(session);

const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

const { urlencoded } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));
app.use("/images", express.static(join(__dirname, "images")));

app.use(multer({ storage: fileStorage, fileFilter }).single("image"));

app.set("view engine", "ejs");
app.set("views", "views");

const csrfProtection = new tokens();
//app.use(csrfProtection);

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        // we don't want to store the user in the session if it doesn't exist in the database
        return next();
      }

      req.user = user;
      next();
    })
    .catch((err) => {
      throw new Error(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404);
app.get("/500", get500);

app.use((error, req, res, next) => {
  console.log(req.session);
  if (!req.session?.user) {
    return next();
  }
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
