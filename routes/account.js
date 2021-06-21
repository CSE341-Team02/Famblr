const router = require("express").Router();
const userController = require("../controllers/user");
const { route } = require("./auth");
const {check, body} = require("express-validator/check");
const { Promise } = require('mongoose');
const User = require("../models/user");


router.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next(); 
})



// Account Details
router.get("/", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

router.get("/signup", userController.getAddUser);

router.get("/login", userController.getLogin);

router.get("/logout", userController.logOut);

router.post("/postSignup"
, [ check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((value , {req}) => {
      return User.findOne({email:req.body.email})
        .then( userDoc => {
          if(userDoc) {
            console.log("email exists");
            return Promise.reject("E-mail already exists. Please pick a different e-mail");            
          } 
          console.log("what is hghappeind");
          return true;
        });
    })
    , body("password", "Please enter a passwords with only numbers and text and at least 5 characters.")
      .isLength({min: 6})
      .isAlphanumeric()
    , body("confirmPassword")
      .trim()
      .custom((value, {req}) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }

        return true;
      })
    ]
    , userController.postAddUser);

router.post("/postLogin"
, [
  body('email')
  .isEmail()
  .withMessage('Please enter a valid email address.')
  .normalizeEmail(),
  body('password', 'The password is not valid.')
  .isLength({ min: 6 })
  .isAlphanumeric() 
  .trim()
]
, userController.postLogin);

router.post("/update-account", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

router.post("/delete-account", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

router.get("/test", (req, res, next) => {
  console.log(req.session.user);
  res.redirect("/");
})

module.exports = router;
