import { ObjectId } from "mongodb";
import Product from "../models/product.js";

export function getAddProduct(req, res, next) {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
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
      });
    })
    .catch((err) => console.log(err));
}

export function postEditProduct(req, res, next) {
  const { prodId, title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, imageUrl, description, prodId);
  product
    .save()
    .then(() => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
}

export function postAddProduct(req, res, next) {
  const { title, imageUrl, price, description } = req.body;

  const product = new Product(
    title,
    price,
    imageUrl,
    description,
    null,
    req?.user._id
  );
  product
    .save()
    .then(() => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
}

export function getProducts(req, res, next) {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
}

export function deleteProduct(req, res, next) {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
}
