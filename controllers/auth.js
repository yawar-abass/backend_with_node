export const getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split(";")[6].trim().split("=")[1];
  console.log(isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

export const postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  //   req.isLoggedIn = true;
  res.redirect("/");
};
