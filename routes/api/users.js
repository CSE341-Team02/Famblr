const router = require("express").Router();
var multer = require('multer');

// Controller
const usersController = require("../../controllers/api/users");

// Get Current User
router.get("/", usersController.getCurrentUser);

// Get User By Id
router.get("/:userId", usersController.getUserById)

// Update User
router.put("/:userId", multer().single('image'), usersController.editUserById)

module.exports = router;
