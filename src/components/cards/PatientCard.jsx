import Link from "next/link";
import { motion } from 'framer-motion';
import { Card, CardContent, CardMedia, CardActions, Box, Typography, Tooltip, IconButton } from "@mui/material";
import { Trash2 } from "lucide-react";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';


const speciesImages = {
  dog: "/assets/images/defaultPatientDogPhoto.webp",
  cat: "/assets/images/defaultPatientCatPhoto.webp",
};



const PatientCardActions = () => {
  return (
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Tooltip title="Delete Patient" placement="top">
        <IconButton
          onClick={() => {}}
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
    <CardContent sx={{ padding: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {patient.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {patient.species}
          </Typography>
          {patient.sex === 'M' ? <MaleIcon color="primary" /> : <FemaleIcon color="secondary" />}
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
        {patient.owners && patient.owners.length > 0
          ? `Owners: ${patient.owners.map(owner => owner.name).join(', ')}`
          : 'Owners: No Owner'}
      </Typography>
    </CardContent>
  )
}
const PatientCard = ({ patient }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Link href={`/patient/${patient.id}`} key={patient.id}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#f3f5f5',
            margin: 0.5,
            borderRadius: 2,
            transition: '.3s',
            '&:hover': {
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
              transform: 'scale(1.05)',
            },
            p: 1,
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
          <PatientCardActions />
        </Card>
      </Link>
    </motion.div>
  )
};
  
export default PatientCard;