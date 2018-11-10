import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

const Header = () => (
    <AppBar position="static">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
      >
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
      >
        Three.js - PGS
      </Typography>
    </Toolbar>
  </AppBar>
);

export { Header };