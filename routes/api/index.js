const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/posts", require("./posts"));
router.use("/users", require("./users"));
router.use("/comments", require("./comments"));

// 404 Handler
router.use((req, res, next) => {
  res.status(404);
  return res.json({
    error: "path not found",
  });
});

// General Error Handler
router.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatusCode || 500);
  return res.json({
    error: error.message || "An unknown server error occured",
  });
});

module.exports = router;
