import React, { useState, useEffect } from "react";
import Book from "../Book.jsx";
import Grid from "@mui/material/Grid";

const Bookshelf = ({
  activeShelf,
  setHasDeletedBook,
  hasDeletedBook,
  setHasNewBook,
  hasNewBook,
  numNotes,
  setNumNotes,
  hasNewRating,
  setHasNewRating
}) => {
  // TODO: I should use a custom hook or useQuery to cache the books on the shelf so if I click back and forth between shelves it doesnt have to refetch books each time
  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log("Attempting to load this shelf:", activeShelf);
    fetch(`/books/shelf/${activeShelf}`)
      .then((res) => res.json())
      .then((bookArr) => {
        console.log("Got new books code:2");
        console.log("Setting books useState to:", bookArr);
        setBooks(bookArr);
      })
      .catch();
    return () => {
      console.log("Ran cleanup function");
    };
  }, [hasNewBook, hasDeletedBook, numNotes, hasNewRating, activeShelf]);

  return (
    <>
      <Grid container spacing={2} padding={2}>
        {books.map((book) => {
          return (
            <Grid item xs={4} key={Math.random()}>
              <Book
                key={book.googleId}
                googleId={book.googleId}
                title={book.title}
                author={book.author}
                description={book.description}
                coverImg={book.coverImg}
                note={book.note}
                rating={book.rating}
                setHasDeletedBook={setHasDeletedBook}
                hasDeletedBook={hasDeletedBook}
                setHasNewBook={setHasNewBook}
                hasNewBook={hasNewBook}
                numNotes={numNotes}
                setNumNotes={setNumNotes}
                hasNewRating={hasNewRating}
                setHasNewRating={setHasNewRating}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Bookshelf;
