const router = require("express").Router();
const userController = require("../controllers/user");

// GET Account Details
router.get("/", userController.getCurrentUser);

// POST Updated User Details
// router.post("/update-account", userController.???);

// POST Delete Account
// router.post("/delete-account", userController.???);

router.get("/test", (req, res, next) => {
  console.log(req.session.user);
  res.redirect("/");
});

module.exports = router;
