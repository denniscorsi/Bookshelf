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
import CircularProgress from '@mui/material/CircularProgress';

// import Fade from '@mui/material/Fade';

const Book = (props) => {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [gptOpen, setGptOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [newTitle, setNewTitle] = useState('??');
  const [fullRec, setfullRec] = useState(null);
  const [searchingGpt, setSearchingGpt] = useState(null);

  const { setHasDeletedBook, hasDeletedBook } = props;

  // useEffect(() => {
  //   if (fullRec) setSearchingGpt('none');
  // }, [fullRec]);

  const bookActions = (e) => {
    const selected = e.target.parentElement.firstChild.innerText;
    setTitle(selected);
    setActionsOpen(true);
  };

  const handleClose = () => {
    console.log('closed dialog');
    setActionsOpen(false);
    setGptOpen(false);
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
        //display a loading animation screen
        setGptOpen(true);
        fetch('/books/gpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        }).then((recData) => {
          const { title, fullRec } = recData;
          console.log('DATA FROM RESPONSE'); // THESE ARE COMING IN AS UNDEFINED !!START HERE!!
          console.log('Recommended Title:', title);
          console.log('Full Rec:', fullRec);
          //stop loading component
          setSearchingGpt('none'); //THIS IS WORKING
          //display book data in dialog
          setNewTitle(title);
          setfullRec(fullRec);
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
        <Dialog onClose={handleClose} open={gptOpen}>
          <Box padding={3} textAlign='center'>
            <Typography variant='h6'>
              Librarian Brainstorming Recommendation
            </Typography>
            <Typography variant='h6'>Personalized For You!</Typography>
            <Box display={searchingGpt}>
              <CircularProgress />
            </Box>
            <Typography>We recommend {newTitle}</Typography>
            <Typography>{fullRec}</Typography>
          </Box>
        </Dialog>
      </Box>
    </Paper>
  );
};

//Once book rec arrives, have a button that allows you to add it to your bookshelf

export default Book;
