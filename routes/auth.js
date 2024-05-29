import e from "express";
import { Router } from "express";
import { getLogin, postLogin, postLogout } from "../controllers/auth.js";

const router = Router();

router.get("/login", getLogin);
router.post("/login", postLogin);

router.post("/logout", postLogout);

export default router;
