"use client";

import { setSearchTerm } from "@/lib/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { Box, TextField } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Search } from "lucide-react";

const UsersSearch = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.user.searchTerm);  
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

export default UsersSearch;