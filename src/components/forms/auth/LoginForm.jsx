"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { Box, Button, Typography } from "@mui/material";
import { useLoginUserMutation } from "@/lib/redux/features/auth/authApiSlice";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { setAuth } from "@/lib/redux/features/auth/authSlice";
import { loginUserSchema } from "@/lib/validationSchemas/LoginSchema";

export default function RegisterForm() {
  const [loginUser, {isLoading}] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {register, handleSubmit, reset, formState: {errors},} = useForm({
    resolver: zodResolver(loginUserSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    }
  })


  const onSubmit = async(values)=>{
    try {
      await loginUser(values).unwrap();
      dispatch(setAuth())
      toast.success("Login Successful")
      router.push("/dashboard")
      reset()
    }catch(e){
      const errorMessage = extractErrorMessage(e)
      toast.error(errorMessage || "An error occurred")
    }
  }
  
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '2rem',
        borderRadius: '24px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
   
    <Box sx={{
      borderRadius: '16px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      
    }}>
      <FormFieldComponent
        label="Email Address"
        name="email"
        type="email"
        register={register}
        errors={errors}
        placeholder="Enter your email"
      />
      <FormFieldComponent
        label="Password"
        name="password"
        type="password"
        register={register}
        errors={errors}
        placeholder="Enter your password"
        isPassword={true}
        link={{linkText: "Forgot Password?", linkUrl: "/forgot-password" }}
      />
    </Box>
    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="large"
      fullWidth
      sx={{ mt: 2 }}
    >
      {isLoading ? "Loading..." : "Submit"}
    </Button>
  </form>
  )
}
