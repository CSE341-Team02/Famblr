const router = require("express").Router();

// Controller
const usersController = require("../../controllers/api/users");

// Get Current User
router.get("/", usersController.getCurrentUser);

module.exports = router;
