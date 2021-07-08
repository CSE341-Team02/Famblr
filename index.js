const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cors = require('cors')
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// const csrf = require('csurf');
const flash = require("connect-flash");

const User = require("./models/user");

// Import Socket.IO
const { Server } = require("socket.io");

require("dotenv").config({ path: __dirname + "/.env" });
const PORT = process.env.PORT || 5000;

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});
// const csrfProtection = csrf();

//Imports public folder
app.use(express.static(path.join(__dirname, "public")));

//Imports views folder
app.set("views", path.join(__dirname, "views"));

//Sets the view engine to ejs
app.set("view engine", "ejs");

//Assigns routes to variables
const routes = require("./routes");

// For parsing the body of a POST
app.use(bodyParser({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// app.use(csrfProtection)
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  res.locals.currentPath = req.url;
  console.log(req.url);
  // res.locals.csrfToken = req.csrfToken();
  next();
});

//Middleware that assigns the logged in user to the req.user variable to use throughout the app
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id, '-password')
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

//Route middlewares
app.use("/", routes);

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4,
};

//Connect to database and start app
mongoose
  .connect(process.env.MONGODB_URI, options)
  .then((result) => {
    console.log(" * Connected to Database: ", result.connections[0].name);
    const server = app.listen(PORT, () => {
      console.log(` * Listening on http://localhost:${PORT}`);
    });

    // Initialize socket.io
    const io = require("./utils/socket").init(server);

    io.on('connection', (socket) => {

      // On Socket Connection
      console.log(` * Socket Connected: ${socket.id}`)

    });

  })
  .catch((err) => {
    console.log(err);
  });

