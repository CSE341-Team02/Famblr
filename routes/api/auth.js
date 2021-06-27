const router = require("express").Router();
const authController = require("../../controllers/api/auth")

// [POST] /api/auth/login
router.post('/login', authController.login)

module.exports = router;