const router = require("express").Router();

// Controllers
const imageController = require("../../controllers/frontend/images")
const indexController = require("../../controllers/frontend");

// Middlewares
const requiresLogin = require("../../middlewares/requiresLogin");


// Login/Signup Pages
router.use(require("./authentication"));

// Account Settings Pages
router.use("/account", requiresLogin, require("./account"));

// User Profile Pages
router.use("/profile", requiresLogin, require("./profile"));

// Family Members Pages
router.use("/family", requiresLogin, require("./family"));

// Post Pages
router.use("/posts", requiresLogin, require("./posts"));

// Uploaded Images
router.get("/uploads/:imageId", imageController.getImage)

// Homepage ( Newsfeed )
router.get("/", requiresLogin, indexController.getIndex);


// 404 Handler
router.use((req, res, next) => {
    res.status(404);
    return res.send("404 - Page Not Found")
});

// General Error Handler
router.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatusCode || 500);
    console.log(res)
    return res.send(`${res.statusCode} - ${error.message || "An unknown server error occured"}`);
});


module.exports = router;
