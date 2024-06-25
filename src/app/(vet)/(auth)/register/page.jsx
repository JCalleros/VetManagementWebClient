import { AuthFormHeader, RegisterForm } from '@/components/forms/auth/'
import { Box, Container, Grid, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// const RegisterPage = () => {
//   return (
//     <>
//       <Box
//         sx={{
//           height: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Container maxWidth="lg">
//           <AuthFormHeader
//             title="Sign up for an account"
//             staticText="Already have an account?"
//             linkText="Login Here"
//             linkHref="/login"
//           />
        
//           <RegisterForm />
//          </Container>
//       </Box>
//     </>
//   )
// }


const RegisterPage = () => {
  
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
                Register for Vet Management System
              </Typography>
              <Typography variant="body1" paragraph>
                Manage your pets and veterinary services with ease.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <RegisterForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
export default RegisterPage;
