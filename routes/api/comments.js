const router = require("express").Router();

// Controller
const commentsController = require("../../controllers/api/comments");

// Create Post
router.post("/", commentsController.createComment);

//router.get("/:postId", postsController.getPostById);

// Edit Post
// router.put("/:postId", commentsController.editPost);

// Delete Post
// ...

module.exports = router;