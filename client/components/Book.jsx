import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

const Book = (props) => {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [title, setTitle] = useState(null);

  const bookActions = (e) => {
    const selected = e.target.parentElement.firstChild.innerText;
    setTitle(selected);
    setActionsOpen(true);
  };

  const handleClose = () => {
    console.log('closed dialog');
    setActionsOpen(false);
  };

  const handleActionClick = (action) => {
    switch (action) {
      case 'remove':
        fetch('/books', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });
        break;
      case 'favorite':
        break;
      case 'recommend':
        break;
    }
    console.log(action);
    setActionsOpen(false);
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
      <Dialog onClose={handleClose} open={actionsOpen}>
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
