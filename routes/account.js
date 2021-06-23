const router = require("express").Router();
const userController = require("../controllers/user");

// Account Details
router.get("/", userController.getCurrentUser);

router.post("/update-account", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

router.post("/delete-account", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

router.get("/test", (req, res, next) => {
  console.log(req.session.user);
  res.redirect("/");
});

module.exports = router;
