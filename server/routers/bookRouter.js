const express = require('express');
const bookRouter = express.Router();


const bookController = require('../controllers/bookController');

//post request for books/gpt/general gets a book recommendation from chatGPT based on all likes
bookRouter.post(
  '/gpt/general',
  bookController.findGeneralRec,
  bookController.unpackRec,
  (req, res) => {
    const data = {
      title: res.locals.title,
      fullRec: res.locals.fullRec,
    };
    res.status(200).json(data);
  }
);

//post request for books/gpt gets a book recommendation from chatGPT based on "find similar"
bookRouter.post(
  '/gpt',
  bookController.findRec,
  bookController.unpackRec,
  (req, res) => {
    const data = {
      title: res.locals.title,
      fullRec: res.locals.fullRec,
    };
    res.status(200).json(data);
  }
);

bookRouter.post('/ratings', bookController.updateRating, (req, res) => {
  res.status(200).end();
});

//get request to books will load all the books in the database into an object and return that object
bookRouter.get('/', bookController.loadBooks, (req, res) => {
  res.status(200).json(res.locals.books);
});

//get an array of titles of the NYT best sellers. Take in a param of the name of the list (e.g. 'hardcover-fiction' )
bookRouter.get(
  '/nyt/:category',
  bookController.getNYTList,
  bookController.unpackNYTList,
  (req, res) => {
    res.status(200).json(res.locals.bestsellers);
  }
);

//send post request to books endpoint with the title in the body to create a new book in the database
bookRouter.post(
  '/',
  bookController.findBook,
  bookController.unpackBookData,
  bookController.addBook,
  (req, res) => {
    res.status(200).json(res.locals.newBook);
  }
);

// add a note to a book in the database
bookRouter.post('/notes', bookController.addNote, (req, res) => {
  console.log('Book note added:', res.locals.updatedBook);
  res.status(200).json(res.locals.updatedBook);
});

//remove a book from the database
bookRouter.delete('/', bookController.deleteBook, (req, res) => {
  res.status(200).end();
});

module.exports = bookRouter;
