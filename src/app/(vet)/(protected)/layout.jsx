import LeftNavbar from "@/components/shared/navbar/LeftNavbar";
import Navbar from "@/components/shared/navbar/Navbar";
import ProtectedRoute from "@/components/shared/ProtectedRoutes";
import { AppBar, Box, Drawer, Toolbar } from "@mui/material";

export const metadata = {
  title: "Dashboard | Vet Management",
  description: "Welcome to the dashboard",
};

export default function layout({ children }) {
  return (
    <Box
      sx={{display: 'flex', height: "100vh", overflow: 'hidden'}}
    > 
      <Navbar />
      <LeftNavbar />
      <Box
        sx={{
          transition: 'margin-left 0.3s',
          mt: '64px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexGrow: 1,
          p: 2,
        }}
      >
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </Box>
        

    </Box>
  );
}
