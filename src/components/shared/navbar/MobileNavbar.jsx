"use client"
import React from 'react'
import { leftNavLinks } from '@/constants'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import Link from 'next/link'


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
      <BottomNavigation>
        {leftNavLinks.map(({ path, label, icon }, index)=>(
          <Link key={index} href={path}>
            <BottomNavigationAction 
              key={index}
              label={label}
              icon={icon}
            />
          </Link>
        ))} 
      </BottomNavigation>
    </Paper>  
  )
}
