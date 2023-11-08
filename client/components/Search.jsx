import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const Search = ({ setHasNewBook, hasNewBook }) => {
  const search = () => {
    const title = document.getElementById('searchField').value;
    console.log('Fetching', title);
    fetch('./books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    }).then((res) => {
      console.log('Added book', title);
      setHasNewBook(!hasNewBook);
    });
  };

  return (
    <>
      <Typography>Add Book to Shelf</Typography>
      <TextField id='searchField' label='Book Title' variant='outlined' />
      <Button variant='contained' onClick={search}>
        Search
      </Button>
    </>
  );
};

export default Search;