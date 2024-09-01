import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box, Button, CircularProgress, Grid, TextField, MenuItem, Autocomplete, Card, CardContent, Typography, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { extractErrorMessage } from '@/utils';
import { toast } from 'react-toastify';
import { useCreateAppointmentMutation } from '@/lib/redux/features/appointments/appointmentsApiSlice';
import { appointmentSchema } from '@/lib/validationSchemas';
import { useGetAllOwnersQuery } from '@/lib/redux/features/owners/ownersApiSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/typedHooks';
import PatientModalSelection from '@/components/modals/patients/PatientModalSelection';
import moment from 'moment-timezone';
import SearchCreateOwner from '@/components/shared/search/SearchCreateOwner';
const defaultPhotoCat = '/assets/images/defaultPatientCatPhoto.webp';
const defaultPhotoDog = '/assets/images/defaultPatientCatPhoto.webp';

const services = [
  { id: 1, name: 'Bath' },
  { id: 2, name: 'Vaccine' },
];


export default function CreateAppointmentForm({ onClose, initialDate="" }) {
  const formatedDate = initialDate ? moment.utc(initialDate).format("YYYY-MM-DDTHH:mm") : '';
  
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [openPatientModal, setOpenPatientModal] = useState(false);
  
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    mode: 'all',
    defaultValues: {
      patients: [],
      date: formatedDate,
      service_type: "",
      notes: "",
      status: 'scheduled',  
    },
  });


  const selectedOwner = watch("owner");
  const selectedServiceType = watch("service_type");

  useEffect(() => {
    if (selectedOwner) {
      setValue('patients', selectedPatients.map(p => p.id));
      setSelectedPatients([]);
      setOpenPatientModal(true);
    } else {
      setValue('patients', [])
      setSelectedPatients([]);
    }
  }, [selectedOwner, setValue]);

  const onSubmit = async (values) => {
    try {
      const utcDate = moment(values.date).utc().toISOString();
      values = { ...values, date: utcDate };
      const appointment = await createAppointment({ ...values, patients: selectedPatients.map(p => p.id) }).unwrap();
      toast.success("Appointment has been scheduled");
      onClose(appointment);
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage || "An error occurred");
    }
  };

  const removePatient = (id) => {
    setSelectedPatients(selectedPatients.filter(patient => patient.id !== id));
  };

  const renderSelectedPatients = () => (
    <Grid container spacing={2} sx={{ maxHeight: '150px', overflowY: 'auto' }}>
      {selectedPatients.map((patient) => (
        <Grid item key={patient.id} xs={12}>
          <Card key={patient.id} sx={{ display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
              <img src={patient.photo || defaultPhotoDog} alt={patient.name} style={{ width: 40, height: 40, borderRadius: '50%', marginRight: '8px' }} />
              <Box>
                <Typography variant="body1" noWrap>{patient.name}</Typography>
                <Typography variant="body2" color="textSecondary" noWrap>{patient.breed}</Typography>
              </Box>
              <IconButton onClick={() => removePatient(patient.id)} color="error" sx={{ marginLeft: 'auto' }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const onError = (errors) => {
    const errorMessage = extractErrorMessage(errors);
    toast.error(errorMessage || "An error occurred");
  };

  return (
    <>
      <form
        id="appointment-form"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
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
            <SearchCreateOwner control={control} />
          </Grid>

          {selectedPatients.length > 0 && (
            <Grid item xs={12}>
              {renderSelectedPatients()}
              <Button onClick={() => setSelectedPatients([])} color="secondary">Clear All</Button>
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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white', padding: '8px 0' }}>
          <Button fullWidth type="submit" variant="contained" color="primary"  disabled={isLoading || !selectedOwner || selectedPatients.length === 0 || !selectedServiceType}>
            {isLoading ? <CircularProgress size={24} /> : "Create Appointment"}
          </Button>
        </Box>
      </form>
      <PatientModalSelection
        open={openPatientModal}
        onClose={() => setOpenPatientModal(false)}
        selectedOwner={selectedOwner}
        selectedPatients={selectedPatients}
        setSelectedPatients={setSelectedPatients}
      />
    </>
  );
}
