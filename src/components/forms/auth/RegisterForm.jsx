"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { Contact2Icon, MailIcon, UserCheck2 } from "lucide-react"
import { useRegisterUserMutation } from "@/lib/redux/features/auth/authApiSlice"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerUserSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { Box, Button, Typography } from "@mui/material";

export default function RegisterForm() {
  const [registerUser, {isLoading}] = useRegisterUserMutation();
  const router = useRouter();

  const {register, handleSubmit, reset, formState: {errors},} = useForm({
    resolver: zodResolver(registerUserSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      re_password: ""
    }
  })
  
  const onSubmit = async(values)=>{
    try {
      await registerUser(values).unwrap();
      toast.success(
        "An Email with an activation link has been sent to your email address. Please check your email and activate your account."
      )
      router.push("/login");
      reset();
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
        label="Name"
        name="name"
        register={register}
        errors={errors}
        placeholder="John Malillon..."
      />
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
      />
      <FormFieldComponent
        label="Confirm Password"
        name="re_password"
        type="password"
        register={register}
        errors={errors}
        placeholder="Enter your password"
        isPassword={true}
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
