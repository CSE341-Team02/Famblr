// Comments API Call Logic
const Comment = require("../../models/comment");

// Create Comment
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