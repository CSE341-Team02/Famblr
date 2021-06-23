module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log("This Route Requires Being Logged In");
    return res.redirect("/login");
  }
  next();
};
