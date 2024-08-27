"use client"

import FirstStep from "@/components/forms/patient/FirstStep";
import SecondStep from "@/components/forms/patient/SecondStep";
import ReviewStep from "@/components/forms/patient/ReviewStep";
import { useCreatePatientMutation } from "@/lib/redux/features/patients/patientsApiSlice";
import { patientCompletSchema, patientGeneralSchema, patientOwnerSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import StepperModalForm from "../StepperModalForm";

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
      component: FirstStep,
    },
    {
      label: 'Owner',
      schema: patientOwnerSchema,
      component: SecondStep,
    },
    {
      label: 'Review',
      schema: patientCompletSchema,
      component: ReviewStep
    },
  ];

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
    <StepperModalForm 
      open={open}
      onClose={onClose}
      title="Create Patient"
      methods={methods}
      steps={steps}
      onSubmit={onSubmit}
      onError={onError}
    />
  )
}