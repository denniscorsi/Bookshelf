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

const Login = ({ setIsLoggedIn }) => {
  const loginSubmit = () => {
    const username = document.getElementById('username-login').value;
    const password = document.getElementById('password-login').value;
    const user = { username, password };

    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.ok) setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Typography paddingLeft={6} paddingBottom={2} variant="h2">
        Login
      </Typography>
      <form>
        <StyledInput
          required
          id="username-login"
          label="username"
          variant="outlined"
          type="username"
        />
        <StyledInput
          required
          id="password-login"
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
          onClick={loginSubmit}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
