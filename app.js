const path = require("path");
const express = require("express");
const { routes } = require("./routes/admin");
const shopRoute = require("./routes/shop");
const { get404 } = require("./controllers/error");

const app = express();

// setting up the template engine
app.set("view engine", "ejs");
app.set("views", "./views");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", routes);
app.use(shopRoute);

app.use(get404);

app.listen(3000);
