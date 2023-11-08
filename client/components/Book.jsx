import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from '@mui/system';
// import Fade from '@mui/material/Fade';

const Book = (props) => {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [title, setTitle] = useState(null);

  const { setHasDeletedBook, hasDeletedBook } = props;

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
        }).then(() => {
          setHasDeletedBook(!hasDeletedBook);
        });
        break;
      case 'favorite':
        break;
      case 'recommend':
        //display a loading animation
        fetch('/books/gpt').then((recData) => {
          const { title, fullRec } = recData;
          //display book data in dialog
          //do a get request to load that book to the page
        });
        break;
    }
    console.log(action);
    setActionsOpen(false);
  };

  return (
    <Paper elevation={10}>
      <Box
        padding={1}
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{
          bgcolor: '#e9c6ad',
        }}
      >
        <Typography variant='h6'>{props.title}</Typography>
        <Typography fontStyle='italic'>{props.author}</Typography>
        <img src={props.coverImg} />
        <Typography variant='body2'>{props.description}</Typography>
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
      </Box>
    </Paper>
  );
};

export default Book;
