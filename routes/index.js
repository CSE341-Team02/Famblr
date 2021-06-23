const router = require("express").Router();
const indexController = require("../controllers");
const requiresLogin = require("../middlewares/requiresLogin");

router.use(require("./authentication")); // Login/Signup Pages

router.use("/account", requiresLogin, require("./account")); // Account Pages

router.get("/", requiresLogin, indexController.getIndex); // Home Page

module.exports = router;
