const express = require('express');

const postController = require('../controllers/post');

const router = express.Router();

// POST /feed/post
router.post('/feed/post', postController.createPost);

module.exports = router;