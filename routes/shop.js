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
import { isAuth } from "../middleware/is-auth.js";

const router = Router();

router.get("/", getIndex);

router.get("/products", getProducts);
router.get("/products/:productId", getProduct);

router.get("/cart", isAuth, getCart);
router.post("/add-to-cart", isAuth, postCart);
router.post("/cart-delete-item", isAuth, postCartDeleteProduct);

//
router.get("/orders", isAuth, getOrders);
router.post("/create-order", isAuth, postOrder);

// router.get("/checkout", getCheckout);

export default router;
