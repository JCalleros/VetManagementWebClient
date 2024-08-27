"use client"
import React from 'react'
import { leftNavLinks } from '@/constants'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


export default function MobileNavbar() {
  const topLinks = leftNavLinks.slice(0, -1);
  const bottomLink = leftNavLinks[leftNavLinks.length - 1];
  const router = useRouter();

  const handleLogout =  () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed: ", error);
    }
  };


  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000
      }}
      elevation={3} 
    >
      <BottomNavigation
       showLabels
      >
        {topLinks.map(({ path, label, icon }, index)=>(
          <BottomNavigationAction 
            key={label}
            component={Link}
            href={path}
            label={label}
            icon={icon}
          />
        ))}
          <BottomNavigationAction 
            key={bottomLink.label}
            label={bottomLink.label}
            icon={bottomLink.icon}
            onClick={handleLogout}
          />
      </BottomNavigation>
    </Paper>  
  )
}
