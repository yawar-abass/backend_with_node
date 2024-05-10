import Product from "../models/product.js";

export function getProducts(req, res, next) {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
}

export function getProduct(req, res, next) {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
}

export function getIndex(req, res, next) {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
}

export function getCart(req, res, next) {
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
  });
}

export function postCart(req, res, next) {
  const prodId = req.body.productId;
  console.log(prodId);
  res.redirect("/cart");
}

export function getOrders(req, res, next) {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
}

export function getCheckout(req, res, next) {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
}
