import { join, dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import pkg from "body-parser";
import "dotenv/config";

import { get404 } from "./controllers/error.js";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import authRoutes from "./routes/auth.js";
import session from "express-session";
import connectMongoDbSession from "connect-mongodb-session";

import { User } from "./models/user.js";
import mongoose from "mongoose";

const app = express();
const MongoDbStore = connectMongoDbSession(session);

const store = new MongoDbStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
const { urlencoded } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

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
      req.user = user;
      next();
    })
    .catch((err) => {
      console.error(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Max",
          email: "hello@hl.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    console.log("Connected to MongoDB");
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
