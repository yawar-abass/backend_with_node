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
} from "../controllers/shop.js";

const router = Router();

router.get("/", getIndex);

router.get("/products", getProducts);
router.get("/products/:productId", getProduct);

router.get("/cart", getCart);
router.post("/cart", postCart);

router.get("/orders", getOrders);

router.get("/checkout", getCheckout);

export default router;
