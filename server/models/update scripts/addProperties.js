// Need to add a settings property and a userBookData property to user's who don't already have them

const User = require("../models/userModel");

User.updateMany(
  { settings: { $exists: false } },
  {
    settings: {},
    userBookData: {}
  }
);
