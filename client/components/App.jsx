import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Search from './Search.jsx';
import Bookshelf from './Bookshelf.jsx';
import { createTheme } from '@mui/material/styles';

const App = () => {
  const [books, setBooks] = useState([{}]);
  const [hasNewBook, setHasNewBook] = useState(false);
  const [hasDeletedBook, setHasDeletedBook] = useState(false);
  const [numNotes, setNumNotes] = useState(0);
  const [hasNewRating, setHasNewRating] = useState(true);

  console.log('rendering App');
  console.log('numNotes:', numNotes);
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
  }, [hasNewBook, hasDeletedBook, numNotes, hasNewRating]);

  return (
    <>
      <Header />
      <Search
        setHasNewBook={setHasNewBook}
        hasNewBook={hasNewBook}
        books={books}
      />
      <Bookshelf
        books={books}
        setHasNewBook={setHasNewBook}
        hasNewBook={hasNewBook}
        setHasDeletedBook={setHasDeletedBook}
        hasDeletedBook={hasDeletedBook}
        numNotes={numNotes}
        setNumNotes={setNumNotes}
        hasNewRating={hasNewRating}
        setHasNewRating={setHasNewRating}
      />
    </>
  );
};

export default App;
