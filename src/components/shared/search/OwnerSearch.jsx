import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { Box, TextField, CircularProgress, Autocomplete, Chip } from "@mui/material";
import { useGetAllOwnersQuery } from "@/lib/redux/features/owners/ownersApiSlice";
import { setSearchTerm } from "@/lib/redux/features/owners/ownerSlice";
import debounce from "lodash.debounce";

const OwnerSearch = ({ control, setSelectedOwner }) => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.owner.searchTerm);
  const { data: owners, isLoading } = useGetAllOwnersQuery({ searchTerm, page: 0 });

  const handleSearch = debounce((event) => {
    const term = event.target.value.toLowerCase();
    dispatch(setSearchTerm(term));
  }, 500);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Controller
      name="owner"
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={owners.owners.results}
          getOptionLabel={(owner) => owner.name}
          onChange={(_, newValue) => {
            field.onChange(newValue);
            setSelectedOwner(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search and Select Owner"
              fullWidth
              variant="outlined"
              onChange={handleSearch}
            />
          )}
        />
      )}
    />
  );
};

export default OwnerSearch;
