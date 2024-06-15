import path from "path";

import { Router } from "express";

import {
  deleteProduct,
  getAddProduct,
  getEditProduct,
  getProducts,
  postAddProduct,
  postEditProduct,
} from "../controllers/admin.js";
import { isAuth } from "../middleware/is-auth.js";
import { body } from "express-validator";

const router = Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isLength({ min: 3 }).trim(),

    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postAddProduct
);

router.get(
  "/edit-product/:productId",

  getEditProduct
);

router.post(
  "/edit-product",
  [
    body("title").isLength({ min: 3 }).trim(),

    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 400 }).trim(),
  ],
  isAuth,
  postEditProduct
);

router.post("/delete-product", isAuth, deleteProduct);

export default router;
