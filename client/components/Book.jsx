import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import ActionsDialog from './ActionsDialog.jsx';
import GptDialog from './GptDialog.jsx';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

// import Fade from '@mui/material/Fade';

const Book = (props) => {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [gptOpen, setGptOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [newTitle, setNewTitle] = useState('??');
  const [fullRec, setfullRec] = useState(null);
  const [searchingGpt, setSearchingGpt] = useState(null);

  const { setHasDeletedBook, hasDeletedBook } = props;

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
      case 'addNote':
        const note = 'added note';
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
        <GptDialog
          handleClose={handleClose}
          gptOpen={gptOpen}
          searchingGpt={searchingGpt}
          newTitle={newTitle}
          fullRec={fullRec}
        />
      </Box>
    </Paper>
  );
};

//Once book rec arrives, have a button that allows you to add it to your bookshelf

export default Book;
