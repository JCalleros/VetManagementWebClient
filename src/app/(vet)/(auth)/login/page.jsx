import { LoginForm } from '@/components/forms/auth/'
import { Box, Container, Grid, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';


const LoginPage = () => { 
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(assets/images/backgroundregister.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ color: 'white' }}>
              <Typography variant="h3" gutterBottom>
                Welcome!
              </Typography>
              <Typography variant="body1" paragraph>
                Login to Vet Management System
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default LoginPage;
