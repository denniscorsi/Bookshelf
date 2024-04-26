const { PhoneBluetoothSpeakerRounded } = require("@mui/icons-material");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

const bookController = {};

// get book data from Google api
bookController.findBooks = (req, res, next) => {
  const { query } = req.query;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then((res) => res.json())
    .then((booksData) => {
      res.locals.booksData = booksData;
      return next();
    })
    .catch((err) => {
      return next({
        log: "Error finding book",
        message: {
          err: "Fetch request to google api failed in bookController.findBook"
        }
      });
    });
};

// Pull book data from our database
bookController.findBookById = (req, res, next) => {
  const { googleId } = req.params;
  Book.findOne({ googleId })
    .exec()
    .then((result) => {
      res.locals.book = result;
      return next();
    })
    .catch((err) => console.error(err));
};

// pulls out relevant data from google's api response
bookController.unpackBookData = (req, res, next) => {
  const { booksData } = res.locals;
  const booksFull = booksData["items"];
  const books = [];
  for (const bookFull of booksFull) {
    const book = {
      googleId: bookFull.id,
      authors: bookFull.volumeInfo.authors,
      title: bookFull.volumeInfo.title,
      description: bookFull.volumeInfo.description,
      coverImg: bookFull.volumeInfo?.imageLinks?.thumbnail //TODO: deal with fact that there may be a book without an image
    };
    books.push(book);
  }

  // //shorten description
  // if (description.length > 300) description = description.slice(0, 300) + '...';

  res.locals.books = books;
  return next();
};

// adds book to mongoDB
bookController.addBook = (req, res, next) => {
  const { title, authors, googleId, description, coverImg } = req.body;
  const author = authors[0];

  console.log("entered Add Book. body:", req.body);

  Book.findOne({ googleId })
    .exec()
    .then((result) => {
      console.log("done searching, found:", result);
      if (result) return next();
      else {
        Book.create({ title, author, googleId, description, coverImg }).then(
          (result) => {
            console.log("Added book to database:", result);
            return next();
          },
          (err) => {
            console.error(err);
            return next({
              log: "Error adding book to database",
              message: {
                err: "creating a new book in MongoDB failed in bookController.addBook"
              }
            });
          }
        );
      }
    })
    .catch((err) => console.error(err));
};

// load all books from mongoDB
bookController.loadBooks = (req, res, next) => {
  Book.find({}).then(
    (books) => {
      books.reverse();
      res.locals.books = books;
      console.log("Loaded books in middleware");
      return next();
    },
    (err) => {
      return next({
        log: "Error loading books from database",
        message: {
          err: "Loading all books from MongoDB failed in bookController.loadBooks"
        }
      });
    }
  );
};

// load all books from a given shelf
bookController.loadBooksFromShelf = async (req, res, next) => {
  const { shelfName } = req.params;
  const { username } = res.locals;

  console.log("Attempting to load books for shelf:", shelfName);

  // Get list of googleIds of books from shelf in User
  const user = await User.findOne({ username });
  const userShelves = user.shelves;
  const selectedShelf = userShelves.find((shelf) => shelf.name === shelfName);
  const googleIds = selectedShelf.books; // this is an array of googleIds

  // Then get each of those book objects from Book
  console.log("Searching for the following books:", googleIds);
  Book.find({ googleId: { $in: googleIds } })
    .then((books) => {
      books.reverse();
      res.locals.books = books;
      console.log("Loaded books in middleware");
      return next();
    })
    .catch((err) => {
      return next({
        log: "Error loading books from database",
        message: {
          err: "Loading all books from MongoDB failed in bookController.loadBooks"
        }
      });
    });
};

// TODO: change this to delete from a user's books
// deletes a book from the database
bookController.deleteBook = (req, res, next) => {
  const { title } = req.body;
  Book.deleteOne({ title }).then(
    (result) => console.log(result),
    (err) => {
      return next({
        log: "Error deleting book from database",
        message: {
          err: "Deleting a new book in MongoDB failed in bookController.deleteBook"
        }
      });
    }
  );
  return next();
};

// adds a note to a book
bookController.addNote = (req, res, next) => {
  const { user } = res.locals;
  const { googleId, note } = req.body;

  const { userBookData } = user;
  const thisBookData = userBookData[googleId];
  thisBookData.note = note;

  // Update database
  User.findOneAndUpdate({ username: user.username }, { userBookData })
    .then((doc) => {
      if (doc) console.log("found");
      else console.log("no document");
    })
    .catch((err) => console.log({ err }));

  next();
};

// TODO: then update total on book itself
// updates rating on a book
bookController.updateRating = (req, res, next) => {
  const { user } = res.locals;
  const { googleId, rating } = req.body;

  const { userBookData } = user;
  const thisBookData = userBookData[googleId];
  thisBookData.rating = rating;

  // Update database
  User.findOneAndUpdate({ username: user.username }, { userBookData })
    .then((doc) => {
      if (doc) console.log("user found");
      else console.log("no user document");

      // update total rating on the book
      Book.findOneAndUpdate(
        { googleId },
        { $inc: { numRatings: 1, totalRating: rating } },
        { new: true }
      ).then((doc) => {
        if (doc) console.log({ doc });
        else console.log("bood not found");
      });
    })
    .catch((err) => console.log({ err }));

  // TODO: If a user changes their rating, there needs to be different logic

  next();
};

// get the current NYT Bestseller list data
bookController.getNYTList = (req, res, next) => {
  const { category } = req.params;
  console.log("CATEGORY:", category);
  const key = "aYY0LRbzKdAHRUQnGUEkBzb5JqMXxWr5";
  const url =
    "https://api.nytimes.com/svc/books/v3/lists/current/" + category + ".json?api-key=" + key;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("NYT DATA....", data);
      const bestsellersPacked = data.results.books; //this will be an array ob objects with a lot of info on the books
      res.locals.bestsellersPacked = bestsellersPacked;
      return next();
    })
    .catch((err) => {
      return next({
        log: "Error getting NYT Bestseller List",
        message: {
          err: "fetch request to NYTimes api failed in bookController.getNYTList"
        }
      });
    });
};

// Unpacks the retrieved NYT Bestseller list data into an array of titles
bookController.unpackNYTList = (req, res, next) => {
  String.prototype.titleCase = function () {
    let str = this.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
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
