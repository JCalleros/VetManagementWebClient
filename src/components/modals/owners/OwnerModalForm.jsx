"use client";
import { useState } from "react";
import { Modal, Box, Typography, IconButton, Button, CircularProgress, Divider } from "@mui/material";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { ownerSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOwnerMutation } from "@/lib/redux/features/owners/ownersApiSlice";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import CreateOwnerForm from "@/components/forms/owner/CreateOwnerForm";

export default function OwnerModalForm({ open, onClose }) {

  return (
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
        <CreateOwnerForm onClose={onClose} />
      </Box>
    </Modal>
  );
};

