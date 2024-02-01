import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import Header from './Header.jsx';
import Search from './Search.jsx';
import Bookshelf from './Bookshelf.jsx';
import NYTBestsellers from './NYTBestsellers.jsx';
import { createTheme } from '@mui/material/styles';
import Register from './Register.jsx';
import Login from './Login.jsx';

const App = () => {
  const [books, setBooks] = useState([{}]);
  const [hasNewBook, setHasNewBook] = useState(false);
  const [hasDeletedBook, setHasDeletedBook] = useState(false);
  const [numNotes, setNumNotes] = useState(0);
  const [hasNewRating, setHasNewRating] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log('rendering App');
  console.log('numNotes:', numNotes);

  const checkExistingSession = () => {
    fetch('/auth/session')
      .then((res) => res.json())
      .then((session) => setIsLoggedIn(session));
  };

  useEffect(checkExistingSession, []);

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
      <div id="account">
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && <Link to="/shelf">Shelf</Link>}
      </div>
      <Header />
      <Search
        setHasNewBook={setHasNewBook}
        hasNewBook={hasNewBook}
        books={books}
      />

      <div id="main">
        <Routes>
          <Route
            path="/register"
            element={
              <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/login"
            element={
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/shelf"
            element={
              <>
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
                <NYTBestsellers
                  hasNewBook={hasNewBook}
                  setHasNewBook={setHasNewBook}
                />
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
