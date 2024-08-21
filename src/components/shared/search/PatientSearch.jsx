"use client";
import { setSearchTerm } from "@/lib/redux/features/patients/patientSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Search, X } from "lucide-react";
import debounce from "lodash.debounce";

const PatientSearch = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.patient.searchTerm);  
  
  const handleSearch = debounce((event) => {
    const term = event.target.value.toLowerCase();
    dispatch(setSearchTerm(term));
  }, 500);
  
  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        marginBottom: '0.75rem',
        minHeight: '56px',
        width: '100%',
        flexGrow: 1,
        borderRadius: '9999px',
        bgcolor: 'background.paper',
      }}
    >
      <TextField
        placeholder="Search pets or owner"
        variant="outlined"
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={handleClearSearch} edge="end">
                <X style={{ color: 'rgba(0, 0, 0, 0.54)' }} /> {/* Style icon */}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ flexGrow: 1, mr: 2 }}
      />
    </Box>
  );
};

export default PatientSearch;