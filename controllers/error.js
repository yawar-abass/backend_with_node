export function get404(req, res, next) {
  res.status(404).render("404", {
    pageTitle: "Page Not Fsound",
    path: "/404",
    isAuthenticated: req.session.isLoggedIn,
  });
}

export function get500(req, res, next) {
  res.status(500).render("404", {
    pageTitle: "Internal Server Error",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
}
