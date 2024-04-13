const User = require("../models/userModel");

userController = {};

// If this book doesn't already have user specific data, add it here
userController.intializeBookData = async (req, res, next) => {
  const { username } = req.cookies;
  const { googleId } = req.body;

  // user object is already on res.locals.foundUser
  const { userBookData } = res.locals.foundUser;

  // First check if book already exists in bookData
  if (userBookData[googleId]) return next();

  userBookData[googleId] = {
    note: null,
    rating: null,
    review: null,
    hadRead: false
  };

  // update user in database
  await User.findOneAndUpdate({ username }, { userBookData });

  return next();
};

module.exports = userController;
