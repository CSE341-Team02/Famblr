const Post = require("../../models/post");

// Get All Posts
exports.getAllPosts = (req, res, next) => {
  res.json({
    posts: "todos",
  });
  /*Post.find()
  .then( allPosts => {

    res.json({
      allPosts
    });
  })
  .catch(error => {
    console.log(eror);
  });*/
};

// Create Post
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

// Edit Post
exports.editPost = async (req, res, next) => {
  try {
    let postId = req.params.postId;
    let newText = req.body.text;

    // Throw error if no text provided
    if (!newText) throw new Error("Missing text");

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

// TODO
// Delete Post
// ...

// Test Get Posts Route
// exports.testGetPosts = async (req, res, next) => {
//   let posts = await Post.find()
//     .populate("userId", ["username", "firstName", "lastName"])
//     .populate("comments");
//   return res.json({ posts });
// };
