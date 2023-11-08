import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Search = ({ setHasNewBook, hasNewBook }) => {
  const search = () => {
    const title = document.getElementById('searchField').value;
    console.log('Fetching', title);
    fetch('./books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    }).then((res) => {
      console.log('Added book', title);
      setHasNewBook(!hasNewBook);
    });
  };

  //adds styling to textfield
  const StyledSearch = styled(TextField)({
    '& label.Mui-focused': {
      color: 'orange',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        color: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'orange',
      },
      '& input': {
        '&::placeholder': {
          color: 'white',
        },
      },
    },
  });

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-around'
        alignItems='center'
        paddingY={3}
        width='50%'
        margin='0px auto'
      >
        {/* {<Typography>Add Book to Shelf</Typography>} */}
        <StyledSearch
          sx={{
            input: {
              color: 'orange',
              borderColor: 'White',
              '&::placeholder': { color: 'white' },
            },
          }}
          id='searchField'
          label='Book Title'
          variant='outlined'
        />
        <Button variant='contained' onClick={search}>
          Add to Shelf
        </Button>
      </Box>
    </>
  );
};

export default Search;
