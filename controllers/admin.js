import { ObjectId } from "mongodb";
import { Product } from "../models/product.js";
import { validationResult } from "express-validator";

export function getAddProduct(req, res, next) {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false,
    hasError: false,
    isAuthenticated: req.session.isLoggedIn,
    errorMessage: null,
  });
}

export function getEditProduct(req, res, next) {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        hasError: false,
        isAuthenticated: req.session.isLoggedIn,
        errorMessage: null,
      });
    })
    .catch((err) => console.log(err));
}

export function postEditProduct(req, res, next) {
  const { prodId, title, imageUrl, price, description } = req.body;

  Product.findById(prodId)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product.save();
    })
    .then(() => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
}

export function postAddProduct(req, res, next) {
  const { title, imageUrl, price, description } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      hasError: true,
      product: {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
      isAuthenticated: req.session.isLoggedIn,
    });
  }

  const product = new Product({
    title,
    price,
    imageUrl,
    description,
    userId: req.user._id,
  });
  product
    .save()
    .then(() => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
}

export function getProducts(req, res, next) {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
}

export function deleteProduct(req, res, next) {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
}
