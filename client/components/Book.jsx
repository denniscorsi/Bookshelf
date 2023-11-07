import React from 'react';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const Book = (props) => {
  return (
    <Paper elevation={5}>
      <Typography>{props.title}</Typography>
      <Typography>{props.author}</Typography>
      <img src={props.coverImg} />
      <Typography>{props.description}</Typography>
    </Paper>
  );
};

export default Book;
