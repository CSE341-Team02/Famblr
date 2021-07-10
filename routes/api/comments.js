const router = require("express").Router();
const { body } = require('express-validator/check');

// Controller
const commentsController = require("../../controllers/api/comments");

// Create Comment
router.post("/", 
[
    body('content')
            .isLength({ min: 1, max: 100 })
],
commentsController.createComment);

// Get Comments For Post 
router.get("/post/:postId", commentsController.getCommentsForPost);

// Edit Comment
router.put("/:commentId", 
[
    body('content')
            .isLength({ min: 1, max: 100 })
],
commentsController.editComment);

// Delete Comment
router.delete("/:commentId", commentsController.deleteComment);

module.exports = router;