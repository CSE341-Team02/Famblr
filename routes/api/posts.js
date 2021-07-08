const router = require("express").Router();
const { body } = require('express-validator/check');

// Controller
const postsController = require("../../controllers/api/posts");

// Get All Posts
router.get("/", postsController.getAllPosts);

// Get Single Post
router.get("/:postId", postsController.getPostById);

// Create Post
router.post(
'/', 
[
    body('contentText')
        .isLength({ min:1, max: 100 })
], 
postsController.createPost
);

// Edit Post
router.put("/:postId", postsController.editPost);

// Delete Post
router.delete("/:postId", postsController.deletePost);

module.exports = router;
