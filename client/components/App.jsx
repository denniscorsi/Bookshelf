import React, { useState, useEffect } from 'react';
import Search from './Search.jsx';
import Bookshelf from './Bookshelf.jsx';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
//can remove theme providor if I don't end up using it

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
          hasNewRating={hasNewRating}
          setHasNewRating={setHasNewRating}
        />
      </ThemeProvider>
    </>
  );
};

export default App;
