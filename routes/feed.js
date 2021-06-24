const express = require('express');

const postController = require('../controllers/post');

const router = express.Router();

// POST /feed/post
router.get('/feed/post', postController.createPost);

module.exports = router;