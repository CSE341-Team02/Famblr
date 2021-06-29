const router = require("express").Router();

// Controllers
const imageController = require("../../controllers/frontend/images")
const indexController = require("../../controllers/frontend");

// Middlewares
const requiresLogin = require("../../middlewares/requiresLogin");


// Login/Signup Pages
router.use(require("./authentication"));

// Account Pages
router.use("/account", requiresLogin, require("./account"));

// Post Pages
router.use("/posts", requiresLogin, require("./posts"));

// Uploaded Images
router.get("/uploads/:imageId", imageController.getImage)

// Homepage ( Newsfeed )
router.get("/", requiresLogin, indexController.getIndex);


module.exports = router;
