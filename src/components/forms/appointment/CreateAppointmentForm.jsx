import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress, Grid, TextField, MenuItem, Autocomplete, Card, CardContent, Typography } from '@mui/material';
import { extractErrorMessage } from '@/utils';
import { toast } from 'react-toastify';
import { useCreateAppointmentMutation } from '@/lib/redux/features/appointments/appointmentsApiSlice';
import { appointmentSchema } from '@/lib/validationSchemas';
import { useGetAllOwnersQuery } from '@/lib/redux/features/owners/ownersApiSlice';
import { useGetAllPatientsQuery } from '@/lib/redux/features/patients/patientsApiSlice';
import debounce from 'lodash.debounce';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/typedHooks';
import { setSearchTerm } from "@/lib/redux/features/owners/ownerSlice";


const services = [
  { id: 1, name: 'Bath' },
  { id: 2, name: 'Vaccine' },
];

export default function CreateAppointmentForm({ onClose }) {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.owner.searchTerm);
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
  const [selectedOwner, setSelectedOwner] = useState(null);
  const { data: owners, isLoading: loadingOwners } = useGetAllOwnersQuery({ searchTerm, page: 1 });
  
  const {
    data: patients,
    refetch: fetchPatientsByOwner,
    isFetching: loadingPatients,
  } = useGetAllPatientsQuery(
    { searchTerm: selectedOwner?.phone_number || selectedOwner?.name || '', page: 1 },
    { skip: !selectedOwner }
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    mode: 'all',
    defaultValues: {
      patients: [],
      date: "",
      service_type: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (selectedOwner) {
      fetchPatientsByOwner();
    }
  }, [selectedOwner, fetchPatientsByOwner]);

  const onSubmit = async (values) => {
    try {
      const appointment = await createAppointment(values).unwrap();
      toast.success("Appointment has been scheduled");
      onClose(appointment);
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage || "An error occurred");
    }
  };

  if (loadingOwners || isLoading) {
    return <CircularProgress />;
  }

  const handleSearchOwner = debounce((event) => {
    dispatch(setSearchTerm(event.target.value));
  }, 500);

  const renderPatientCard = (patient) => (
    <Card key={patient.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img src={patient.photo} alt={patient.name} style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '16px' }} />
        <Box>
          <Typography variant="body1">{patient.name}</Typography>
          <Typography variant="body2" color="textSecondary">{patient.breed}</Typography>
        </Box>
      </CardContent>
    </Card>
  );


  return (
    <form
      id="appointment-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date and Time"
                type="datetime-local"
                fullWidth
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            options={owners?.owners?.results || []}
            getOptionLabel={(owner) => owner.name}
            onInputChange={handleSearchOwner}
            onChange={(_, newValue) => {
              setSelectedOwner(newValue);
              setValue('patients', []);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Owner"
                fullWidth
                variant="outlined"
                required
              />
            )}
          />
        </Grid>

        {selectedOwner && (
          <Grid item xs={12}>
            <Controller
              name="patients"
              control={control}
              render={({ field }) => (
                <>
                  {patients?.results?.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => field.onChange([...field.value, patient])}
                      style={{ cursor: 'pointer' }}
                    >
                      {renderPatientCard(patient)}
                    </div>
                  ))}
                </>
              )}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <Controller
            name="service_type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Service Type"
                fullWidth
                required
                variant="outlined"
                error={!!errors.service_type}
                helperText={errors.service_type?.message}
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.name}>
                    {service.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Notes"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Create Appointment"}
        </Button>
      </Box>
    </form>
  );
}
