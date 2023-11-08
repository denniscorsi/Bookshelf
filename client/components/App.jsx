import React, { useState, useEffect } from 'react';
import Search from './Search.jsx';
import Bookshelf from './Bookshelf.jsx';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

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

  const theme = createTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Search setHasNewBook={setHasNewBook} hasNewBook={hasNewBook} />
        <Bookshelf
          books={books}
          setHasNewBook={setHasNewBook}
          hasNewBook={hasNewBook}
          setHasDeletedBook={setHasDeletedBook}
          hasDeletedBook={hasDeletedBook}
          numNotes={numNotes}
          setNumNotes={setNumNotes}
        />
      </ThemeProvider>
    </>
  );
};

export default App;
