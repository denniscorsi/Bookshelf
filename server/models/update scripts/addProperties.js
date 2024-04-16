// Need to add a settings property and a userBookData property to user's who don't already have them
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const User = require("../userModel");

User.updateMany(
  { settings: { $exists: false } },
  {
    $set: {
      settings: {},
      userBookData: {}
    }
  }
)
  .then(console.log)
  .catch(console.log);
