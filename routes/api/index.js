const router = require("express").Router();

router.use('/auth', require('./auth'))
router.use('/posts', require('./posts'))
router.use('/users', require('./users'))
router.use('/comments', require('./comments'))

module.exports = router;