import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Typography, Box, Divider, Slide } from '@mui/material';

const ActionsDialog = ({ handleClose, actionsOpen, handleActionClick }) => {
  return (
    <Dialog onClose={handleClose} open={actionsOpen}>
      <Box
        sx={{
          border: '10px solid #0c869e',
          backgroundColor: '#DADAD6',
        }}
      >
        <DialogTitle variant='h4'>Book Actions</DialogTitle>
        <Divider variant='middle' />
        <List>
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleActionClick('addNote');
              }}
            >
              <Typography variant='h5'>Add Note</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleActionClick('recommend')}>
              <Typography variant='h5'>Find Similar</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleActionClick('remove')}>
              <Typography variant='h5'>Remove</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => handleActionClick('amazon')}>
              <ShoppingCartIcon fontSize='large'></ShoppingCartIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Dialog>
  );
};

export default ActionsDialog;
