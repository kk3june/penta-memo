import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

function Header() {
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
          Penta Memo
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
