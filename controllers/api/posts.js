const { validationResult } = require('express-validator/check');
const io = require("../../utils/socket");

const Post = require("../../models/post");
const Image = require("../../models/image");

// Get All Posts
exports.getAllPosts = async (req, res, next) => {
  if (req.query.limit) {

  }
  if (req.query.offset) {

  }

  const totalItems = await Post.countDocuments();
  // console.log(totalItems);


  Post.find()
    .sort({ date: "desc" })
    .skip(parseInt(req.query.offset))
    .limit(parseInt(req.query.limit))
    .populate("userId", ["username", "firstName", "lastName", "profilePicture"])
    .then(allPosts => {

      res.json({
        totalItems: totalItems,
        allPosts: allPosts
      });
    })
    .catch(error => {
      console.error(error);
      return next(error);
    });
};

exports.getPostById = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then(post => {
      res.json(post);
    })
    .catch(error => {
      console.error(error);
      return next(error);
    });
};

// Create Post
exports.createPost = async (req, res, next) => {
  const text = req.body.text;
  const errors = validationResult(req);

  console.log(errors)

  if (!errors.isEmpty()) {
    let error = new Error("Post cannot be empty and must be less than 100 characters!");
    return next(error);
  }

  const post = new Post({
    text: text,
    userId: req.user
  });

  // Save image if one uploaded
  if (req.file) {
    const image = new Image({ ...req.file });
    await image.save();
    post.image = image._id;
  }

  post
    .save()
    .then((result) => {

      io.getIO().emit("new-post", post);
      console.log(` * (Socket) : "new-post" { postId: ${post._id} }`)

      return res.json(result);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

// Edit Post
exports.editPost = async (req, res, next) => {
  try {
    let postId = req.params.postId;
    let newText = req.body.text;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      let error = new Error("Post cannot be empty and must be less than 100 characters!");
      return next(error);
    }

    // Find post by the postId in the url
    let post = await Post.findById(postId);

    // Throw 404 if post not found
    if (!post) {
      let error = new Error("Post Not Found");
      error.statusCode = 404;
      throw error;
    }

    // Thow 403-Forbidden error if trying to edit post created by different user
    if (req.session.user._id.toString() != post.userId.toString()) {
      let error = new Error("Post created by different user");
      error.statusCode = 403;
      throw error;
    }

    // Delete Image if marked for deletion
    if (req.body.deleteImage === 'true') {
      post.image = null;
    }
    // Save image if one provided
    else if (req.file) {
      const image = new Image({ ...req.file });
      await image.save();
      post.image = image;
    }

    // Set the new post text
    post.text = newText;

    // Save Changes to MongoDB
    await post.save();

    // Return Updated Post
    res.json({ post });

  } catch (error) {
    // Return error if one is thrown
    return res.status(error.statusCode || 400).json({ error: error.message });
  }
};

// Delete Post
exports.deletePost = async (req, res, next) => {
  // console.log("deletePost");
  try {
    let postId = req.params.postId;
    // console.log("rrrrrrriiiiiiiiiiiigggggggghhhhhhhhhhhhhtttttttttttttt   hhhhhhhhhheeeeeeeeerrrrrrrrrrrreeeeeeeeee")

    // Find post by the postId in the url
    let post = await Post.findById(postId);

    let comments = post.comments;
    // console.log(comments[0]);

    // Throw 404 if post not found
    if (!post) {
      let error = new Error("Post Not Found");
      error.statusCode = 404;
      throw error;
    }

    // Thow 403-Forbidden error if trying to delete post created by different user
    if (req.session.user._id.toString() != post.userId.toString()) {
      let error = new Error("Post created by different user");
      error.statusCode = 403;
      throw error;
    }

    // Save Changes to MongoDB
    await post.delete();

    return res.json({ message: "Post Deleted" })

  } catch (error) {
    // Return error if one is thrown
    return res.status(error.statusCode || 400).json({ error: error.message });
  }
};

// Test Get Posts Route
// exports.testGetPosts = async (req, res, next) => {
//   let posts = await Post.find()
//     .populate("userId", ["username", "firstName", "lastName"])
//     .populate("comments");
//   return res.json({ posts });
// };
