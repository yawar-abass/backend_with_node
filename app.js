import { join, dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import pkg from "body-parser";
import "dotenv/config";

import sequelize from "./utils/database.js";
import { get404 } from "./controllers/error.js";
import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const app = express();
const { urlencoded } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(urlencoded({ extended: false }));

app.use(express.static(join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

sequelize
  .sync()
  .then(() => {
    console.log("Connected to the database");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
