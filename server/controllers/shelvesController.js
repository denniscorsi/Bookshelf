const shelvesController = {};
const User = require("../models/userModel");

shelvesController.getUserShelves = async (req, res, next) => {
  const { username } = req.cookies;

  const foundUser = await User.findOne({ username });
  if (foundUser) {
    console.log(foundUser);
    const shelves = foundUser.shelves;
    const shelfNames = shelves.map((shelf) => shelf.name);
    res.locals.shelves = shelfNames;
  } else {
    console.log("no user");
    res.locals.shelves = [];
  }

  next();
};

shelvesController.addToShelf = async (req, res, next) => {
  const { username } = req.cookies;
  const { shelf, googleId } = req.body;

  const { user } = res.locals;
  if (user) {
    const shelves = user.shelves;
    console.log({ user });
    console.log({ shelves });
    const selectedShelf = shelves.find((shelve) => shelve.name === shelf);
    selectedShelf.books.push(googleId);
    console.log({ shelves });

    await User.findOneAndUpdate({ username }, { shelves });

    return next();
  } else {
    return next("No User");
  }
};

module.exports = shelvesController;
