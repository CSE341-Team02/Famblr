const router = require("express").Router();

// Controller
const postsController = require("../../controllers/api/posts");

// Get All Posts
router.get("/", postsController.getAllPosts);

// Create Post
router.post("/", postsController.createPost);

router.get("/:postId", postsController.getPostById);

// Edit Post
router.put("/:postId", postsController.editPost);

// Delete Post
// ...

module.exports = router;
