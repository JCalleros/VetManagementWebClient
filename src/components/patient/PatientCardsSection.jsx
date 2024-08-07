import { Grid, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import PatientCard from "../cards/PatientCard";

const PatientsCardsSection = ({data, handlePatientDeleted}) => {
  return (
    <Grid container spacing={3}>
      {!data || data.patients.results.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            No patients found.
          </Typography>
        </Grid>
      ):(
        <AnimatePresence>
          {data.patients.results.map((patient) => (
            <Grid key={patient.id} item xs={12} sm={6} md={4} lg={3}>
              <PatientCard patient={patient} onPatientDeleted={handlePatientDeleted} />
            </Grid>
          ))}
        </AnimatePresence>
      )}
    </Grid>
  )
}

export default PatientsCardsSection;