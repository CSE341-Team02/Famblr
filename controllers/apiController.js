const Post = require("../models/post");


exports.getAllPosts = (req, res, next) => {
  
  res.json({
    allPosts: "todos"
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