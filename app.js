const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");

const router = require("./routes/admin");
const shopRoute = require("./routes/shop");

const app = express();

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", router.routes);
app.use(shopRoute);

app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not found" });
  // next();
});

app.listen(3000);
