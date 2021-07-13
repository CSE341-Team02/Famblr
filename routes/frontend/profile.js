const router = require("express").Router();
const userController = require("../../controllers/frontend/user");

// GET User Profile Page
router.get("/:username", userController.getProfilePage);

module.exports = router;
