const router = require("express").Router();

// API Routes
router.use("/api", require("./api"));

// Frontend Routes
router.use("/", require('./frontend'))


module.exports = router;
