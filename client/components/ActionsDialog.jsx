import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

//props needed: handleClose, actionsOpen, handleActionClick

const ActionsDialog = ({ handleClose, actionsOpen, handleActionClick }) => {
  return (
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
  );
};

export default ActionsDialog;
