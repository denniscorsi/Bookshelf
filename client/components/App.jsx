//import React from 'react';
import React, { useState, useEffect } from 'react';
import Book from './Book.jsx';
import Search from './Search.jsx';

const App = () => {
  const [books, setBooks] = useState([{}]);
  const [hasNewBook, setHasNewbook] = useState(false);

  useEffect(() => {
    fetch('/books')
      .then((res) => res.json())
      .then((bookArr) => {
        setBooks(bookArr);
      })
      .catch();
  }, [hasNewBook]);

  return (
    <>
      <Search setHasNewbook={setHasNewbook} />
      {books.map((book) => {
        return (
          <Book
            key={book.title + Math.random()}
            title={book.title}
            author={book.author}
            description={book.description}
            coverImg={book.coverImg}
          />
        );
      })}
    </>
  );
};

export default App;
