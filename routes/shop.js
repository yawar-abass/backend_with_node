const path = require("path");
const express = require("express");
const rootDir = require("../utils/path");
const { products } = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  res.render("shop", {
    prods: products,
    pageTitle: "Shop with us",
    hasProducts: products.length > 0,
  });
});

module.exports = router;
