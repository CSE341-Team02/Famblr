const router = require("express").Router();
const userController = require("../../controllers/frontend/user");

// GET Account Details Page
router.get("/", userController.getCurrentUser);

router.get("/test", (req, res, next) => {
  console.log(req.session.user);
  res.redirect("/");
});

module.exports = router;
