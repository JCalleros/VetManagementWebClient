import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'

export default function FormStepperHeader({title}) {
  return (
    <Grid item xs={12}>
      <Typography variant="h5" sx={{ fontWeight: "bold "}} gutterBottom>
        {title}
      </Typography>
      <Divider />
    </Grid>
  )
}
