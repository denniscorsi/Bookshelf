import React, { useState } from 'react';
import Book from './Book.jsx';
import Grid from '@mui/material/Grid';

const Bookshelf = ({
  books,
  setHasDeletedBook,
  hasDeletedBook,
  numNotes,
  setNumNotes,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        {books.map((book) => {
          return (
            <Grid item xs={4}>
              <Book
                key={book.title + Math.random()}
                title={book.title}
                author={book.author}
                description={book.description}
                coverImg={book.coverImg}
                note={book.note}
                setHasDeletedBook={setHasDeletedBook}
                hasDeletedBook={hasDeletedBook}
                numNotes={numNotes}
                setNumNotes={setNumNotes}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Bookshelf;
