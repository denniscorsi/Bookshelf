import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography, Box, Divider, Slide } from "@mui/material";

//TODO: rebuild this (it was copy and pasted and not edited yet).

const AddToShelfDialog = ({ handleClose, open, handleClick }) => {
  const [shelfNames, setShelfNames] = useState([]);

  const getShelves = () => {
    fetch("/shelves")
      .then((res) => res.json())
      .then((shelves) => {
        const shelfButtons = shelves.map((shelf) => (
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleClick("addNote");
              }}
            >
              <Typography variant="h5">{shelf}</Typography>
            </ListItemButton>
          </ListItem>
        ));
        setShelfNames(shelfButtons);
      });
  };

  useEffect(getShelves, []);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box
        sx={{
          border: "10px solid #0c869e",
          backgroundColor: "#DADAD6"
        }}
      >
        <DialogTitle variant="h4">Select Shelf</DialogTitle>
        <Divider variant="middle" />
        <List>{shelfNames}</List>
      </Box>
    </Dialog>
  );
};

export default AddToShelfDialog;
