const express = require("express");
const { getAddProduct, postAddProduct } = require("../controllers/products");

const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/product", postAddProduct);

exports.routes = router;
