"use client";
import { Modal, MenuItem, Box, Button, Typography, Select, Stepper, Step, StepLabel, IconButton, Grid, TextField, Divider, InputLabel, FormControl, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormFieldComponent } from '../FormFieldComponent';
import { patientOwnerSchema } from '@/lib/validationSchemas';
import SearchCreateOwner from '@/components/shared/search/SearchCreateOwner';
import { useGetSingleOwnerQuery } from '@/lib/redux/features/owners/ownersApiSlice';

const ReviewStep = ({ }) => {
  const { watch } = useFormContext();
  const [ownerData, setOwnerData] = useState(null);
  const formValues = watch();
  const { data: ownerDetails, isLoading: ownerLoading } = useGetSingleOwnerQuery(formValues.owner);

  useEffect(() => {
    if (ownerDetails) {
      setOwnerData(ownerDetails);
    }
  }, [ownerDetails]);
    
  return (
    <Box sx={{ width: "95%", padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
        <Typography variant="h6" component="h3" sx={{ marginBottom: 2 }}>
          Review Patient Information
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Name:
            </Typography>
            <Typography variant="body1">{formValues.name || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="textSecondary">
              Gender:
            </Typography>
            <Typography variant="body1">{formValues.gender || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" color="textSecondary">
              Species:
            </Typography>
            <Typography variant="body1">{formValues.species || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Breed:
            </Typography>
            <Typography variant="body1">{formValues.breed || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="textSecondary">
              Color:
            </Typography>
            <Typography variant="body1">{formValues.color || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Typography variant="subtitle1" color="textSecondary">
              Age (Years):
            </Typography>
            <Typography variant="body1">{formValues.age_years || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Typography variant="subtitle1" color="textSecondary">
              Age (Months):
            </Typography>
            <Typography variant="body1">{formValues.age_months || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Typography variant="subtitle1" color="textSecondary">
              Age (Weeks):
            </Typography>
            <Typography variant="body1">{formValues.age_weeks || 'N/A'}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 3 }} />

        <Typography variant="h6" component="h4" sx={{ marginBottom: 2 }}>
          Owner Information
        </Typography>

        {ownerLoading ? (
          <Typography variant="body1">Loading owner information...</Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Name:
              </Typography>
              <Typography variant="body1">{ownerData?.owner?.name || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Phone Number:
              </Typography>
              <Typography variant="body1">{ownerData?.owner?.phone_number || 'N/A'}</Typography>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default ReviewStep;