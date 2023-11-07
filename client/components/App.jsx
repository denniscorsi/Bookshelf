//import React from 'react';
import React, { useState, useEffect } from 'react';
import Search from './Search.jsx';
import Bookshelf from './Bookshelf.jsx';

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
      <Bookshelf books={books} />
    </>
  );
};

export default App;
