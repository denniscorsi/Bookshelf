const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  googleId: { type: String, required: true },
  coverImg: String,
  description: String,
  totalRating: { type: Number, default: 0 },
  numRatings: { type: Number, default: 0 },
  tags: [String],
});

Book = mongoose.model('Book', bookSchema);

module.exports = Book;
