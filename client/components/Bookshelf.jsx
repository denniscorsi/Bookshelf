import React, { useState } from 'react';
import Book from './Book.jsx';
import Grid from '@mui/material/Grid';

const Bookshelf = ({
  books,
  setHasDeletedBook,
  hasDeletedBook,
  setHasNewBook,
  hasNewBook,
  numNotes,
  setNumNotes,
  hasNewRating,
  setHasNewRating,
}) => {
  return (
    <>
      <Grid container spacing={2} padding={2}>
        {books.map((book) => {
          return (
            <Grid item xs={3}>
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
