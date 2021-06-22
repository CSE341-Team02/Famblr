// const crypto = require('crypto');

const bcrypt = require('bcryptjs'); 
// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

//Get add new user page
exports.getAddUser = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
    oldInput: {
      email: '',
      username: '',
    },
    validationErrors: []
  });
    
};

//Add a new user
exports.postAddUser = (req, res, next) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array(), "erorr array");
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        username: username,
      },
      validationErrors: errors.array()
    });
  }

  // Adding the user to the data base
  (async function () {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email: email,
        username: username,
        password: hashedPassword
      });

      await user.save();

      console.log("The user was successfully registered");

      res.redirect("/");
    } catch(error) {
      console.log(error);
    }
    
  })()

};

//Get the login page
exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};

//POST Login the user
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()[0].msg);
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
      },
      validationErrors: errors.array()
    });
  }

  User.findOne({email: email})
  .then( user => {
    console.log(user, "finding the user");
    console.log(user.password);
    if(!user) {
        
      return res.status(422).render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: "Invalid email or password",
        oldInput: {
          email: email,
          password: password
        },
        validationErrors: errors.array()
      });
    }


    bcrypt.compare(password, user.password)
    .then( doMatch => {
      if(doMatch) {
        console.log("they do match");

        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save( error => {
          console.log(req.session, "the session information");
          console.log(error, "error session");
          res.render('main/feed', {
            path: '/feed',
            // errorMessage: message,
            // oldInput: {
            //   email: '',
            //   password: ''
            // },
            validationErrors: []
          }); //Change this to the user's index page
        });
        
      } else {
        console.log("they do not match");
        return res.status(422).render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          errorMessage: 'Invalid email or password.',
          oldInput: {
            email: email,
            password: password
          },
          validationErrors: []
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.redirect("/login");
    })
  })


};

//Logout the user
exports.logOut = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/login');
  });
};

//Get reset password page
exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};

//Reset password
exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email found.');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'shop@node-complete.com',
          subject: 'Password reset',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
          `
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  });
};


//Delete User
//Show all users??

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         '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'
//     }
//   })
// );

//   User.findOne({ email: email })
//     .then(user => {
//       if (!user) {
//         return res.status(422).render('auth/login', {
//           path: '/login',
//           pageTitle: 'Login',
//           errorMessage: 'Invalid email or password.',
//           oldInput: {
//             email: email,
//             password: password
//           },
//           validationErrors: []
//         });
//       }
//       bcrypt
//         .compare(password, user.password)
//         .then(doMatch => {
//           if (doMatch) {
//             req.session.isLoggedIn = true;
//             req.session.user = user;
//             return req.session.save(err => {
//               console.log(err);
//               res.redirect('/');
//             });
//           }
//           return res.status(422).render('auth/login', {
//             path: '/login',
//             pageTitle: 'Login',
//             errorMessage: 'Invalid email or password.',
//             oldInput: {
//               email: email,
//               password: password
//             },
//             validationErrors: []
//           });
//         })
//         .catch(err => {
//           console.log(err);
//           res.redirect('/login');
//         });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };


//   bcrypt
//     .hash(password, 12)
//     .then(hashedPassword => {
//       const user = new User({
//         email: email,
//         password: hashedPassword,
//         cart: { items: [] }
//       });
//       return user.save();
//     })
//     .then(result => {
//       res.redirect('/login');
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.getNewPassword = (req, res, next) => {
//   const token = req.params.token;
//   User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
//     .then(user => {
//       let message = req.flash('error');
//       if (message.length > 0) {
//         message = message[0];
//       } else {
//         message = null;
//       }
//       res.render('auth/new-password', {
//         path: '/new-password',
//         pageTitle: 'New Password',
//         errorMessage: message,
//         userId: user._id.toString(),
//         passwordToken: token
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.postNewPassword = (req, res, next) => {
//   const newPassword = req.body.password;
//   const userId = req.body.userId;
//   const passwordToken = req.body.passwordToken;
//   let resetUser;

//   User.findOne({
//     resetToken: passwordToken,
//     resetTokenExpiration: { $gt: Date.now() },
//     _id: userId
//   })
//     .then(user => {
//       resetUser = user;
//       return bcrypt.hash(newPassword, 12);
//     })
//     .then(hashedPassword => {
//       resetUser.password = hashedPassword;
//       resetUser.resetToken = undefined;
//       resetUser.resetTokenExpiration = undefined;
//       return resetUser.save();
//     })
//     .then(result => {
//       res.redirect('/login');
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };
