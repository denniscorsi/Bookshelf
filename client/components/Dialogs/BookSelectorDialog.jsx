import React from 'react';
import { useNavigate } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { Typography, Dialog } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const BookSelectorDialog = ({ foundBooks, bookSelectorOpen, handleClose }) => {
  const navigate = useNavigate();

  const selectBook = (index) => {
    const selectedBook = foundBooks[index];
    handleClose();
    saveBook(selectedBook);
    navigate('/book', { state: { googleId: selectedBook.googleId } });
  };

  const saveBook = (book) => {
    console.log('Book sent to saveBook:', book);
    fetch('/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
  };

  return (
    <Dialog open={bookSelectorOpen}>
      <Box
        paddingX={4}
        paddingY={4}
        display="flex"
        flexDirection="column"
        sx={{
          border: '10px solid #0c869e',
          backgroundColor: '#DADAD6',
        }}
      >
        <Typography>Add Book</Typography>
        <div id="firstBook">
          <Typography>The this the book you are looking for?</Typography>
          <Typography>{foundBooks[0]?.title}</Typography>
          <Typography>{foundBooks[0]?.authors}</Typography>
          <img src={foundBooks[0]?.coverImg} />
        </div>
        <Button onClick={() => selectBook(0)}>Yes</Button>
        <Button onClick={handleClose}>No</Button>
        {/* TODO: change this to display grid of more options */}
      </Box>
    </Dialog>
  );
};

export default BookSelectorDialog;
