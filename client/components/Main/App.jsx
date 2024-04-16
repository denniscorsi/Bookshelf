import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import Search from "./Search.jsx";
import Bookshelf from "./Bookshelf.jsx";
import NYTBestsellers from "./NYTBestsellers.jsx";
import { createTheme } from "@mui/material/styles";
import Register from "../Account/Register.jsx";
import Login from "../Account/Login.jsx";
import BookPage from "../BookPage.jsx";
import { Button, Typography } from "@mui/material";

const App = () => {
  // const [books, setBooks] = useState([{}]);
  const [hasNewBook, setHasNewBook] = useState(false);
  const [hasDeletedBook, setHasDeletedBook] = useState(false);
  const [numNotes, setNumNotes] = useState(0);
  const [hasNewRating, setHasNewRating] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shelfButtons, setShelfButtons] = useState([]);
  const [activeShelf, setActiveShelf] = useState("To Read");

  console.log("rendering App.jsx");

  const checkExistingSession = () => {
    fetch("/auth/session")
      .then((res) => res.json())
      .then((session) => setIsLoggedIn(session));
  };

  const openShelf = (shelfName) => {
    setActiveShelf(shelfName);
    navigate("/shelf");
  };

  const fetchUserShelves = () => {
    fetch("/shelves")
      .then((res) => res.json())
      .then((shelfNames) => {
        const shelfButtonsTemp = shelfNames.map((shelf) => (
          <Link to="/shelf" onClick={() => setActiveShelf(shelf)}>
            <Button>
              <Typography variant="h5">{shelf}</Typography>
            </Button>
          </Link>
        ));
        setShelfButtons(shelfButtonsTemp);
      });
  };

  useEffect(checkExistingSession, []);
  useEffect(fetchUserShelves, []);

  // useEffect(() => {
  //   console.log("Running useEffect");
  //   fetch("/books")
  //     .then((res) => res.json())
  //     .then((bookArr) => {
  //       console.log("Got new books");
  //       console.log(bookArr);
  //       setBooks(bookArr);
  //     })
  //     .catch();
  //   return () => {
  //     console.log("Ran cleanup function");
  //   };
  // }, [hasNewBook, hasDeletedBook, numNotes, hasNewRating]);

  return (
    <BrowserRouter>
      <div id="account">
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && <Link to="/shelf">Shelf</Link>}
      </div>
      <Header />
      <Search setHasNewBook={setHasNewBook} hasNewBook={hasNewBook} />
      {shelfButtons}
      <div id="main">
        <Routes>
          <Route
            path="/register"
            element={<Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/shelf"
            element={
              <>
                <Bookshelf
                  activeShelf={activeShelf}
                  // books={books}
                  setHasNewBook={setHasNewBook}
                  hasNewBook={hasNewBook}
                  setHasDeletedBook={setHasDeletedBook}
                  hasDeletedBook={hasDeletedBook}
                  numNotes={numNotes}
                  setNumNotes={setNumNotes}
                  hasNewRating={hasNewRating}
                  setHasNewRating={setHasNewRating}
                />
                {/* <NYTBestsellers
                  hasNewBook={hasNewBook}
                  setHasNewBook={setHasNewBook}
                /> */}
              </>
            }
          />
          <Route path="/book/:googleId" element={<BookPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
