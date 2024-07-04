"use client";

import { setSearchTerm } from "@/lib/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { Box, Input } from "@mui/material";
import Image from "next/image";
import React from "react";


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
      <Image
        src="/assets/icons/search.svg"
        alt="Search"
        width={24}
        height={24}
        className="mx-3"
      />
      <Input 
        placeholder="Search by name, email, or something more"
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        sx={{
          borderStyle: 'none',
          backgroundColor: 'transparent',
          outline: '2px solid transparent',
          outlineOffset: '2px',
        }}
      />
    </Box>
  );
};

export default UsersSearch;