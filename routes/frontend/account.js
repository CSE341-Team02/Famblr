const router = require("express").Router();
const userController = require("../../controllers/frontend/user");

// GET Account Details Page
router.get("/", userController.getAccountPage);

module.exports = router;
