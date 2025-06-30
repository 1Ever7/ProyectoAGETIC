// src/components/AppBar.tsx
'use client';

import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function CustomAppBar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Competencia de Robots Sumo
        </Typography>
      </Toolbar>
    </AppBar>
  );
}