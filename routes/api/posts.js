const router = require("express").Router();
var multer = require('multer');
const { body } = require('express-validator/check');

// Controller
const postsController = require("../../controllers/api/posts");

// Get All Posts
router.get("/", postsController.getAllPosts);

// Get All Posts
router.get("/username/:username", postsController.getPostsByUsername);

// Get Single Post
router.get("/:postId", postsController.getPostById);

// Create Post
router.post(
    '/',
    multer().single('image'),
    [
        body('text')
            .isLength({ min: 1, max: 100 })
    ],
    postsController.createPost
);

// Edit Post
router.put(
    "/:postId",
    multer().single('image'),
    [
        body('text')
            .isLength({ min: 1, max: 100 })
    ],
    postsController.editPost
);

// Delete Post
router.delete("/:postId", postsController.deletePost);

module.exports = router;
