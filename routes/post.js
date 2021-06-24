const router = require("express").Router();

const postController = require('../controllers/post');

// POST /post/:id/json
router.post('/:id/json', postController.editPostJSON);

module.exports = router;