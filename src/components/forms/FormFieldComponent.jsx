import { Box, TextField, Typography, Container, FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import Link from "next/link";

export function FormFieldComponent({
  label,
  name,
  register,
  disabled=false,
  errors,
  type="text",
  placeholder,
  required=false,
  startIcon,
  endIcon,
  link,
  isPassword=false,
  isTextArea=false,
}){
  const errorMessage = errors[name]?.message;


  const renderInputComponent = () => {
    if(isTextArea){
      return (
        <TextField
          {...register(name, {required})}
          fullWidth
          hiddenLabel
          label={label}
          multiline
          rows={2}
          maxRows={4}
        />
      )
    }else if(isPassword){
      return (
        <TextField
          {...register(name, {required})}
          fullWidth
          label={label}
          type='password'
          placeholder={placeholder}
          startIcon={startIcon}
          endIcon={endIcon}
          disabled={disabled}
        />
      )
    }else {
      return (
        <TextField
          {...register(name, {required})}
          fullWidth
          label={label}
          type={type}
          placeholder={placeholder}
          startIcon={startIcon}
          endIcon={endIcon}
          disabled={disabled}
        />
      )
    }
  }

  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "babyPowder", mb: 1 }}>
          {label}
        </Typography>
        {link && (
          <Link href={link.linkUrl} sx={{ fontWeight: "bold", cursor: "pointer", "&:hover": { color: "indigo.500" }, color: "lime.500" }}>
            {link.linkText}
          </Link>
        )}
      </Box>
      <Box sx={{ mt: 1 }}>
        {renderInputComponent()}
      </Box>
      {errorMessage && (
        <Typography variant="body2" sx={{ mt: 2, color: "red.500" }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  )
}