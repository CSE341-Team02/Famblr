const router = require("express").Router();

// Controllers
const indexController = require("../../controllers/frontend");

// Middlewares
const requiresLogin = require("../../middlewares/requiresLogin");


// Login/Signup Pages
router.use(require("./authentication"));

// Account Pages
router.use("/account", requiresLogin, require("./account"));

// Homepage ( Newsfeed )
router.get("/", requiresLogin, indexController.getIndex);


module.exports = router;