import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Typography, Rating } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import ActionsDialog from './ActionsDialog.jsx';
import GptDialog from './GptDialog.jsx';
import NoteDialog from './NoteDialog.jsx';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Book = (props) => {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [gptOpen, setGptOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [newTitle, setNewTitle] = useState('??');
  const [fullRec, setfullRec] = useState(null);
  const [searchingGpt, setSearchingGpt] = useState(null);

  const { setHasDeletedBook, hasDeletedBook, setHasNewBook, hasNewBook } =
    props;

  // when the actions menu is opened, this stores the title of the connect book into title and opens the actions dialog
  const bookActions = (e) => {
    const selected = e.target.parentElement.firstChild.innerText;
    setTitle(selected);
    setActionsOpen(true);
  };

  //closes any opened dialog boxes
  const handleClose = () => {
    console.log('closed dialog');
    setActionsOpen(false);
    setGptOpen(false);
    setNoteOpen(false);
  };

  // Executes an action based on the button clicked in the action menu
  const handleActionClick = (action, note) => {
    switch (action) {
      case 'addNote':
        setNoteOpen(true);
        break;
      case 'submitNote':
        //send post request to server on books/notes route
        //body will have title of book and the note
        fetch('/books/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, note }),
        }).then(() => {
          console.log('done');
          setNoteOpen(false);
          props.setNumNotes(props.numNotes);
        });
        break;
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
        })
          .then((response) => {
            console.log('recieved response:', response);
            return response.json();
          })
          .then((recData) => {
            console.log('recData post-parse: ', recData);
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
      case 'amazon':
        let titleCleaned = title.replaceAll(' ', '+');
        const url = ' https://www.amazon.com/s?k=' + titleCleaned;
        window.open(url, '_blank');
        break;
    }
    console.log(action);
    setActionsOpen(false);
  };

  //will update rating for book in database
  const setRating = (event, rating) => {
    console.log(event.target);
    const title = event.target.parentElement.parentElement.firstChild.innerText;
    console.log(title, rating);
    fetch('/books/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, rating }),
    });
  };

  //creates custom syling for rating component
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: 'rgb(12, 134, 158)',
    },
  });

  return (
    <Paper elevation={10}>
      <Box
        padding={1}
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{
          bgcolor: '#e9c6ad',
          '&:hover': {
            backgroundColor: '#f9f9f9',
          },
        }}
      >
        <Typography variant='h6'>{props.title}</Typography>
        <Typography fontStyle='italic'>{props.author}</Typography>
        <img src={props.coverImg} />
        <StyledRating
          icon={<MenuBookIcon />}
          value={props.rating}
          onChange={(event, newRating) => {
            setRating(event, newRating);
          }}
        />
        <Tooltip
          title={
            <>
              <Typography variant='subtitle2'>Notes:</Typography>
              <Typography variant='caption'>{props.note}</Typography>
            </>
          }
        >
          <NotesRoundedIcon />
        </Tooltip>
        <Typography variant='body2'>{props.description}</Typography>
        <Button variant='outlined' onClick={bookActions}>
          Actions
        </Button>
        <ActionsDialog
          handleClose={handleClose}
          actionsOpen={actionsOpen}
          handleActionClick={handleActionClick}
        />
        <NoteDialog
          noteOpen={noteOpen}
          handleClose={handleClose}
          handleActionClick={handleActionClick}
        />
        <GptDialog
          handleClose={handleClose}
          gptOpen={gptOpen}
          searchingGpt={searchingGpt}
          newTitle={newTitle}
          fullRec={fullRec}
          hasNewBook={hasNewBook}
          setHasNewBook={setHasNewBook}
        />
      </Box>
    </Paper>
  );
};

export default Book;
