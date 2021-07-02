// Comments API Call Logic
const Comment = require("../../models/comment");

// Create Comment
// POST /api/comments
exports.createComment = (req, res, next) => {
  const commentText = req.body.content;
  const relatedPost = req.body.relatedPost;

  const comment = new Comment({
    relatedPost: relatedPost,
    content: commentText,
    userId: req.user
  });

  comment
    .save()
    .then((result) => {
      console.log("Created Comment");

      res.json(result); // Send a response so the frontend know the request finished
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


// Get All Comments for a post
// GET /api/comments/post/:postId
exports.getCommentsForPost = (req, res, next) => {

  // TODO: Get Comments

  return res.json([])
};


// Edit Comment
// PUT /api/comments/:commentId
exports.editComment = (req, res, next) => {

  // TODO: Update Comment

  return res.json({})
}


// Delete Comment
// DELETE /api/comments/:commentId
exports.deleteComment = (req, res, next) => {

  // TODO: Delete Comment

  return res.json({})
}