"use client"
import { useState, useEffect } from 'react';
import { Modal, MenuItem, Box, Button, Typography, Select, Stepper, Step, StepLabel, IconButton, Grid, TextField, Divider, InputLabel, FormControl } from '@mui/material';
import { X } from 'lucide-react';
import { Controller, useForm, FormProvider, useFormContext, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  patientGeneralSchema,
  patientOwnerSchema,
  patientCompletSchema, 
} from '@/lib/validationSchemas';
import { useGetAllOwnersQuery, useGetSingleOwnerQuery } from '@/lib/redux/features/owners/ownersApiSlice';
import { FormFieldComponent } from '@/components/forms/FormFieldComponent';
// import GenderSelectField from '@/components/forms/patient/GenderSelectField';
// import SpeciesSelectField from '@/components/forms/patient/SpeciesSelectField';
import { useAppSelector } from '@/lib/redux/hooks/typedHooks';
import { Clear } from '@mui/icons-material';
import { useCreatePatientMutation } from '@/lib/redux/features/patients/patientsApiSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { extractErrorMessage } from '@/utils';
import BasicInfoStepForm from '@/components/forms/patient/BasicInfoStepForm';
import OwnerStepForm from '@/components/forms/patient/OwnerStepForm';
import ReviewStepForm from '@/components/forms/patient/ReviewStepForm';


export default function PatientModalForm({ open, onClose }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);
  const [createPatient, {isLoading}] = useCreatePatientMutation();
  const methods = useForm({
    resolver: zodResolver(patientCompletSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      gender: 'male',
      species: 'dog',
      breed: '',
      color: '',
      age_years: '',
      age_months: '',
      age_weeks: '',
      photo: '',
      owner: '',
    },
  });

  const router = useRouter();
  
  const steps = [
    {
      label: 'Basic Info',
      schema: patientGeneralSchema,
      component: <BasicInfoStepForm setIsStepValid={setIsStepValid}/>,
    },
    {
      label: 'Owner',
      schema: patientOwnerSchema,
      component: <OwnerStepForm setIsStepValid={setIsStepValid}/>,
    },
    {
      label: 'Review',
      schema: patientCompletSchema,
      component: <ReviewStepForm />
    },
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      methods.handleSubmit(onSubmit, onError)();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onSubmit = async (values) => {
    try {
      await createPatient(values).unwrap();
      toast.success('A Patient has been created.');
      router.push('/dashboard/patients');
    } catch (e) {
      const errorMessage = extractErrorMessage(e);
      toast.error(errorMessage || 'An error occurred');
    } finally {
      methods.reset();
      setActiveStep(0);
      onClose();
    }
  }

  const onError = (e) => {
    const errorMessage = extractErrorMessage(e);
    toast.error(errorMessage || 'An error occurred');
  }

  return (
    <FormProvider {...methods}>
      <Modal
        open={open}
        onClose={onClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: {
              xs: '90%',
              sm: '80%',
              md: '70%',
              lg: '60%',
              xl: '50%',
            },
            mx: 'auto',
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" gutterBottom>
              Create Patient
            </Typography>
            <IconButton onClick={onClose}>
              <X />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} /> 
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4}}>
            <Stepper activeStep={activeStep} sx={{ mb: 4, width: '100%' }} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
            {steps[activeStep].component}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} variant="outlined" sx={{ mr: 2 }}>
                Back
              </Button>
            )}
            <Button onClick={handleNext} variant="contained" color="primary" disabled={!isStepValid} sx={{ ml: 'auto' }}>
              {activeStep === steps.length - 1 ? 'Create Patient' : `Next Step: ${steps[activeStep+1].label}`}
            </Button>
          </Box>
        </Box>
      </Modal>
    </FormProvider>
  )
}