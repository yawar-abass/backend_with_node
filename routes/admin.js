const path = require("path");
const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", { pageTitle: "Add Product" });
});

router.post("/product", (req, res, next) => {
  products.push({ title: req.body?.title });
  console.log(products);
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
