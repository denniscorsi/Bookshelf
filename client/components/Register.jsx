import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';

//adds styling to textfield
const StyledInput = styled(TextField)({
  '& label.Mui-focused': {
    color: 'orange',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'orange',
    },
  },
});

const registerSubmit = () => {};

const Register = () => {
  return (
    <div>
      <Typography paddingLeft={6} paddingBottom={2} variant="h2">
        Register
      </Typography>
      <form>
        <StyledInput
          required
          id="username-register"
          label="username"
          variant="outlined"
          type="username"
        />
        <StyledInput
          required
          id="email-register"
          label="email"
          variant="outlined"
          type="email"
        />
        <StyledInput
          required
          id="password-register"
          label="password"
          type="password"
          variant="outlined"
        />
        <Button
          sx={{
            backgroundColor: '#0c869e',
            '&:hover': {
              backgroundColor: 'orange',
              color: 'black',
            },
          }}
          variant="contained"
          onClick={registerSubmit}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
