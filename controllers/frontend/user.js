exports.getCurrentUser = (req, res, next) => {
  // This View has access to the user object, because 
  // it is set as res.locals.user in /index.js
  res.render("account");
};
