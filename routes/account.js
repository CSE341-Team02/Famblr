const router = require("express").Router();
const userController = require("../controllers/user");
const { route } = require("./auth");
const {check, body} = require("express-validator/check");
const { Promise } = require('mongoose');
const User = require("../models/user");

// router.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   next(); 
// })

//GET Signup Page
router.get("/signup", userController.getAddUser);

//POST Create user in database
router.post("/postSignup"
, [ check("username")
    .isAlphanumeric().withMessage("Usermane must contain only letters or numbers")
    .custom((value , {req}) => {
      return User.findOne({username:req.body.username})
        .then( userDoc => {
          if(userDoc) {
            return Promise.reject("Username Already Exists");            
          } 
          return true;
        });
    })
    ,  check("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom((value , {req}) => {
          return User.findOne({email:req.body.email})
            .then( userDoc => {
              if(userDoc) {
                return Promise.reject("E-mail already exists. Please pick a different e-mail");            
              } 
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

// Account Details
router.get("/", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

//GET Login page
router.get("/login", userController.getLogin);

//POST Login the user
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

//GET Logout the user
router.get("/logout", userController.logOut);

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
