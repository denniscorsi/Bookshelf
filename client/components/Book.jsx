import React from 'react';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const Book = (props) => {
  const bookActions = () => {
    console.log('book actions');
  };

  const handleClose = () => {
    console.log('closed dialog');
  };

  const handleActionClick = (action) => {
    console.log(action);
  };

  return (
    <Paper elevation={7}>
      <Typography>{props.title}</Typography>
      <Typography>{props.author}</Typography>
      <img src={props.coverImg} />
      <Typography>{props.description}</Typography>
      <Button variant='outlined' onClick={bookActions}>
        Actions
      </Button>
      <Dialog onClose={handleClose} open={true}>
        <DialogTitle>Book Actions</DialogTitle>
        <List>
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleActionClick('favorite');
              }}
            >
              Favorite
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleActionClick('recommend');
              }}
            >
              Find Similar
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleActionClick('remove');
              }}
            >
              Remove
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </Paper>
  );
};

export default Book;
