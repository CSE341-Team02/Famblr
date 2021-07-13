const User = require("../../models/user");

exports.getAccountPage = (req, res, next) => {
  res.render("account");
};

exports.getProfilePage = async (req, res, next) => {
  try {
    let username = req.params.username;
    let user = await User.findOne({ username: username });

    if (!user) {
      let error = new Error("User Not Found");
      error.httpStatusCode = 404;
      throw error;
    }

    return res.render("profile");
    
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
