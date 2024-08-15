"use client"
import { useState } from 'react';
import { Box, Grid, Button, Typography, CircularProgress } from '@mui/material'
import { AnimatePresence } from 'framer-motion';
import PaginationSection from "@/components/shared/PaginationSection";
import { useAppSelector } from '@/lib/redux/hooks/typedHooks';
import PatientCard from '@/components/cards/PatientCard';
import { useGetAllPatientsQuery } from '@/lib/redux/features/patients/patientsApiSlice';
import PatientSearch from '@/components/shared/search/PatientSearch';
import PatientModalFrom from '@/components/modals/patients/PatientModalForm';
import PatientsCardsSection from './PatientCardsSection';




export default function PatientPageContent({params}) {
  const [modalOpen, setModalOpen] = useState(false);
  const searchTerm = useAppSelector((state) => state.patient.searchTerm);
  const page = useAppSelector((state) => state.patient.page);
  const { data, isLoading, refetch } = useGetAllPatientsQuery({ searchTerm, page });
  const totalCount = data?.patients.count || 0;
  const totalPages = Math.ceil(totalCount / 9);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handlePatientDeleted = () => {
    refetch();
  };

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        p: 3,
        overflowX: 'hidden',
        backgroundColor: '#f5f5f5',
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
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
          Add Patient
        </Button>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <PatientsCardsSection data={data} handlePatientDeleted={handlePatientDeleted} />
      )}
      <Box sx={{ display: 'flex', mt: 4, justifyContent: 'center' }}>
        <PaginationSection totalPages={totalPages} entityType="patient" />
      </Box>
      <PatientModalFrom open={modalOpen} onClose={() => {setModalOpen(false)}}/>
    </Box>
  )
}
