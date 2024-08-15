"use client";
import { useGetAllPatientsQuery } from "@/lib/redux/features/patients/patientsApiSlice"
import { Autocomplete, TextField, Chip, CircularProgress, Box, Button, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { setSearchTerm } from "@/lib/redux/features/patients/patientSlice";

export default function PatientSelect({ control, setValue, watch, errors, onCreateNewPatient }) {
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state) => state.patient.searchTerm);
    const page = useAppSelector((state) => state.patient.page);
    const { data: patients, isLoading } = useGetAllPatientsQuery({ searchTerm, page });


    const [selectedPatients, setSelectedPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
  
  
    const handleSearch = debounce((event) => {
      const term = event.target.value.toLowerCase();
      dispatch(setSearchTerm(term));
    }, 500);
      

    useEffect(() => {
      if (patients && selectedPatients.length > 0) {
        const ownerID = selectedPatients[0].owner.id;
        const filtered = patients.patients.results.filter(
          (patient) => patient.owner.id === ownerID && !selectedPatients.some((p) => p.id === patient.id)
        );
        setFilteredPatients(filtered);
      } else if (patients) {
        setFilteredPatients(patients.patients.results);
      }
  }, [selectedPatients, patients]);


    const handleSelect = (event, value) => {
      setSelectedPatients(value);
      setValue("patients", value.map((patient) => patient.id));
    };
  
    const handleClearInput = (event) => {
      if (event.target.value === "") {
        dispatch(setSearchTerm(""));
        setFilteredPatients([]);
      }
    };

    const handleRemovePatient = (patient) => {
      const updatedPatients = selectedPatients.filter((p) => p.id !== patient.id);
      setSelectedPatients(updatedPatients);
      setValue("patients", updatedPatients.map((p) => p.id));
    };
  
    const limitedPatients = filteredPatients.slice(0, 5);

    if (isLoading) return <CircularProgress />;
    return (
      <Autocomplete
        multiple
        id="patients"
        value={selectedPatients}
        onChange={handleSelect}
        options={limitedPatients}
        getOptionLabel={(option) => option.name}
        filterOptions={(options) => options}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search patients"
            variant="outlined"
            onChange={(event) => {
              handleSearch(event);
              handleClearInput(event);
            }}
            error={!!errors.patients}
            helperText={errors.patients?.message}
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((patient, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={patient.id}
                label={patient.name}
                onDelete={() => handleRemovePatient(patient)}
                {...tagProps}
              />
            );
          })
        }
      />
    )
    // return (
    //   <Box>
    //     <Controller
    //       name="patients"
    //       control={control}
    //       render={({ field }) => (
    //         <Autocomplete
    //           multiple
    //           id="patients"
    //           value={selectedPatients}
    //           onChange={handleSelect}
    //           options={filteredPatients}
    //           getOptionLabel={(option) => option.name}
    //           filterOptions={(options) => options}
    //           renderInput={(params) => (
    //             <TextField
    //               {...params}
    //               label="Search patients"
    //               variant="outlined"
    //               onChange={handleSearch}
    //               value={search}
    //               InputProps={{
    //                 ...params.InputProps,
    //                 endAdornment: (
    //                   <Stack direction="row" spacing={1}>
    //                     {selectedPatients.map((patient) => (
    //                       <Chip
    //                         key={patient.id}
    //                         label={patient.name}
    //                         onDelete={() => handleRemovePatient(patient)}
    //                       />
    //                     ))}
    //                   </Stack>
    //                 ),
    //               }}
    //             />
    //           )}
    //         />
    //       )}
    //     />
    //     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
    //       <Button variant="outlined" color="primary" onClick={onCreateNewPatient}>
    //         Create New Patient
    //       </Button>
    //     </Box>
    //   </Box>
    // );
  }