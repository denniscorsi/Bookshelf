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

//send post request to books endpoint with the title in the body to create a new book in the database
app.post(
  '/books',
  bookController.findBook,
  bookController.addBook,
  bookController.buildBookComponent,
  (res, req) => {}
);

app.use('/build', express.static(path.join(__dirname, '../build')));

app.listen(3000, () => console.log('Server listening on 3000'));
