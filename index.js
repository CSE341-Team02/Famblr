const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// const csrf = require('csurf');
const flash = require('connect-flash');



require("dotenv").config({ path: __dirname + "/.env" });
const PORT = process.env.PORT || 5000;

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});
// const csrfProtection = csrf();

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const routes = require('./routes')
const postRoutes = require('./routes/feed.js');

app.use(bodyParser({ extended: false })); // For parsing the body of a POST
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
  })
)
// app.use(csrfProtection)
app.use(flash())

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

app.use("/", routes);
app.use(postRoutes);

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4,
};

mongoose
  .connect(process.env.MONGODB_URI, options)
  .then((result) => {
    console.log(" * Connected to Database: ", result.connections[0].name);
    app.listen(PORT, () => {
      console.log(` * Listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
