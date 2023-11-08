import React from 'react';
import Book from './Book.jsx';
import Grid from '@mui/material/Grid';

const Bookshelf = ({ books, setHasDeletedBook, hasDeletedBook }) => {
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
                setHasDeletedBook={setHasDeletedBook}
                hasDeletedBook={hasDeletedBook}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Bookshelf;
