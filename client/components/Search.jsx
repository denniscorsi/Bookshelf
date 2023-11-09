import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import GptDialog from './GptDialog.jsx';

const Search = ({ setHasNewBook, hasNewBook, books }) => {
  const [searchGptOpen, setSearchGptOpen] = useState(false);
  const [searchingGptGen, setSearchingGptGen] = useState(null);
  const [title, setTitle] = useState(null);
  const [newTitle, setNewTitle] = useState('??');
  const [fullRec, setfullRec] = useState(null);

  // Fetch request for book typed into search field
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

  const handleClose = () => {
    console.log('closed dialog');
    setSearchGptOpen(false);
  };

  //get all books with a rating of 5, then open gptdialog, and initiate request to server
  const gatherFavs = () => {
    const favBooks = [];
    books.forEach((book) => {
      if (book.rating === 5) {
        favBooks.push(book.title);
      }
    });
    console.log(favBooks);
    setSearchGptOpen(true);
    fetch('/books/gpt/general', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favBooks }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data); //made it to here, but recommendation doesn't show up. loading circle keeps spinning
        setNewTitle(data.title);
        setfullRec(data.fullRec);
        setSearchingGptGen('none');
      });
  };

  //adds styling to textfield
  const StyledSearch = styled(TextField)({
    '& label.Mui-focused': {
      color: 'orange',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'orange',
      },
    },
  });

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-around'
        alignItems='center'
        paddingY={3}
        width='40%'
        margin='0px auto'
      >
        {/* {<Typography>Add Book to Shelf</Typography>} */}
        <StyledSearch
          sx={{
            color: 'white',
            input: {
              color: 'orange',
              borderColor: 'White',
            },
          }}
          id='searchField'
          label='Book Title'
          variant='outlined'
          InputLabelProps={{
            sx: {
              color: 'gray',
            },
          }}
        />
        <Button
          sx={{
            backgroundColor: '#0c869e',
            '&:hover': {
              backgroundColor: 'orange',
              color: 'black',
            },
          }}
          variant='contained'
          onClick={search}
        >
          Add to Shelf
        </Button>
        <Button
          sx={{
            color: 'orange',
          }}
          onClick={gatherFavs}
        >
          Ask the Librarian
        </Button>
      </Box>
      <GptDialog
        handleClose={handleClose}
        gptOpen={searchGptOpen}
        searchingGpt={searchingGptGen}
        newTitle={newTitle}
        fullRec={fullRec}
        hasNewBook={hasNewBook}
        setHasNewBook={setHasNewBook}
      />
    </>
  );
};

export default Search;
