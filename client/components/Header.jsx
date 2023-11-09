import React from 'react';
import { Typography, Box } from '@mui/material';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';

const Header = () => (
  <Box display='flex' justifyContent='center' alignItems='center'>
    <AutoStoriesRoundedIcon
      sx={{
        fontSize: '100px',
        color: 'orange',
      }}
    />
    <Typography
      paddingX={6}
      paddingBottom={2}
      variant='h1'
      sx={{
        fontWeight: '700',
      }}
    >
      Bookshelf
    </Typography>
  </Box>
);
export default Header;
