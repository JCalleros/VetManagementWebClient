"use client"
import { Box, Grid, Button } from '@mui/material'
import { AnimatePresence } from 'framer-motion';
import PaginationSection from "@/components/shared/PaginationSection";
import { useAppSelector } from '@/lib/redux/hooks/typedHooks';
import PatientCard from '@/components/cards/PatientCard';
import { useGetAllPatientsQuery } from '@/lib/redux/features/patients/patientsApiSlice';

import PatientSearch from '@/components/shared/search/PatientSearch';

const speciesOptions = ['Dog', 'Cat'];
const sexOptions = ['Male', 'Female'];


export default function PatientsPage() {
  const searchTerm = useAppSelector((state) => state.patient.searchTerm);
	const page = useAppSelector((state) => state.patient.page);
	const { data, isLoading } = useGetAllPatientsQuery({ searchTerm, page });
  const totalCount = data?.patients.count || 0;
	const totalPages = Math.ceil(totalCount / 9);

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflowX: 'hidden' 
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          backgroundColor: '#fff',
          boxShadow: 1,
          borderRadius: 1,
          marginBottom: 2,
        }}
      >
        <PatientSearch />
        <Button variant="contained" color="primary" onClick={()=>{}}>
          Clear
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => {}}>
          Add Patient
        </Button>
      </Box>
      <Grid container spacing={3}>
        <AnimatePresence>
          {data && data.patients.results.length > 0 ? (
            data.patients.results.map((patient) => (
              <Grid key={patient.id} item xs={12} sm={6} md={4} lg={3}>
                <PatientCard patient={patient}/>
              </Grid>
            ))
          ):(
            <p>No patients found</p>
          )}
        </AnimatePresence>
      </Grid>
      <Box sx={{display: 'flex', mt: '2rem', justifyContent: 'center', bgcolor: 'red'}}>
        <PaginationSection totalPages={totalPages} entityType="patient" />
      </Box>
    </Box>
  )
}
