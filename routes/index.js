const router = require("express").Router();

// Controllers
const indexController = require("../controllers");
const requiresLogin = require("../middlewares/requiresLogin");


// Inner Routes
const apiRoutes = require("./api");

router.use(require("./authentication")); // Login/Signup Pages
router.use(require("./feed")); 

router.use("/account", requiresLogin, require("./account")); // Account Pages

router.get("/", requiresLogin, indexController.getIndex); // Home Page

router.get("/api", apiRoutes);



module.exports = router;
