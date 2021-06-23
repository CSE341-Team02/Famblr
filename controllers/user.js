// const crypto = require('crypto');

// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require("express-validator/check");

const User = require("../models/user");

exports.getCurrentUser = (req, res, next) => {
  const user = req.session.user;
  return res.json(user)
};

//Delete User

//Show all users??
