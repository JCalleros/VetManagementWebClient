"use client";
import { useRouter } from 'next/navigation';
import {
  Grid,
  Paper,
  Box,
  Typography,
  CardMedia,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton
} from "@mui/material";
import { useEffect, useState } from 'react';
import { Ban, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetSingleAppointmentQuery } from '@/lib/redux/features/appointments/appointmentsApiSlice';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import moment from 'moment-timezone';
import { appointmentSchema } from '@/lib/validationSchemas';
import { ArrowBack } from '@mui/icons-material';

const defaultPhoto = '/assets/images/defaultPatientCatPhoto.webp';

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
moment.tz.setDefault(userTimeZone); 

function AppointmentGeneralInfo({ appointment }) {
  
  const formattedDate = moment.utc(appointment.date).format('MMMM D, YYYY h:mm A');

  const localStart = moment.utc(appointment.date).tz(userTimeZone).format('MMMM D, YYYY h:mm A');
  return (
    <Paper sx={{ padding: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>{appointment?.service_type}</Typography>
        <Chip label={appointment?.status} color="primary" />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Date:</Typography>
          <Typography variant="body1">{localStart}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Notes:</Typography>
          <Typography variant="body1">{appointment?.notes || 'No notes added.'}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

function PatientCard({ patient }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', mb: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        sx={{ width: 120, height: 120, objectFit: 'cover' }}
        image={patient.photo || defaultPhoto}
        alt={`Photo of ${patient.name}`}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>{patient.name}</Typography>
        <Typography variant="body1">Species: {patient.species}</Typography>
        <Typography variant="body1">Breed: {patient.breed || 'Unknown'}</Typography>
        <Typography variant="body1">Age: {patient.age_years} years, {patient.age_months} months, {patient.age_weeks} weeks</Typography>
      </CardContent>
    </Card>
  );
}

function AppointmentDetailsContent({ params }) {
  const router = useRouter();
  const slug = params.slug;
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading } = useGetSingleAppointmentQuery(slug);
  const appointment = data?.appointment;
  const { register, reset, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patients: [],
      date: "",
      service_type: "",
      notes: "",
      status: 'scheduled',  
    },
  });

  useEffect(() => {
    if (appointment) {
      reset({
        ...appointment,
      });
    }
  }, [appointment, reset]);

  if (isLoading) return <>Loading...</>;

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3} direction="column">
        <Grid item xs={12}>
          <IconButton onClick={() => router.back()} sx={{ mb: 2 }}>
            <ArrowBack />
          </IconButton>
        </Grid>

        <Grid item container spacing={3}>
          <Grid item xs={12} md={4}>
            <AppointmentGeneralInfo appointment={appointment} />
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ padding: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom>Patients</Typography>
              <Divider sx={{ mb: 2 }} />
              {appointment?.patients.map((patient, index) => (
                <PatientCard key={index} patient={patient} />
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function AppointmentPageDetails({ params }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppointmentDetailsContent params={params} />
    </LocalizationProvider>
  );
}
