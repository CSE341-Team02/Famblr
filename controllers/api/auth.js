const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

exports.login = async (req, res, next) => {
  try {
    // Let users sign in with either email or username
    const email = req.body.email;
    const username = req.body.username;

    const password = req.body.password;

    // Find user in Database
    let user = await User.findOne({ email: email || username });

    // Try searching by username if none found by email
    if (!user) {
      user = await User.findOne({ username: username || email })
    }

    // Throw error if email not found
    if (!user) throw new Error("Invalid Username or Password");

    // Compare passwords
    const passwordValid = await bcrypt.compare(password, user.password);

    // Throw error if passwords don't match
    if (!passwordValid) throw new Error("Invalid Username or Password");

    // Generate JWT
    const token = jwt.sign(
      {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
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
