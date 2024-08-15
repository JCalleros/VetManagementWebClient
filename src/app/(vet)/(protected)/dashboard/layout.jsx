import LeftNavbar from "@/components/shared/navbar/LeftNavbar";
import MobileNavbar from "@/components/shared/navbar/MobileNavbar";
import Navbar from "@/components/shared/navbar/Navbar";
import ProtectedRoute from "@/components/shared/ProtectedRoutes";
import { SidebarProvider } from "@/context/sidebarContext";
import { Box } from "@mui/material";

export const metadata = {
  title: "Dashboard | Vet Management",
  description: "Welcome to the dashboard",
};

export default function layout({ children }) {
  return (
    <ProtectedRoute>
      <Box
        sx={{display: 'flex', height: "100vh", overflow: "hidden" }}
      > 
        <SidebarProvider>
          <Navbar />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <LeftNavbar />
          </Box>
        </SidebarProvider>
        <Box
          sx={{
            transition: 'margin-left 0.3s',
            mt: '64px',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            flexGrow: 1,
            mb: { xs: 10, sm: 3 }, 
            overflowY: 'auto'
          }}
        >
            {children}
          
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <MobileNavbar />
        </Box> 
      </Box>
    </ProtectedRoute>
    
  );
}
