"use client";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { setAuth, setLogout } from "@/lib/redux/features/auth/authSlice";
import { Box } from "@mui/material";
// import Spinner from "@/components/shared/Spinner";

function ProtectedRoute({children}){
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const handleAuthState = async () => {
      if (typeof document !== "undefined") {
        console.log("All cookies:", document.cookie);
      } else {
        console.log("Document is undefined");
      }
      console.log("Using effect");
      const isLoggedIn = getCookie("logged_in") === "true";
      console.log(`Is logged in cookie: ${isLoggedIn}`)
      if (isLoggedIn){
        console.log("Logged in")
        dispatch(setAuth())
      } else {
        console.log(`Loggind out`)
        dispatch(setLogout())
        router.push("/login")
      }
      setTimeout(() => setIsLoading(false), 500);
    }

    handleAuthState()
  },[dispatch, router])

  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
        Loading..{/* <Spinner size="xl" /> */}
      </Box>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute;