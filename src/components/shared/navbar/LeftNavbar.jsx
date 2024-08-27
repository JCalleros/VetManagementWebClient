"use client"

import { leftNavLinks } from '@/constants';
import useSidebar from '@/context/hooks/useSidebar';
import { Drawer, Box, IconButton, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const drawerWidth = "260px"
export default function LeftNavbar() {
  const router = useRouter();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const topLinks = leftNavLinks.slice(0, -1);
  const bottomLink = leftNavLinks[leftNavLinks.length - 1];


  const handleLogout =  () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? drawerWidth : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isSidebarOpen ? drawerWidth : 60,
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
          <IconButton onClick={toggleSidebar} sx={{ color: '#fff' }}>
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: '#fff' }} />
        <List>
          {topLinks.map(({ path, label, icon }, index) => (
            <Tooltip key={index} title={isSidebarOpen ? '' : label} placement="right">
              <ListItem disablePadding >
                <Link href={path}>
                  <ListItemButton sx={{ minHeight: 48 }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: isSidebarOpen ? 3 : 'auto', justifyContent: 'center', color: '#FFF' }}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={label} sx={{ opacity: isSidebarOpen ? 1 : 0, color: '#FFF' }} />
                  </ListItemButton>
                </Link>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        
        <Divider sx={{ borderColor: '#fff', marginTop: 'auto' }} />

        <List>
          <Tooltip title={isSidebarOpen ? '' : bottomLink.label} placement="right">
            <ListItem disablePadding>
              <ListItemButton sx={{ minHeight: 48 }} onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 0, mr: isSidebarOpen ? 3 : 'auto', justifyContent: 'center', color: '#FFF' }}>
                  {bottomLink.icon}
                </ListItemIcon>
                <ListItemText primary={bottomLink.label} sx={{ opacity: isSidebarOpen ? 1 : 0, color: '#FFF' }} />
              </ListItemButton>
              
            </ListItem>
          </Tooltip>
        </List>
      </Drawer>
    </>
  )
}
