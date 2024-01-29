const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const authController = {};

authController.register = async (req, res, next) => {
  const { username, email, password } = req.body.user;

  console.log('entered register');

  // Make sure username or email don't already exist
  let foundUser = await User.findOne({ username });
  if (foundUser) {
    return res.status(409).json({ ok: false, message: 'User already exists' });
  }

  foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(409).json({ ok: false, message: 'User already exists' });
  }

  // encrypt password
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);

  const user = {
    username,
    email,
    password: hashedPass,
  };

  // Create new user
  User.create(user).then(
    (newUser) => {
      console.log('Created new user:', newUser);
      return next();
    },
    (err) => {
      return next({
        log: 'Error creating new user in database',
        message: {
          err: 'creating a new user in MongoDB failed in authController.register',
        },
      });
    }
  );
};

authController.createSession = (req, res, next) => {};

module.exports = authController;
