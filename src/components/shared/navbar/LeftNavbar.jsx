"use client"

import { leftNavLinks } from '@/constants';
import { Drawer, Box, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Link, Tooltip } from '@mui/material'
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export default function LeftNavbar() {
  const [open, setOpen] = useState(false);
  
  const handleDrawerToggle = () => {
      setOpen(!open);
  };


  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 60,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            height: '100%',
            backgroundColor: '#35495e',
            color: '#fff',
            borderRight: 'none',
          },
        }}
      >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', backgroundColor: '#35495e' }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: '#fff' }} />
        <List>
          {leftNavLinks.map(({ text, icon, path }, index) => (
            <Tooltip key={index} title={open ? '' : text} placement="right">
              <ListItem component={Link} to={path} disablePadding>
                <ListItemButton sx={{ minHeight: 48 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#FFF' }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: '#FFF' }} />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
    </>
  )
}
