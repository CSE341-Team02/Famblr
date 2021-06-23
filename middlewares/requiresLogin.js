module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log("This Route Requires Being Logged In");
    return res.redirect("/login");
  }
  console.log("[requriesLogin Middleware] Current User: ", req.session.user.username)
  next();
};
