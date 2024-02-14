const Book = require('../models/bookModel');


const bookController = {};

// get book data from Google api
bookController.findBook = (req, res, next) => {
  const { title } = req.body;

  //console.log('REQUEST', req);

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then((res) => res.json())
    .then((bookData) => {
      res.locals.bookData = bookData;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error finding book',
        message: {
          err: 'Fetch request to google api failed in bookController.findBook',
        },
      });
    });
};

// pulls out relevant data from google's api response
bookController.unpackBookData = (req, res, next) => {
  const bookData = res.locals.bookData;
  const books = bookData['items'];
  const book = books[0];
  const bookInfo = book.volumeInfo;
  const title = bookInfo.title;
  const author = bookInfo.authors[0];
  let description = bookInfo.description;
  //shorten description
  if (description.length > 300) description = description.slice(0, 300) + '...';

  const coverImg = bookInfo.imageLinks.thumbnail;
  const newBook = { title, author, description, coverImg };
  res.locals.newBook = newBook;
  return next();
};

// adds book to mongoDB
bookController.addBook = (req, res, next) => {
  const { title, author, description, coverImg } = res.locals.newBook;

  Book.create({ title, author, description, coverImg }).then(
    (result) => {
      console.log('Added book to database:', result);
      return next();
    },
    (err) => {
      return next({
        log: 'Error adding book to database',
        message: {
          err: 'creating a new book in MongoDB failed in bookController.addBook',
        },
      });
    }
  );
};

// load all books from mongoDB
bookController.loadBooks = (req, res, next) => {
  Book.find({}).then(
    (books) => {
      books.reverse();
      res.locals.books = books;
      console.log('Loaded books in middleware');
      return next();
    },
    (err) => {
      return next({
        log: 'Error loading books from database',
        message: {
          err: 'Loading all books from MongoDB failed in bookController.loadBooks',
        },
      });
    }
  );
};

// deletes a book from the database
bookController.deleteBook = (req, res, next) => {
  const { title } = req.body;
  Book.deleteOne({ title }).then(
    (result) => console.log(result),
    (err) => {
      return next({
        log: 'Error deleting book from database',
        message: {
          err: 'Deleting a new book in MongoDB failed in bookController.deleteBook',
        },
      });
    }
  );
  return next();
};

// adds a note to a book
bookController.addNote = (req, res, next) => {
  const { title, note } = req.body;
  Book.findOneAndUpdate({ title }, { note }, { returnDocument: 'after' }).then(
    (updatedBook) => {
      res.locals.updatedBook = updatedBook;
      return next();
    },
    (err) => {
      return next({
        log: 'Error updating note in database',
        message: {
          err: 'updating a note in MongoDB failed in bookController.addNote',
        },
      });
    }
  );
};

// updates rating on a book
bookController.updateRating = (req, res, next) => {
  const { title, rating } = req.body;
  Book.findOneAndUpdate({ title }, { rating }).then(
    (result) => {
      console.log('UPDATED RATING', result);
      return next();
    },
    (err) => {
      return next({
        log: 'Error updating rating in database',
        message: {
          err: 'updating rating in MongoDB failed in bookController.updateRating',
        },
      });
    }
  );
};

// get the current NYT Bestseller list data
bookController.getNYTList = (req, res, next) => {
  const { category } = req.params;
  console.log('CATEGORY:', category);
  const key = 'aYY0LRbzKdAHRUQnGUEkBzb5JqMXxWr5';
  const url =
    'https://api.nytimes.com/svc/books/v3/lists/current/' +
    category +
    '.json?api-key=' +
    key;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('NYT DATA....', data);
      const bestsellersPacked = data.results.books; //this will be an array ob objects with a lot of info on the books
      res.locals.bestsellersPacked = bestsellersPacked;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error getting NYT Bestseller List',
        message: {
          err: 'fetch request to NYTimes api failed in bookController.getNYTList',
        },
      });
    });
};

// Unpacks the retrieved NYT Bestseller list data into an array of titles
bookController.unpackNYTList = (req, res, next) => {
  String.prototype.titleCase = function () {
    let str = this.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  };

  const { bestsellersPacked } = res.locals;
  const bestsellers = [];
  bestsellersPacked.forEach((bestseller) => {
    bestsellers.push(bestseller.title.titleCase());
  });
  res.locals.bestsellers = bestsellers;
  return next();
};

module.exports = bookController;
