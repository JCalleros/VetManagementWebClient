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
      const isLoggedIn = getCookie("logged_in") === "true";
      if (isLoggedIn){
        dispatch(setAuth())
      } else {
        dispatch(setLogout())
        router.push("/login")
      }
      setIsLoading(false);
    }

    handleAuthState()
  },[dispatch, router])

  if (isLoading) {
    return (
      <Box sx={{
        alignContent: 'center',
        paddingTop: '8rem',
      }}>
        Loading..{/* <Spinner size="xl" /> */}
      </Box>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute;