import { useCreateOwnerMutation } from '@/lib/redux/features/owners/ownersApiSlice';
import { useAppSelector } from '@/lib/redux/hooks/typedHooks';
import { ownerSchema } from '@/lib/validationSchemas';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { FormFieldComponent } from '../FormFieldComponent';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress } from '@mui/material';
import { extractErrorMessage } from '@/utils';
import { toast } from 'react-toastify';


export default function CreateOwnerForm({ onClose }) {
  const [ createOwner, { isLoading }] = useCreateOwnerMutation();
  const searchTerm = useAppSelector((state) => state.owner.searchTerm);
  const page = useAppSelector((state) => state.owner.page);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
      resolver: zodResolver(ownerSchema),
      mode: "all",
      defaultValues: {
        name: "",
        phone_nomber: "",
        email: "",
      },
    });

  const onSubmit = async (values) => {
    try {
      const owner = await createOwner(values).unwrap();
      toast.success("Owner has been created");
      onClose(owner);
    } catch (error) {
      const errorMessage = extractErrorMessage(error);
      toast.error(errorMessage || "An error occurred");
    }
  }

  return (
    <form 
      noValidate 
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <FormFieldComponent
        label="Name"
        name="name"
        register={register}
        errors={errors}
        placeholder="Owner Name"
      />
      <FormFieldComponent
        label="Phone Number"
        name="phone_number"
        register={register}
        errors={errors}
        placeholder="Phone Number"
      />
      <FormFieldComponent
        label="Email"
        name="email"
        register={register}
        errors={errors}
        placeholder="Email"
        required={false}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? "Loading..." : "Create Owner"}
        </Button>
      </Box>
    </form>
  )
}

