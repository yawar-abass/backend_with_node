import Product from "../models/product.js";

export function getProducts(req, res, next) {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
}

export function getProduct(req, res, next) {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([rows]) => {
      res.render("shop/product-detail", {
        product: rows[0],
        pageTitle: rows[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
}

export function getIndex(req, res, next) {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
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
