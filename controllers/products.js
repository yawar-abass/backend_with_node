import Product, { fetchAll } from "../models/product.js";

export function getAddProduct(req, res, next) {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
}

export function postAddProduct(req, res, next) {
  const product = new Product(req.body.title);
  product.save();
  console.log(product);
  res.redirect("/");
}

export function getProducts(req, res, next) {
  fetchAll((products) => {
    res.render("shop", {
      prods: products,
      pageTitle: "Shop with us",
      hasProducts: products.length > 0,
      path: "/",
    });
  });
}
