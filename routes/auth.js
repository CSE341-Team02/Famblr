const router = require("express").Router();

// Login Routes
router.get("/login", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});
router.post("/login", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

// Sign Up
router.get("/sign-up", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});
router.post("/sign-up", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

// Log Out
router.post("/logout", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

// Reset Password
router.get("/reset-password", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});
router.post("/reset-password", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

router.get("/reset-password/:token", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});
router.post("/reset-password/:token", (req, res, next) => {
  res.send(`${req.method} ${req.originalUrl}`); // placeholder route
});

module.exports = router;
