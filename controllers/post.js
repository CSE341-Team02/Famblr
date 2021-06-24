const { validationResult } = require("express-validator/check");

const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const contentText = req.body.contentText;
  // const contentImage = req.body.contentImage;

  const post = new Post({
    text: contentText,
    userId: req.user,
    // ,contentImage: contentImage
  });

  post
    .save()
    .then((result) => {
      console.log("Created Post");

      res.json(result); // Send a response so the frontend know the request finished
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// POST /post/:id/json
exports.editPostJSON = async (req, res, next) => {
  let postID = req.params.id;
  let newText = req.body.text;

  let post = await Post.findById(postID);

  // TODO
  // If post.userId != currentUser, then throw unauthorized error

  post.text = newText;

  await post.save();

  res.json({ post });
};
