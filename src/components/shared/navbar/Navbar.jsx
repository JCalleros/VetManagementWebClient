"use client"

import { AppBar, Toolbar, Drawer } from '@mui/material'
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: `calc(100% - ${open ? drawerWidth : 60}px)`,
          ml: `${open ? drawerWidth : 60}px`,
          transition: 'width 0.3s, margin-left 0.3s',
          backgroundColor: '#42b983',
        }}
      >
        <Toolbar variant="h6" component="div">
            Vet Management System
        </Toolbar>
      </AppBar>
      
    </>
    
  )
}
