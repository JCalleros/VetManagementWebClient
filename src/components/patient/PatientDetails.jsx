"use client";
import { useRouter } from 'next/navigation';
import { useGetSinglePatientQuery } from "@/lib/redux/features/patients/patientsApiSlice";
import { Grid, Paper, Box, Typography, CardMedia, Button } from "@mui/material";

const defaultPhoto = '/assets/images/defaultPatientCatPhoto.webp';


function PatientGeneralInfo({ patient }) {
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
        <Typography variant="body1"><strong>Species:</strong> {patient?.species}</Typography>
        <Typography variant="body1"><strong>Breed:</strong> {patient?.breed}</Typography>
        <Typography variant="body1"><strong>Gender:</strong> {patient?.gender}</Typography>
        <Typography variant="body1"><strong>Age:</strong> {patient?.age_years} years, {patient?.age_months} months, {patient?.age_weeks} weeks</Typography>
      </Box>
    </Paper>
  );
}

function PatientOwnerInfo({ name, phone_number, email }) {
  return (
    <Paper sx={{ padding: 2, flex: 1 }}>
      <Typography variant="h6" gutterBottom>Owner Information</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant="body1"><strong>Name:</strong> {name}</Typography>
        <Typography variant="body1"><strong>Phone Number:</strong> {phone_number}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
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
  const { data, isLoading } = useGetSinglePatientQuery(slug);
  const patient = data?.patient;
  
  if (isLoading) {
    return <>Loading...</>
  }
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        maxHeight: '100%'
      }}
    >
      <Grid container spacing={3} sx={{ height: '100%' }}>
        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => router.back()} sx={{ width: 'fit-content' }}>
            Back
          </Button>
        </Grid>
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <PatientGeneralInfo patient={patient} />
          <PatientOwnerInfo name={patient.owner_name} phone_number={patient.owner_phone_number} email={patient.owner_email} />
        </Grid>
        <Grid item xs={12} md={9} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <PatientHealthInfo />
          <PatientServicesInfo />
        </Grid>
      </Grid>
    </Box>
  );
}

export default function PatientDetails({ params }) {
  return (
  	<PatientDetailsContent params={params} />
  );
}