const Post = require("../../models/post")

exports.editPost = async (req, res, next) => {

    const postId = req.params.postId;

    // Find post by the postId in the url
    const post = await Post.findById(postId);

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


    res.render("edit-post", {
        post: post
    });
};
