import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './Header.jsx';
import Search from './Search.jsx';
import Bookshelf from './Bookshelf.jsx';
import NYTBestsellers from './NYTBestsellers.jsx';
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
    <BrowserRouter>
      <Header />
      <Search
        setHasNewBook={setHasNewBook}
        hasNewBook={hasNewBook}
        books={books}
      />
      <Link to="/test">TEST</Link>
      <Link to="/hiiii">HIII</Link>
      <Routes>
        <Route path="/test" element={<h1>TEST</h1>} />
        <Route path="/hiiii" element={<h1>HIII</h1>} />
      </Routes>
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
      <NYTBestsellers hasNewBook={hasNewBook} setHasNewBook={setHasNewBook} />
    </BrowserRouter>
  );
};

export default App;
