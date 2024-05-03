const path = require("path");
const express = require("express");

const router = require("./routes/admin");
const shopRoute = require("./routes/shop");

const app = express();

// setting up the template engine
app.set("view engine", "ejs");
app.set("views", "./views");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", router.routes);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not found" });
  // next();
});

app.listen(3000);
