import path from "path";

import { Router } from "express";

import {
  getAddProduct,
  getEditProduct,
  getProducts,
  postAddProduct,
} from "../controllers/admin.js";

const router = Router();

// /admin/add-product => GET
router.get("/add-product", getAddProduct);

// /admin/products => GET
router.get("/products", getProducts);

router.get("/edit-product/:productId", getEditProduct);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

export default router;
