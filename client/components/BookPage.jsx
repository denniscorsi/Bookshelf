import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Padding } from "@mui/icons-material";
import AddToShelfDialog from "./Dialogs/AddToShelfDialog.jsx";

const BookPage = () => {
  const { googleId } = useParams();

  const [bookData, bookDataSetter] = useState({
    title: "",
    author: "",
    description: "",
    coverImg: ""
  });

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleClose = () => setAddDialogOpen(false);
  const handleOpen = () => setAddDialogOpen(true);

  useEffect(() => {
    fetch(`/books/${googleId}`)
      .then((res) => res.json())
      .then((book) => {
        console.log("fetched Book Data:", book);
        bookDataSetter(book);
      });
  }, []);

  // TODO: Add buttons for adding to shelf

  return (
    <>
      <Box sx={{ bgcolor: "#e9c6ad" }} padding={3} marginX={2} marginBottom={2}>
        <h1>{bookData.title}</h1>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={bookData.coverImg} style={{ flex: 1 }} />
          <div style={{ flex: 3, margin: "25px" }}>
            <h3>By {bookData.author}</h3>
            <p>{bookData.description}</p>
          </div>
        </Box>
        <div id="book-buttons">
          <Button onClick={handleOpen}>Add to Shelf</Button>
        </div>
      </Box>
      <AddToShelfDialog
        handleClose={handleClose}
        open={addDialogOpen}
        handleClick={console.log}
      />
    </>
  );
};

export default BookPage;
