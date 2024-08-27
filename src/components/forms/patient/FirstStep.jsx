"use client";
import { Modal, MenuItem, Box, Button, Typography, Select, Stepper, Step, StepLabel, IconButton, Grid, TextField, Divider, InputLabel, FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormFieldComponent } from '../FormFieldComponent';
import { patientGeneralSchema } from '@/lib/validationSchemas';

const FirstStep = ({ setIsStepValid  }) => {
    const { register, setValue, formState: { errors }, watch } = useFormContext();
    
    const genderOptions = [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ];
  
    const speciesOptions = [
      { value: "dog", label: "Dog" },
      { value: "cat", label: "Cat" },
    ];
  
    const watchedValues = watch();
  
    useEffect(() => {
      const result = patientGeneralSchema.safeParse(watchedValues);
      setIsStepValid(result.success);
    }, [watchedValues])

    return (
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} sm={6}>
            <FormFieldComponent 
              label="Name"
              name="name"
              required={true}
              register={register}
              errors={errors}
              placeholder="Max..."
            />  
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormFieldComponent
              label="Gender"
              name="gender"
              required={true}
              register={register}
              errors={errors}
              isSelect={true}
              defaultValue={genderOptions[0].value}
              options={genderOptions}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormFieldComponent
              label="Species"
              name="species"
              required={true}
              register={register}
              errors={errors}
              isSelect={true}
              defaultValue={speciesOptions[0].value}
              options={speciesOptions}
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormFieldComponent
              label="Breed"
              name="breed"
              register={register}
              errors={errors}
              placeholder="Golden Retriever..."
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormFieldComponent
              label="Color"
              name="color"
              register={register}
              errors={errors}
              placeholder="Gold..."
            />
          </Grid>
          <Grid item xs={4}>
            <FormFieldComponent
              label="Years"
              name="age_years"
              type="number"
              register={register}
              errors={errors}
              placeholder="1..."
            />
          </Grid>
          <Grid item xs={4}>
            <FormFieldComponent
              label="Months"
              name="age_months"
              register={register}
              type="number"
              errors={errors}
              placeholder="4..."
            />
          </Grid>
          <Grid item xs={4}>
            <FormFieldComponent
              label="Weeks"
              name="age_weeks"
              register={register}
              type="number"
              errors={errors}
              placeholder="3..."
            />
          </Grid>
        </Grid>
      </Box>
    );
  };


  export default FirstStep;