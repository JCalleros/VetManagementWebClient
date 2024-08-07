import React from 'react'

export default function StepperModal() {
  return (
    <>
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
              <Typography variant="h6" gutterBottom>
                Create new patient
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
    </>
  )
}
