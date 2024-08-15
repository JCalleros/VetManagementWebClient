"use client"
import Link from "next/link";
import { motion } from 'framer-motion';
import { Card, CardContent, CardMedia, CardActions, Box, Typography, Tooltip, IconButton } from "@mui/material";
import { Trash2 } from "lucide-react";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useDeletePatientMutation } from "@/lib/redux/features/patients/patientsApiSlice";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import ConfirmationDialog from "../shared/ConfimrationDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";


const speciesImages = {
  dog: "/assets/images/defaultPatientDogPhoto.webp",
  cat: "/assets/images/defaultPatientCatPhoto.webp",
};


const PatientCardActions = ({handleDeletePatient}) => {
  return (
    <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
      <Tooltip title="Delete Patient" placement="top">
        <IconButton
          onClick={handleDeletePatient}
          sx={{
            color: 'error.main',
            transition: 'transform .3s',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          }}
        >
          <Trash2 />
        </IconButton>
      </Tooltip>
    </CardActions>
  )
}

const PatientCardContent = ({patient}) => {
  return (
    <CardContent sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
          {patient.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {patient.species}
          </Typography>
          {patient.gender === 'male' ? <MaleIcon color="primary" /> : <FemaleIcon color="secondary" />}
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary">
        Breed: {patient.breed || 'Unknown'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Age: {patient.age_years ? `${patient.age_years} years` : ''}
        {patient.age_months ? ` ${patient.age_months} months` : ''}
        {patient.age_weeks ? ` ${patient.age_weeks} weeks` : ''}
      </Typography>
      
      <Typography variant="body2" color="text.secondary">
        Owner Name: {patient.owner.name}
      </Typography>
      
      <Typography variant="body2" color="text.secondary">
        Owner Phone: {patient.owner.phone_number}
      </Typography>
    </CardContent>
  )
}
const PatientCard = ({ patient, onPatientDeleted}) => {
  const [deletePatient] = useDeletePatientMutation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  const handleDeletePatient = async () => {
    if (patient?.id) {
			try {
        await deletePatient(patient.id).unwrap();
				toast.success("Patient was deleted");
        onPatientDeleted();
			} catch (e) {
        const errorMessage = extractErrorMessage(e);
				toast.error(errorMessage || "An error occurred");
			} finally {
        setConfirmOpen(false);
      }
		}
	};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      layout
      style={{ width: '100%', height: '100%', willChange: 'transform, opacity' }}
    >
      <Link href={`/dashboard/patients/${patient.id}`} key={patient.id} passHref style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            margin: 1,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            transition: '.3s',
            '&:hover': {
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
              transform: 'scale(1.05)',
            },
            p: 0.5,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="180"
              image={patient.photo || speciesImages[patient.species.toLowerCase()]}
              alt={patient.name}
              sx={{ borderRadius: 2 }}
            />
          </Box>
          <PatientCardContent patient={patient} />
          <PatientCardActions handleDeletePatient={(e)=> { e.preventDefault(); setConfirmOpen(true); }} />
        </Card>
      </Link>
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeletePatient}
        title="Confirm Deletion"
        content={`Are you sure you want to delete patient ${patient.name}?`}
      />
    </motion.div>
  )
};
  
export default PatientCard;