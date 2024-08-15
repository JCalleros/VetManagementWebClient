"use client"

import useSidebar from '@/context/hooks/useSidebar';
import { AppBar, Toolbar, Typography } from '@mui/material';

const drawerWidth = "260px"
const miniDrawerWidth = "60px";

export default function Navbar() {
  const { isSidebarOpen } = useSidebar();
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 1,
          width: { xs: '100%', sm: `calc(100% - ${isSidebarOpen ? drawerWidth : miniDrawerWidth})` },
          ml: {  xs: '100%', sm: `calc(100% - ${isSidebarOpen ? drawerWidth : miniDrawerWidth})` },
          height: '65px',
          transition: 'margin-left 0.3s',
          backgroundColor: '#42b983',
        }}
    >
      <Toolbar
        sx={{
          pl: { 
            xs: 2, 
            sm: `${isSidebarOpen ? drawerWidth : miniDrawerWidth}px` 
          },
          transition: 'padding-left 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'flex-start' },
          width: '100%',
        }}
      >
        <Typography
          variant="h6"
          noWrap
          sx={{
            textAlign: { xs: 'center', sm: 'left' },
            width: '100%',
          }}
        >
          Vet Management System
        </Typography>
      </Toolbar>
    </AppBar>
    </>
  )
}
