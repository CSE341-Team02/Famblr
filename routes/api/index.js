const express = require("express");

const router = express.Router();

// Controller
const apiController = require("../../controllers/apiController");


router.get("/getPost", apiController.getAllPosts);



module.exports = router;