const router = require("express").Router();
const postsController = require("../../controllers/frontend/posts");

// Route For Showing All Posts
router.get('/', (req, res) => {
    return res.send("Show All Posts")
})

// Route For Showing Single Post
router.get('/:postId', (req, res) => {
    return res.send("Show All Posts")
})

// Route for showing Edit Page of Single Post
router.get("/:postId/edit", postsController.editPost);

module.exports = router;
