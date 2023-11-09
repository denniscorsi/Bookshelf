import React, { useState } from 'react';
import { Typography, Dialog, Button, Box } from '@mui/material';
import BestsellersDialog from './BestsellersDialog.jsx';

const NYTBestsellers = ({ hasNewBook, setHasNewBook }) => {
  const [bestsellersOpen, SetBestsellersOpen] = useState(false);

  const handleClose = () => SetBestsellersOpen(false);

  const handleActionClick = (book) => {
    fetch('/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: book }),
    }).then(() => {
      setHasNewBook(!hasNewBook);
    });
    SetBestsellersOpen(false);
  };

  return (
    <>
      <Box display='flex' justifyContent='center' padding={3}>
        <Button
          variant='contained'
          sx={{
            padding: '20px',
            backgroundColor: '#0c869e',
            '&:hover': {
              backgroundColor: 'orange',
              color: 'black',
            },
          }}
          onClick={() => SetBestsellersOpen(true)}
        >
          <Typography variant='h6'>See NYT Bestsellers</Typography>
        </Button>
      </Box>
      <BestsellersDialog
        handleClose={handleClose}
        bestsellersOpen={bestsellersOpen}
        handleActionClick={handleActionClick}
      />
    </>
  );
};

export default NYTBestsellers;
