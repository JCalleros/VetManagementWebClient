"use client";

import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { Box, TextField, CircularProgress, Autocomplete, Chip, Select, MenuItem, IconButton, InputAdornment, Card, CardContent, Typography } from "@mui/material";
import { useGetAllOwnersQuery } from "@/lib/redux/features/owners/ownersApiSlice";
import { setSearchTerm } from "@/lib/redux/features/owners/ownerSlice";
import debounce from "lodash.debounce";
import { AddCircle, Clear } from "@mui/icons-material";
import OwnerModalForm from "@/components/modals/owners/OwnerModalForm";


const SearchCreateOwner = ({ control }) => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.owner.searchTerm);
  const { data: owners, isLoading } = useGetAllOwnersQuery({ searchTerm, page: 0});

  const [open, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleSearch = debounce((event) => {
    const term = event.target.value.toLowerCase();
    dispatch(setSearchTerm(term));
  }, 500);

  const handleClearSelection = (field) => {
    field.onChange(null);
  };
  
  if (isLoading) {
    return <>Loading...</>
  }

  const limitedOwners = owners ? owners.owners.results.slice(0, 3) : [];

  return (
    <>
      <Controller
        control={control}
        name="owner"
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={searchTerm ? owners?.owners.results : limitedOwners}
            getOptionLabel={(option) => `${option.name} - ${option.phone_number}`}
            loading={isLoading}
            value={owners?.owners.results.find(owner => owner.id === field.value) || null}
            onChange={(_, newValue) => field.onChange(newValue ? newValue.id : "")}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                  <CardContent sx={{ padding: '8px', '&:last-child': { paddingBottom: '8px' } }}>
                    <Typography variant="h6" sx={{ fontSize: '1rem' }}>{option.name}</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>{option.phone_number}</Typography>
                  </CardContent>
                </Card>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search and Select Owner"
                fullWidth
                variant="outlined"
                onChange={handleSearch}
                InputProps={{
                  ...params.InputProps,
                  style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleModalOpen}>
                        <AddCircle />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end" sx={{ marginRight: '-12px' }}>
                      {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {field.value && (
                        <IconButton onClick={() => handleClearSelection(field)} edge="end" >
                          <Clear />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        )}
      />
      <OwnerModalForm open={open} onClose={handleModalClose} />
    </>
  )
};

export default SearchCreateOwner;
