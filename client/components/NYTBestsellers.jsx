import React from 'react';
import { Typography, Dialog, Button, Box } from '@mui/material';
import BestsellersDialog from './BestsellersDialog.jsx';

const NYTBestsellers = () => {
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
        >
          See NYT Bestsellers
        </Button>
      </Box>
      <BestsellersDialog />
    </>
  );
};

export default NYTBestsellers;
