const router = require("express").Router();
const authController = require("../controllers/authentication");
const { check, body } = require("express-validator/check");
const { Promise } = require("mongoose");
const User = require("../models/user");

//GET Login page
router.get("/login", authController.getLogin);

//POST Login the user
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("password", "The password is not valid.")
      .isLength({ min: 6 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

//GET or POST Log Out
router.use("/logout", authController.logout);

// Sign Up Page
router.get("/signup", authController.getSignUp);

// POST Sign Up Form Data
router.post(
  "/signup",
  [
    check("username")
      .isAlphanumeric()
      .withMessage("Usermane must contain only letters or numbers")
      .custom((value, { req }) => {
        return User.findOne({ username: req.body.username }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Username Already Exists");
          }
          return true;
        });
      }),
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: req.body.email }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail already exists. Please pick a different e-mail"
            );
          }
          return true;
        });
      }),
    body(
      "password",
      "Please enter a passwords with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 6 })
      .isAlphanumeric(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }

        return true;
      }),
  ],
  authController.postSignUp
);

// Reset Password
// router.get("/reset-password", authController.getResetPassword);
// router.post("/reset-password", authController.postResetPassword);
// router.get("/reset-password/:token", authController.getNewPassword);
// router.post("/reset-password/:token", authController.postNewPassword);

module.exports = router;
