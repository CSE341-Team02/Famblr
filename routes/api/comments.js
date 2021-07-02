const router = require("express").Router();

// Controller
const commentsController = require("../../controllers/api/comments");

// Create Post
router.post("/", commentsController.createComment);

// Get Comments For Post 
router.get("/post/:postId", commentsController.getCommentsForPost);

// Edit Comment
router.put("/:commentId", commentsController.editComment);

// Delete Comment
router.delete("/:commentId", commentsController.deleteComment);

module.exports = router;