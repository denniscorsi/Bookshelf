const Book = require('../models/bookModel');
const OpenAI = require('openai');

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
    .catch(console.log);
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

  Book.create({ title, author, description, coverImg })
    .then((result) => {
      console.log('Added book to database:', result);
      return next();
    })
    .catch(next);
};

// load all books from mongoDB
bookController.loadBooks = (req, res, next) => {
  Book.find({}).then((books) => {
    books.reverse();
    res.locals.books = books;
    console.log('Loaded books in middleware');
    return next();
  });
};

// deletes a book from the database
bookController.deleteBook = (req, res, next) => {
  const { title } = req.body;
  Book.deleteOne({ title }).then(console.log);
  return next();
};

// adds a note to a book
bookController.addNote = (req, res, next) => {
  const { title, note } = req.body;
  Book.findOneAndUpdate({ title }, { note }, { returnDocument: 'after' }).then(
    (updatedBook) => {
      res.locals.updatedBook = updatedBook;
      return next();
    }
  );
};

bookController.updateRating = (req, res, next) => {
  const { title, rating } = req.body;
  Book.findOneAndUpdate({ title }, { rating }).then((result) => {
    console.log('UPDATED RATING', result);
    return next();
  });
};

// gets a recommendation from chatGPT, based on a single book
bookController.findRec = async (req, res, next) => {
  // console.log('STOPPING REQUEST');
  // return next('not yet!');
  console.log('CHATGPT REQUEST!');
  const { title } = req.body;

  const openai = new OpenAI({
    apiKey: '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', //make this a secret env variable
  });

  const GPTresponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful librarian. ',
      },
      {
        role: 'user',
        content: `Please recommend one book that I would like, knowing that I liked the book "${title}". Begin your response with the name of the book. Also explain why I'd like this book based on enjoying ${title} Respond with less than 65 words.`,
      },
    ],
    temperature: 1,
    max_tokens: 120,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.locals.GPTresponse = GPTresponse;
  return next();
};

// gets a recommendation from chatGPT, based on array of likes
bookController.findGeneralRec = async (req, res, next) => {
  // console.log('STOPPIN GENERAL REC REQUEST');
  // return next('not yet!');
  console.log('CHATGPT REQUEST!');
  //favBooks will be an array of books the user likes.
  let { favBooks } = req.body;
  console.log(favBooks);
  favBooks = favBooks.toString();

  const openai = new OpenAI({
    apiKey: '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', //make this a secret env variable
  });

  const GPTresponse = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful librarian. ',
      },
      {
        role: 'user',
        content: `Please recommend one book that I would like, knowing that I liked the following books: ${favBooks}. Begin your response with the name of the book. Also explain why I'd enjoy this book based on the books I liked. Respond with less than 90 words.`,
      },
    ],
    temperature: 1,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.locals.GPTresponse = GPTresponse;
  return next();
};

// pull the title and message out of the chatGPT response
bookController.unpackRec = (req, res, next) => {
  const { GPTresponse } = res.locals;

  // this is the actual text response
  const GPTbody = GPTresponse.choices[0].message.content;
  console.log('RESPONSE: ', GPTbody);
  res.locals.fullRec = GPTbody;

  // this finds the word "by" and assumes the title is everything before that
  // ChatGPT was asked to repond with the title of the book first, so we know that is coming first
  let title = '';
  for (let i = 0; i < 100; i++) {
    if (GPTbody[i] === 'b' && GPTbody[i + 1] === 'y') {
      title = GPTbody.slice(0, i - 1);
      break;
    }
  }
  console.log('TITLE:', title);

  res.locals.title = title;
  next();
};

module.exports = bookController;
