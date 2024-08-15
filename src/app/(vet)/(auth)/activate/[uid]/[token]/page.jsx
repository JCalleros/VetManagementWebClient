"use client";

import { useActivateUserMutation } from "@/lib/redux/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";


const ActivationPage = ({params}) => {
  const router = useRouter()
  const [activateUser, {isLoading, isSuccess, isError, error}] = useActivateUserMutation();

  useEffect(()=>{
    const {uid, token} = params;
    activateUser({ uid, token });
  }, [activateUser, params]);

  useEffect(()=>{
    if(isSuccess) {
      toast.success("Account activated successfully!.")
    } else if(isError && error){
      toast.error("Failed to activate your account.")
    }
  }, [isSuccess, isError, error, router]);

  return (
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            textAlign: 'center'
          }}
        >
          <Typography variant="h3">
            <Box sx={{
                alignItems: 'center',
              }}
            >
              {isLoading ? (
                <div>
                  <span style={{marginRight: '0.5rem'}}></span>
                  <span>Activating your account....Please wait</span>
                  <span style={{marginLeft: '0.5rem'}}></span>
                </div>
              ): isSuccess ? (
                <div>
                  <span style={{marginRight: '0.5rem'}}></span>
                  <span>Account Activate successfully!</span>
                  <span style={{marginLeft: '0.5rem'}}>✅</span>
                </div>
              ): isError && (
                <div>
                  <span style={{marginRight: '0.5rem'}}></span>
                  <span>Your account has already been activated...</span>
                  <span style={{marginLeft: '0.5rem'}}>❌</span>
                </div>
              )}
            </Box>  
          </Typography>
        </Box>
      </Box>
  )
}

export default ActivationPage;