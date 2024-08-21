import { Box, Typography, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'


export default function NotFound() {
  return(
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: 'linear-gradient(to bottom, #4567b7, #6495ed)',
        }}
      >
      <Box sx={{ maxWidth: 360, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: 36, fontWeight: 'bold', color: 'white' }}>
          Page not found
        </Typography>
        <Typography variant="body1" sx={{ mt: 6, fontSize: 24, color: 'white' }}>
          Sorry, we could not find the page you are looking for.
        </Typography>
        <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center' }}>
          <Button
            component={Link}
            href="/welcome"
            variant="contained"
            sx={{
              backgroundColor: '#6c5ce7',
              '&:hover': {
                backgroundColor: '#32cd32',
              },
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              borderRadius: 24,
              px: 3,
              py: 2,
            }}
          >
            Go back home
          </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
