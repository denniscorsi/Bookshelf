import React, { useState } from "react";
import Book from "../Book.jsx";
import Grid from "@mui/material/Grid";

const Bookshelf = ({
  activeShelf,
  books,
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
  const [books, setBooks] = useEffect([]);

  useEffect(() => {
    fetch(`/books/${activeShelf}`)
      .then((res) => res.json())
      .then((bookArr) => {
        console.log("Got new books");
        console.log(bookArr);
        setBooks(bookArr);
      })
      .catch();
    return () => {
      console.log("Ran cleanup function");
    };
  }, [hasNewBook, hasDeletedBook, numNotes, hasNewRating]);

  return (
    <>
      <Grid container spacing={2} padding={2}>
        {books.map((book) => {
          return (
            <Grid item xs={4} key={Math.random()}>
              <Book
                key={book.title + Math.random()}
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
