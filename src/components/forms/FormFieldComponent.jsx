import { Box, TextField, Typography, Container, FormControl, OutlinedInput, InputLabel, Select, MenuItem } from "@mui/material";
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
  link,
  isPassword=false,
  isTextArea=false,
  isSelect=false,
  defaultValue="",
  options=[],
}){
  const errorMessage = errors[name]?.message;


  const renderInputComponent = () => {
    if(isTextArea){
      return (
        <TextField
          {...register(name, {required})}
          fullWidth
          hiddenLabel
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
          hiddenLabel
          type='password'
          placeholder={placeholder}
          disabled={disabled}
        />
      )
    } else if (isSelect){
      return (
        <FormControl fullWidth>
          <Select
            {...register(name, { required })}
            hiddenlabel={"true"}
            defaultValue={defaultValue}
            disabled={disabled}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    } else {
      return (
        <TextField
          {...register(name, {required, setValueAs: v => type === 'number' ? Number(v) : v})}
          fullWidth
          hiddenLabel
          type={type}
          placeholder={placeholder}
          disabled={disabled}
        />
      )
    }
  }

  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h7" sx={{ color: "babyPowder", mb: 1 }}>
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