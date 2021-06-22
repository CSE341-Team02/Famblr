const {validationResult} = require('express-validator/check');

const Post = require('../models/post');

exports.createPost = (req, res, next) => {

    console.log("Post creation attempt");

    const contentText = req.body.contentText;
    // const contentImage = req.body.contentImage;

    const post = new Post({
        contentText: contentText 
        // ,contentImage: contentImage
    });

    post
    .save()
    .then(result => {
        console.log('Created Post');
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
};