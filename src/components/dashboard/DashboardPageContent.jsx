"use client";
import { useRouter } from 'next/navigation';
import { useGetSinglePatientQuery, useUpdatePatientMutation } from "@/lib/redux/features/patients/patientsApiSlice";
import { Grid, Paper, Box, Typography, CardMedia, Button, TextField, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { useEffect, useState } from 'react';
import { Ban, Pencil } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { patientCompletSchema } from '@/lib/validationSchemas';
import { useTheme } from '@emotion/react';
import { motion } from 'framer-motion';

const defaultPhoto = '/assets/images/defaultPatientCatPhoto.webp';


function PatientGeneralInfo({ patient, isEditing, register }) {
  return (
    <Paper sx={{ padding: 2, marginBottom: 3, flex: 3 }}>
      <Typography variant="h4" gutterBottom>{patient?.name}</Typography>
      <CardMedia
        component="img"
        height="250"
        image={patient?.photo || defaultPhoto}
        alt={`${patient?.name}'s photo`}
        sx={{ objectFit: 'contain', marginBottom: 2, borderRadius: 1 }}
      />
      <Box sx={{ display: 'flex', paddingTop: 2, flexDirection: 'column', gap: 2 }}>
        {isEditing ? (
          <>
            <TextField {...register('species')} label="Species" defaultValue={patient?.species} />
            <TextField {...register('breed')} label="Breed" defaultValue={patient?.breed} />
            <TextField {...register('gender')} label="Gender" defaultValue={patient?.gender} />
            <TextField {...register('age_years')} label="Age (Years)" defaultValue={patient?.age_years} />
            <TextField {...register('age_months')} label="Age (Months)" defaultValue={patient?.age_months} />
            <TextField {...register('age_weeks')} label="Age (Weeks)" defaultValue={patient?.age_weeks} />
          </>
        ) : (
          <>
            <Typography variant="body1"><strong>Species:</strong> {patient?.species}</Typography>
            <Typography variant="body1"><strong>Breed:</strong> {patient?.breed}</Typography>
            <Typography variant="body1"><strong>Gender:</strong> {patient?.gender}</Typography>
            <Typography variant="body1"><strong>Age:</strong> {patient?.age_years} years, {patient?.age_months} months, {patient?.age_weeks} weeks</Typography>
          </>
        )}
      </Box>
    </Paper>
  );
}

function PatientOwnerInfo({ owner }) {
  return (
    <Paper sx={{ padding: 2, flex: 1 }}>
      <Typography variant="h6" gutterBottom>Owner Information</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body1"><strong>Name:</strong> {owner.name}</Typography>
        <Typography variant="body1"><strong>Phone Number:</strong> {owner.phone_number}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {owner.email}</Typography>
      </Box>
    </Paper>
  );
}

function PatientHealthInfo({ params }){
  
  const data = [
    { date: '2023-01-01', condition: 'Allergies', details: 'Allergic to certain types of food.' },
    { date: '2022-12-01', condition: 'Surgery', details: 'Neutering surgery performed successfully.' },
    { date: '2022-11-15', condition: 'Ear Infection', details: 'Treated with antibiotics.' },
    { date: '2022-10-05', condition: 'Skin Rash', details: 'Treated with topical ointments.' },
    { date: '2022-09-10', condition: 'Dental Disease', details: 'Severe plaque buildup, required dental cleaning.' },
    { date: '2022-08-20', condition: 'Fracture', details: 'Fractured leg, required cast for 4 weeks.' },
    { date: '2022-07-25', condition: 'Obesity', details: 'Recommended diet and exercise plan.' },
    { date: '2022-06-18', condition: 'Parvovirus', details: 'Recovered after intensive care.' },
  ];

  return (
    <Paper sx={{ padding: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom>Health History</Typography>
      <Box sx={{ height: 300, overflowY: 'auto', paddingRight: 2, flexGrow: 1 }}>
        {data.map((entry, index) => (
          <Box key={index} sx={{ marginBottom: 2, paddingBottom: 2, borderBottom: '1px solid #ddd' }}>
            <Typography variant="body2"><strong>Date:</strong> {entry.date}</Typography>
            <Typography variant="body2"><strong>Condition:</strong> {entry.condition}</Typography>
            <Typography variant="body2"><strong>Details:</strong> {entry.details}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}


function PatientServicesInfo({services}){
  const data = [
    { date: '2023-01-01', name: 'Vaccination', notes: 'Annual rabies vaccination.' },
    { date: '2022-12-01', name: 'Checkup', notes: 'Regular health checkup.' },
    { date: '2022-11-15', name: 'Dental Cleaning', notes: 'Routine dental cleaning.' },
    { date: '2022-10-05', name: 'Surgery', notes: 'Spaying surgery.' },
    { date: '2022-09-10', name: 'Deworming', notes: 'Monthly deworming.' },
    { date: '2022-08-20', name: 'Grooming', notes: 'Full grooming session.' },
    { date: '2022-07-25', name: 'Checkup', notes: 'Follow-up checkup for previous surgery.' },
    { date: '2022-06-18', name: 'Vaccination', notes: 'Booster shot for parvovirus.' },
  ];

  return(
    <Paper sx={{ padding: 2, flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Typography variant="h5" gutterBottom>Attendance History</Typography>
      <Box sx={{ height: 300, overflowY: 'auto', paddingRight: 2, flexGrow: 1 }}>
        {data.map((service, index) => (
          <Box key={index} sx={{ marginBottom: 2, paddingBottom: 2, borderBottom: '1px solid #ddd' }}>
            <Typography variant="body2"><strong>Date:</strong> {service.date}</Typography>
            <Typography variant="body2"><strong>Service:</strong> {service.name}</Typography>
            <Typography variant="body2"><strong>Notes:</strong> {service.notes}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  )
}


function PatientDetailsContent({ params }) {
  const router = useRouter();
  const slug = params.slug;
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading } = useGetSinglePatientQuery(slug);
  const patient = data?.patient;
  const [updatePatient, { isLoading: updateLoading }] = useUpdatePatientMutation();
  const { register, reset, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(patientCompletSchema),
    defaultValues: patient,
  });
  
  useEffect(() => {
    if (patient) {
      reset({
        ...patient,
      });
    }
  }, [patient, reset]);

  const onSubmit = async (formValues) => {
    try {
      await updatePatient({ slug, ...formValues }).unwrap();
      toast.success("Patient updated successfully");
      router.push(`/patients/${slug}`);
    } catch (error) {
      toast.error(error.data?.message || "Failed to update patient");
    }
  };

  if( isLoading ) return <>Loading...</>

  return (
    <Box sx={{ flexGrow: 1, p: 3, maxHeight: '100%' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={() => router.back()} sx={{ width: 'fit-content' }}>
            Back
          </Button>
          {isEditing ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                disabled={updateLoading}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setIsEditing(false)}
              >
                <Ban /> Cancel
              </Button>
            </Box>
          ) : (
            <Button variant="outlined" onClick={() => setIsEditing(true)} sx={{ width: 'fit-content' }}>
              <Pencil /> Edit
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <PatientGeneralInfo patient={patient} isEditing={isEditing} register={register} />
          <PatientOwnerInfo owner={patient?.owner} />
        </Grid>
      
        <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <PatientServicesInfo />
          <PatientHealthInfo />
        </Grid>
      </Grid>
    </Box>
  );
}

export default function DashboardPageContent({ params }) {
    const router = useRouter();
    const theme = useTheme();
  
    const appointments = [
      { time: '10:00 AM', patient: 'Fluffy', owner: 'John Doe' },
      { time: '11:30 AM', patient: 'Max', owner: 'Jane Smith' },
      { time: '1:00 PM', patient: 'Bella', owner: 'Michael Brown' },
    ];
  
    const stats = [
      { title: 'Total Patients', value: 120 },
      { title: 'Appointments Today', value: 5 },
      { title: 'Pending Invoices', value: 8 },
    ];
  
    return (
      <Box sx={{ flexGrow: 1, p: 3, maxHeight: '100%' }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={() => router.back()} sx={{ width: 'fit-content' }}>
              Back
            </Button>
            <Typography variant="h4">Dashboard</Typography>
          </Grid>
          
          {/* Stats Section */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card 
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    sx={{ height: '100%' }}
                  >
                    <CardContent>
                      <Typography variant="h6" color="textSecondary" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4">
                        {stat.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
  
          {/* Appointments Section */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Upcoming Appointments"
                sx={{ backgroundColor: '#1976d2', color: '#fff' }}
              />
              <CardContent>
                {appointments.map((appointment, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: 2, 
                      borderBottom: '1px solid #ddd',
                      '&:last-child': { borderBottom: 'none' }
                    }}
                  >
                    <Typography variant="body1">{appointment.time}</Typography>
                    <Typography variant="body1">{appointment.patient}</Typography>
                    <Typography variant="body1">{appointment.owner}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
  
          {/* Additional Section */}
          <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card>
              <CardHeader
                title="Notifications"
                sx={{ backgroundColor: '#dc004e', color: '#fff' }}
              />
              <CardContent>
                <Typography variant="body2">You have 3 new messages.</Typography>
                <Typography variant="body2">2 patients require follow-up.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card>
              <CardHeader
                title="Recent Activities"
                sx={{ backgroundColor: '#0288d1', color: '#fff' }}
              />
              <CardContent>
                <Box>
                  <Typography variant="body2">Patient Fluffy received a vaccination.</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">Invoice for patient Bella has been paid.</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2">New appointment scheduled for Max.</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
}