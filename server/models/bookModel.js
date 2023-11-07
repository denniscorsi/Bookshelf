const mongoose = require('mongoose');

const schema = mongoose.schema;

const bookSchema = new schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImg: String,
  description: String,
});

Book = mongoose.model('Book', bookSchema);

module.exports = Book;
