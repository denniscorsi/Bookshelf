import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography, Box, Divider } from '@mui/material';

const BestsellersDialog = ({
  handleClose,
  bestsellersOpen,
  handleActionClick,
}) => {
  //will populate with ListItem componenets for top five bestsellers
  const [bestsellers, setBestsellers] = useState([]);

  //do a fetch request to get the NYT array
  fetch('/books/nyt/hardcover-fiction')
    .then((res) => res.json())
    .then((books) => {
      //console.log(books);
      //just get first five books
      books = books.slice(0, 5);
      console.log('Books:', books);
      const bestsellerBooks = books.map((book) => {
        return (
          <ListItem>
            <ListItemButton
              id={book}
              // onClick={() => {
              //   handleActionClick('addNote');
              // }}
            >
              <Typography variant='h5'>{book}</Typography>
            </ListItemButton>
          </ListItem>
        );
      });
      setBestsellers(bestsellerBooks);
    });

  return (
    <Dialog onClose={handleClose} open={bestsellersOpen}>
      <Box
        sx={{
          border: '10px solid #0c869e',
          backgroundColor: '#DADAD6',
        }}
      >
        <DialogTitle variant='h4'>NYT Bestsellers</DialogTitle>
        <Divider variant='middle' />
        <List>{bestsellers}</List>
      </Box>
    </Dialog>
  );
};

export default BestsellersDialog;
