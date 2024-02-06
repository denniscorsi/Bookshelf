import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Dialog, Button } from '@mui/material';

const GptDialog = ({
  handleClose,
  gptOpen,
  searchingGpt,
  newTitle,
  fullRec,
  hasNewBook,
  setHasNewBook,
}) => {
  // adds recommended book to the database (by first doing a fetch to google's api)
  const addBook = (title) => {
    fetch('/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    }).then(() => {
      setHasNewBook(!hasNewBook);
    });
  };

  return (
    <Dialog onClose={handleClose} open={gptOpen}>
      <Box padding={3} textAlign="center">
        <Box display={searchingGpt}>
          <Typography variant="h6" paddingBottom={3}>
            Librarian Brainstorming
          </Typography>
          {/* <Typography variant='h6' paddingBottom={3}>
            Personalized For You!
          </Typography> */}
          <CircularProgress />
        </Box>
        <Box spacing={2} display={searchingGpt === 'none' ? null : 'none'}>
          <Typography variant="h5">We recommend {newTitle}</Typography>
          <Typography paddingY={3}>{fullRec}</Typography>
          <Button variant="contained" onClick={() => addBook(newTitle)}>
            Add {newTitle} to Shelf
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default GptDialog;
