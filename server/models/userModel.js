const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // settings: {},
  shelves: {
    type: [],
    default: [
      {
        name: "To Read",
        books: []
      },
      {
        name: "Unfiled",
        books: []
      }
    ]
  },
  next: []
});

const User = mongoose.model("User", userSchema);

module.exports = User;
