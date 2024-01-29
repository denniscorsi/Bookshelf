const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const bookRouter = require('./routers/bookRouter');

const app = express();

const mongoURI = 'mongodb://localhost/bookapp';
mongoose.connect(mongoURI);

app.use(express.json());

app.get('/', (req, res) => {
  const index = path.join(__dirname, '../index.html');
  return res.status(200).sendFile(index);
});

app.use('/books', bookRouter);

//serve static pages
app.use('/build', express.static(path.join(__dirname, '../build')));

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'an error occured' },
  };
  const errOrb = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  res.status(errObj.status).json(errObj.message);
});

app.listen(3000, () => console.log('Server listening on 3000'));
