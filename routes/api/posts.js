const router = require("express").Router();

// Controller
const postsController = require("../../controllers/api/posts");

// Get All Posts
router.get("/", postsController.getAllPosts);

// Get Single Post
router.get("/:postId", postsController.getPostById);

// Create Post
router.post("/", postsController.createPost);

// Edit Post
router.put("/:postId", postsController.editPost);

// Delete Post
router.delete("/:postId", postsController.deletePost);

module.exports = router;
