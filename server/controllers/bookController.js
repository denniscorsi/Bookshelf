const bookController = {};

bookController.findBook = (req, res, next) => {
  const { title } = req.body;

  //get book data from Google api
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
  const description = bookInfo.description;
  const imgsrc = bookInfo.imageLinks.thumbnail;
  const newBook = { title, author, description, imgsrc };
  res.locals.newBook = newBook;
  return next();
};

bookController.addBook = (req, res, next) => {
  
};

bookController.buildBookComponent = (req, res, next) => {};

module.exports = bookController;
