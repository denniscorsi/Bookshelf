const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImg: String,
  description: String,
  note: String,
});

Book = mongoose.model('Book', bookSchema);

module.exports = Book;
