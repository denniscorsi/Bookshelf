const Book = require('../models/bookModel');

const bookController = {};

// get book data from Google api
bookController.findBook = (req, res, next) => {
  const { title } = req.body;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then((res) => res.json())
    .then((bookData) => {
      res.locals.bookData = bookData;
      return next();
    })
    .catch(console.log);
};

bookController.unpackBookData = (req, res, next) => {
  const bookData = res.locals.bookData;
  const books = bookData['items'];
  const book = books[0];
  const bookInfo = book.volumeInfo;
  const title = bookInfo.title;
  const author = bookInfo.authors[0];
  let description = bookInfo.description;
  //shorten description
  if (description.length > 400) description = description.slice(0, 400) + '...';

  const coverImg = bookInfo.imageLinks.thumbnail;
  const newBook = { title, author, description, coverImg };
  res.locals.newBook = newBook;
  return next();
};

//adds book to mongoDB
bookController.addBook = (req, res, next) => {
  const { title, author, description, coverImg } = res.locals.newBook;

  Book.create({ title, author, description, coverImg })
    .then((result) => {
      console.log('Added book to database:', result);
      return next();
    })
    .catch(next);
};

//load all books from mongoDB
bookController.loadBooks = (req, res, next) => {
  Book.find({}).then((books) => {
    res.locals.books = books;
    console.log('Loaded books in middleware');
    return next();
  });
};

bookController.buildBookComponent = (req, res, next) => {};

module.exports = bookController;
