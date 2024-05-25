import { join, dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import pkg from "body-parser";
import "dotenv/config";

import { get404 } from "./controllers/error.js";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { connectToDatabase } from "./utils/database.js";
import User from "./models/user.js";
import mongoose from "mongoose";

const app = express();
const { urlencoded } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  User.findById("66507de073682d529f483246")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => {
      console.error(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000);
  })
  .catch((err) => {
    console.error(err);
  });
