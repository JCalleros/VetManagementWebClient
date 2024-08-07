"use client"
import { leftNavLinks } from '@/constants'
import { BottomNavigation, BottomNavigationAction, Paper, Link } from '@mui/material'
import React from 'react'

export default function MobileNavbar() {
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
      <BottomNavigation showLabels>
        {leftNavLinks.map(({ path, label, icon }, index)=>(
          <BottomNavigationAction 
            key={index}
            label={label}
            icon={icon}
            component={Link}
            to={path}
          />    
        ))}
        
      </BottomNavigation>
    </Paper>  
  )
}
