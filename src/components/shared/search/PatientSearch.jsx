"use client";
import { setSearchTerm } from "@/lib/redux/features/patients/patientSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { Box, TextField } from "@mui/material";
import React from "react";
import { Search } from "lucide-react";

const PatientSearch = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.patient.searchTerm);  
  const handleInputChange = (event) => {
    dispatch(setSearchTerm(event.target.value));
  };


  return (
    <Box
      sx={{
        display: 'flex',
        marginBottom: '0.75rem',
        minHeight: '56px',
        width: '100%',
        flexGrow: 1,
        borderRadius: '9999px'
      }}
    >
      <TextField
          placeholder="Search pets or owner"
          variant="outlined"
          value={searchTerm}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <Search color="action" />,
          }}
          sx={{ flexGrow: 1, mr: 2 }}
        />
    </Box>
  );
};

export default PatientSearch;