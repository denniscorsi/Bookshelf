//import React from 'react';
import React, { useState, useEffect } from 'react';
import Search from './Search.jsx';
import Bookshelf from './Bookshelf.jsx';

const App = () => {
  const [books, setBooks] = useState([{}]);
  const [hasNewBook, setHasNewBook] = useState(false);
  const [hasDeletedBook, setHasDeletedBook] = useState(false);
  const [numNotes, setNumNotes] = useState(1);

  console.log('rendering App');
  useEffect(() => {
    console.log('Running useEffect');
    fetch('/books')
      .then((res) => res.json())
      .then((bookArr) => {
        console.log('Got new books');
        console.log(bookArr);
        setBooks(bookArr);
      })
      .catch();
    return () => {
      console.log('Ran cleanup function');
    };
  }, [hasNewBook, hasDeletedBook]);

  return (
    <>
      <Search setHasNewBook={setHasNewBook} hasNewBook={hasNewBook} />
      <Bookshelf
        books={books}
        setHasDeletedBook={setHasDeletedBook}
        hasDeletedBook={hasDeletedBook}
        numNotes={numNotes}
        setNumNotes={setNumNotes}
      />
    </>
  );
};

export default App;
