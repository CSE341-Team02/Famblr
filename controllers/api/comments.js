// Comments API Call Logic
const Comment = require("../../models/comment");
const io = require("../../utils/socket");

// Create Comment
// POST /api/comments
exports.createComment = async (req, res, next) => {
  const commentText = req.body.content;
  const relatedPost = req.body.relatedPost;

  const comment = new Comment({
    relatedPost: relatedPost,
    content: commentText,
    userId: req.user,
  });

  try {
    await comment.save();

    io.getIO().emit("new-comment", comment);
    console.log(` * (Socket) : "new-comment" { commentId: ${comment._id} }`)

    return res.json(comment);
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};


// Get All Comments for a post
// GET /api/comments/post/:postId
exports.getCommentsForPost = async (req, res, next) => {

  const relatedPost = req.params.postId;
  const commentsList = await Comment.find({ relatedPost: relatedPost })
    .populate("userId", "firstName lastName profilePicture")
    .exec();
  // console.log(commentsList, "the comments list");
  return res.json([...commentsList]);
};


// Edit Comment
// PUT /api/comments/:commentId
exports.editComment = async (req, res, next) => {
  try {
    let commentId = req.params.commentId;
    let newContent = req.body.content;

    // Throw error if no text provided
    if (!newContent) throw new Error("Missing content");

    // Find Comment by the commentId in the url
    let comment = await Comment.findById(commentId);

    // Throw 404 if Comment not found
    if (!comment) {
      let error = new Error("Comment Not Found");
      error.statusCode = 404;
      throw error;
    }

    // Thow 403-Forbidden error if trying to edit Comment created by different user
    if (req.session.user._id.toString() != comment.userId.toString()) {
      let error = new Error("Comment created by different user");
      error.statusCode = 403;
      throw error;
    }

    // Set the new post text
    comment.content = newContent;
    comment.lastModification = new Date();

    // Save Changes to MongoDB
    await comment.save();

    // Broadcast event to sockets
    io.getIO().emit("update-comment", comment);
    console.log(` * (Socket) : "update-comment" { commentId: ${comment._id} }`)

    // Return Updated Post
    return res.json({ comment });
  } catch (error) {
    return next(error);
  }
};


// Delete Comment
// DELETE /api/comments/:commentId
exports.deleteComment = async (req, res, next) => {
  let commentId = req.params.commentId;
  let comment = await Comment.findById(commentId);

  // TODO: Delete Comment


  // Broadcast event to sockets
  io.getIO().emit("delete-comment", comment);
  console.log(` * (Socket) : "delete-comment" { commentId: ${commentId} }`)

  return res.json({});
};
