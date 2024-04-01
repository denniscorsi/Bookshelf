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

module.exports = shelvesController;
