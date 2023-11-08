import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Dialog } from '@mui/material';

//props needed: handleClose, gptOpen, searchingGpt, newTitle, fullRec

const GptDialog = ({
  handleClose,
  gptOpen,
  searchingGpt,
  newTitle,
  fullRec,
}) => {
  return (
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
  );
};

export default GptDialog;
