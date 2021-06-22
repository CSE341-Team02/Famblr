const express = require('express');

const postController = require('../controllers/post');

const router = express.Router();

// POST /feed/post
router.post('/post', postController.createPost);