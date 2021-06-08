const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require('./routes')

require("dotenv").config({ path: __dirname + "/.env" });
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser({ extended: false })); // For parsing the body of a POST

app.use('/', routes);

app.listen(PORT, () => {
  console.log(` * Listening on http://localhost:${PORT}`);
});
