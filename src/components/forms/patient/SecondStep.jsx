"use client";
import { Modal, MenuItem, Box, Button, Typography, Select, Stepper, Step, StepLabel, IconButton, Grid, TextField, Divider, InputLabel, FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormFieldComponent } from '../FormFieldComponent';
import { patientOwnerSchema } from '@/lib/validationSchemas';
import SearchCreateOwner from '@/components/shared/search/SearchCreateOwner';

const SecondStep = ({ setIsStepValid  }) => {
  const { control, register, setValue, formState: { errors }, watch } = useFormContext();  
  const selectedOwner = watch("owner");
  
  useEffect(() => {
    setIsStepValid(!!selectedOwner);
  }, [selectedOwner, setIsStepValid]);

return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={{ xs: 2}}>
        <Grid item xs={12}>
          <SearchCreateOwner control={control} />
        </Grid>
      </Grid>
    </Box>
  );
};


export default SecondStep;