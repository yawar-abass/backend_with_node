import path from "path";

import { Router } from "express";

import {
  getIndex,
  getProducts,
  getCart,
  getOrders,
  getCheckout,
  getProduct,
  postCart,
  postCartDeleteProduct,
  postOrder,
} from "../controllers/shop.js";

const router = Router();

router.get("/", getIndex);

router.get("/products", getProducts);
router.get("/products/:productId", getProduct);

router.get("/cart", getCart);
router.post("/add-to-cart", postCart);
router.post("/cart-delete-item", postCartDeleteProduct);

//
router.get("/orders", getOrders);
router.post("/create-order", postOrder);

// router.get("/checkout", getCheckout);

export default router;
