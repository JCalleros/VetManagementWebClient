"use client";
import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, IconButton, Stepper, Step, StepLabel, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider } from "react-hook-form";
import { StepperProvider } from "@/context/stepperContext";


const StepperModalForm = ({
  open,
  onClose,
  title,
  methods,
  steps,
  onSubmit,
  onError,
}) => {

  const [isStepValid, setIsStepValid] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      methods.handleSubmit(onSubmit, onError)();
      setActiveStep(0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  
  return (
      <FormProvider {...methods}>
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "85%", sm: "80%", md: "60%", lg: "50%" },
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: { xs: 2, sm: 3, md: 4 },
              outline: "none",
              maxHeight: { xs: "85vh" , sm: "90vh"} ,
              overflowY: "auto",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography id="modal-title" variant="h6" component="h2">
                {title}
              </Typography>
              <IconButton onClick={onClose} sx={{ color: "grey.500" }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} /> 
            <Stepper activeStep={activeStep} 
              sx={{
                mb: 3,
                width: "100%",
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "primary.main",
                },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "primary.main",
                },
              }}
              alternativeLabel
            >
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ mb: 3 }}>
               {React.createElement(steps[activeStep].component, { setIsStepValid })}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  variant="outlined"
                  sx={{ mr: 2, width: "100px" }}
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                disabled={!isStepValid}
                sx={{ ml: "auto", width: "150px" }}
              >
                 {activeStep === steps.length - 1 ? 'Create Patient' : `Next Step: ${steps[activeStep+1].label}`}
              </Button>
            </Box>
          </Box>
        </Modal>
      </FormProvider>
  );
};

export default StepperModalForm;
