const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const authController = {};

authController.register = (req, res, next) => {
  const { username, email, password } = req.body;

  // Make sure username or email don't already exist
  User.findOne({ username }).then((user) => {
    if (user) {
      return res
        .status(409)
        .json({ ok: false, message: 'User already exists' });
    }
  });

  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(4 - 6)
        .json({ ok: false, message: 'User already exists' });
    }
  });

  // encrypt password
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);

  const user = {
    username,
    email,
    password: hashedPass,
  };

  // Create new user
  User.create(user)
    .then((newUser) => {
      console.log('Created new user:', newUser);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error creating new user in database',
        message: {
          err: 'creating a new user in MongoDB failed in authController.register',
        },
      });
    });
};

authController.createSession = (req, res, next) => {};

module.exports = authController;
