import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { Typography, Dialog } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const NoteDialog = ({ handleClose, handleActionClick, noteOpen }) => {
  let note = '';
  const typing = (e) => {
    console.log('typing');
    note = e.target.value;
  };

  return (
    <Dialog onClose={handleClose} open={noteOpen}>
      <Box paddingX={4} paddingY={4} display='flex' flexDirection='column'>
        <Typography>Add Note</Typography>
        <TextField
          onChange={typing}
          id='newNoteField'
          multiline
          maxRows={4}
          placeholder='type note here'
        />
        <Button onClick={() => handleActionClick('submitNote', note)}>
          Save
        </Button>
      </Box>
    </Dialog>
  );
};

export default NoteDialog;
