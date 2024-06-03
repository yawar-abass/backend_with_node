import e from "express";
import { Router } from "express";
import { body, check } from "express-validator";

import {
  getLogin,
  getReset,
  getSignup,
  postLogin,
  postLogout,
  postSignup,
} from "../controllers/auth.js";
import { User } from "../models/user.js";

const router = Router();

router.get("/login", getLogin);

router.get("/signup", getSignup);

router.post(
  "/login",
  [
    check("email", "Please Enter a Valid Email").isEmail(),

    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  postLogin
);

router.post(
  "/signup",
  [
    check("email", "Please Enter a Valid Email")
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail exists already, please pick a different one."
            );
          }
        });
      }),
    body(
      "password",
      "Please Enter a Password with only numbers and text and at least 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  postSignup
);

router.post("/logout", postLogout);

router.get("/reset", getReset);

export default router;
