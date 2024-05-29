import { User } from "../models/user";

export const getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[6].trim().split("=")[1];
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

export const postLogin = (req, res, next) => {
  User.findById("6651ceae9bf9c1fb84e859a8")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.error(err);
        res.redirect("/");
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
