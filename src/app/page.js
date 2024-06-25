import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

// import Link from "next/link";
// import { ArrowRightIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Home | Vet Management",
  description: "Vet Management Home Page",
};

export default function HomePage() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/assets/images/backgroundhome.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ padding: { xs: 2, md: 4 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="h2" color="primary" gutterBottom>
                Welcome to Vet Management System
              </Typography>
              <Typography variant="h5" color="textSecondary" paragraph>
                Manage your pets and veterinary services with ease.
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Our system provides all the tools you need to keep track of your
                pets' health records, appointments, and treatments. Join us
                today and experience a seamless way to manage your veterinary
                services.
              </Typography>
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 2,
                }}
              >
                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  color="primary"
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  Register
                </Button>
                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  color="primary"
                  sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Optional: You can include an image here if needed */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
