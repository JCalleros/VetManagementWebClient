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


function isGender(value){
  return ["male", "female"].includes(value);
}

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];


export default function GenderSelectField({
  setValue,
  control,
}) {
  const [initialGender, setInitialGender] = useState("");

  useEffect(() => {
    setValue("gender", option.value);
	}, [setValue]);

  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "babyPowder", mb: 1 }}>
          Gender
        </Typography>  
      </Box>
      <Box sx={{ mt: 1 }}>
        <FormControl fullWidth>
          <ClientOnly>
            <Controller
              control={control}
              name="gender"
              defaultValue={initialGender} 
              render={({ field }) => (
                <Select
                  fullWidth
                  {...field}
                  options={genderOptions}
                  value={genderOptions.find(
                    (option) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value)}
                  isSearchable={false}
                  instanceId="gender-select"
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