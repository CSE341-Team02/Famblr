const router = require("express").Router();

// Account Details
router.get("/", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

router.post("/update-account", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

router.post("/delete-account", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

module.exports = router;
