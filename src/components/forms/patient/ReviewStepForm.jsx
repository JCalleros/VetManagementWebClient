import { useGetSingleOwnerQuery } from '@/lib/redux/features/owners/ownersApiSlice';
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form';
import FormStepperHeader from '../FormStepperHeader';
import {Box, Divider, Grid, Typography } from '@mui/material';


const OwnerReviewSection = ({name, phone_number, email}) => {
  return (
    <>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Owner Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography variant="body1"><strong>Name:</strong> {name}</Typography>
            <Typography variant="body1"><strong>Phone Number:</strong> {phone_number}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
const AgeReview = ({age_years, age_months, age_weeks}) => {
  return (
    <>
      <Divider sx={{ mt: 2 }} />
      <Typography variant="h6" gutterBottom>
        Age
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1">
        <strong>{age_years}</strong> years <strong>{age_months}</strong> months <strong>{age_weeks}</strong> weeks
      </Typography>
    </>
  )
}

const BasicReviewSection = ({name, gender, species, breed, color, photo=null}) => {
  return(
    <>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Name:</strong> {name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Gender:</strong> {gender}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Species:</strong> {species}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Breed:</strong> {breed}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            <strong>Color:</strong> {color}
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default function ReviewStepForm() {

  const { control } = useFormContext();
  const { name, gender, species, breed, color, age_years, age_months, age_weeks, photo, owner: ownerId } = useWatch({ control });
  const { data, isLoading } = useGetSingleOwnerQuery(ownerId);
  const owner = data?.owner;
  
  if (isLoading) {
    return <>Loading....</>
  }
  
  return (
    <>
      <Grid container spacing={2}>
        <FormStepperHeader title={"Review"} />
        <Grid item xs={12}>
          <BasicReviewSection name={name} gender={gender} species={species} breed={breed} color={color} photo={photo} />
          <AgeReview age_years={age_years} age_months={age_months} age_weeks={age_weeks} />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ mt: 4 }}>
        <OwnerReviewSection name={owner.name} phone_number={owner.phone_number} email={owner.email} />  
      </Grid>
    </>
  )
}
