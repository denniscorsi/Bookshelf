import React, { useState } from 'react';
import { Typography, Dialog, Button, Box } from '@mui/material';
import BestsellersDialog from './BestsellersDialog.jsx';

const NYTBestsellers = () => {
  const [bestsellersOpen, SetBestsellersOpen] = useState(false);

  const handleClose = () => SetBestsellersOpen(false);

  const handleActionClick = () => {};

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Button
          variant='contained'
          sx={{
            backgroundColor: '#0c869e',
            '&:hover': {
              backgroundColor: 'orange',
              color: 'black',
            },
          }}
          onClick={() => SetBestsellersOpen(true)}
        >
          See NYT Bestsellers
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
