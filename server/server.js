const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const bookController = require('./controllers/bookController');

const app = express();

const mongoURI = 'mongodb://localhost/bookapp';
mongoose.connect(mongoURI);

app.use(express.json());

app.get('/', (req, res) => {
  const index = path.join(__dirname, '../index.html');
  return res.status(200).sendFile(index);
});

//post request for books/gpt get a book recommendation from chatGPT
app.post(
  '/books/gpt',
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

app.post('/books/ratings', bookController.updateRating, (req, res) => {
  res.status(200).end();
});

//get request to books will load all the books in the database into an object and return that object
app.get('/books', bookController.loadBooks, (req, res) => {
  res.status(200).json(res.locals.books);
});

//send post request to books endpoint with the title in the body to create a new book in the database
app.post(
  '/books',
  bookController.findBook,
  bookController.unpackBookData,
  bookController.addBook,
  //bookController.buildBookComponent,
  (req, res) => {
    res.status(200).json(res.locals.newBook);
  }
);

app.post('/books/notes', bookController.addNote, (req, res) => {
  console.log('Book note added:', res.locals.updatedBook);
  res.status(200).json(res.locals.updatedBook);
});

app.delete('/books', bookController.deleteBook, (req, res) => {
  res.status(200).end();
});

app.use('/build', express.static(path.join(__dirname, '../build')));

app.listen(3000, () => console.log('Server listening on 3000'));
