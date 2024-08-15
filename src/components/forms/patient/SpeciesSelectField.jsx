import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApiSlice";
import { TProfileSchema } from "@/lib/validationSchemas";
import { UserSearch } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import Select from "react-select";
import { Box, Typography, FormControl, FormLabel, Grid, InputAdornment, InputLabel } from '@mui/material';

const ClientOnly = dynamic(
  () => Promise.resolve(({ children }) => <>{children}</>),
  { ssr: false },
);


function isSpecies(value){
  return ["dog", "cat"].includes(value);
}

const speciesOptions = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
];


export default function SpeciesSelectField({
  setValue,
  control,
}) {
  const [initialSpecies, setInitialSpecies] = useState("");

  useEffect(() => {
    setInitialSpecies("");
  }, []);

  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "babyPowder", mb: 1 }}>
          Species
        </Typography>  
      </Box>
      <Box sx={{ mt: 1 }}>
        <FormControl fullWidth>
          <ClientOnly>
            <Controller
              control={control}
              name="species"
              defaultValue={initialSpecies} 
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  options={speciesOptions}
                  value={speciesOptions.find(
                    (option) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value)}
                  isSearchable={true}
                  instanceId="species-select"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      minHeight: 56,
                    }),
                  }}
                />
              )}
            />
          </ClientOnly>
        </FormControl>
      </Box>
    </Box>
  );
}