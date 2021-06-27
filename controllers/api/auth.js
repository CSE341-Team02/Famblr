const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find user in Database
    const user = await User.findOne({ email: email });

    // Throw error if email not found
    if (!user) throw new Error("Invalid Username or Password");

    // Compare passwords
    const passwordValid = await bcrypt.compare(password, user.password);

    // Throw error if passwords don't match
    if (!passwordValid) throw new Error("Invalid Username or Password");

    // Generate JWT
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1d" }
    );

    // Set User in the session
    req.session.isLoggedIn = true;
    req.session.user = user;

    // Return User and JWT
    return res.json({
      user: user,
      token: token,
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
