const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  settings: {},
  // userBookData: {
  //   ABFKJ34H: {
  //     note: "i liked this book",
  //     rating: 4,
  //     review: "If you kike scifi this is for you!",
  //     hasRead: false
  //   },
  //   KFIJE: {}
  // },
  userBookData: {}, // TODO: when add book to shelf, create a key for it in bookData.
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
