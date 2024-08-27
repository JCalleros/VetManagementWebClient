import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Modal, List, ListItem, ListItemIcon, Checkbox, ListItemText, Typography } from '@mui/material';
import { useGetAllPatientsQuery } from '@/lib/redux/features/patients/patientsApiSlice';
import { useGetSingleOwnerQuery } from '@/lib/redux/features/owners/ownersApiSlice';

export default function PatientModalSelection({ open, onClose, selectedOwner, selectedPatients, setSelectedPatients }) {
  const { data: ownerDetails, isLoading: loadingOwner } = useGetSingleOwnerQuery(selectedOwner, { skip: !selectedOwner });

  const { data: patients, refetch: fetchPatientsByOwner, isFetching: loadingPatients } = useGetAllPatientsQuery(
    { searchTerm: ownerDetails?.owner?.phone_number || ownerDetails?.owner?.name || '', page: 0 },
    { skip: !ownerDetails }
  );

  useEffect(() => {
    if (ownerDetails) {
      fetchPatientsByOwner();
    }
  }, [ownerDetails, fetchPatientsByOwner]);


  const togglePatientSelection = (patient) => {
    const isSelected = selectedPatients.some((p) => p.id === patient.id);
    if (isSelected) {
      setSelectedPatients(selectedPatients.filter((p) => p.id !== patient.id));
    } else {
      setSelectedPatients([...selectedPatients, patient]);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2,
        width: { xs: '90%', sm: '70%', md: '50%' }, maxHeight: '80vh', overflowY: 'auto'
      }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Select Patients
        </Typography>
        {loadingPatients ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {patients?.patients?.results.map((patient) => (
              <ListItem key={patient.id} button onClick={() => togglePatientSelection(patient)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedPatients.some((p) => p.id === patient.id)}
                  />
                </ListItemIcon>
                <ListItemText primary={patient.name} secondary={patient.breed} />
              </ListItem>
            ))}
          </List>
        )}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
