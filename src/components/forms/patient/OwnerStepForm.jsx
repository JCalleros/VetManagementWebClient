import OwnerModalForm from "@/components/modals/owners/OwnerModalForm";
import { useGetAllOwnersQuery } from "@/lib/redux/features/owners/ownersApiSlice";
import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { Clear } from "@mui/icons-material";
import { Box, Button, Divider, FormControl, Grid, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function OwnerStepForm({setIsStepValid}) {
    const { control, setValue, watch } = useFormContext();
    const [open, setOpenModal] = useState(false);
    const searchTerm = useAppSelector((state) => state.owner.searchTerm);
    const page = useAppSelector((state) => state.owner.page);
    const { data, isLoading } = useGetAllOwnersQuery({ searchTerm, page });
    const selectedOwner = watch("owner");
  
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);
  
    const handleOwnerCreated = (newOwner) => {
      setValue("owner", newOwner.id);
      setOpenCreateOwnerModal(false);
    };
  
    const handleClearSelection = () => {
      setValue("owner", "");
    };
  
    useEffect(() => {
      setIsStepValid(!!selectedOwner);
    }, [selectedOwner, setIsStepValid]);
  
  
    if (isLoading) {
      return <>Loading...</>
    }
  
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
            Select or create an owner
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button variant="outlined" onClick={handleModalOpen} sx={{ mr: 2 }}>
              Create Owner
            </Button>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="owner"
                render={({ field }) => (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Select
                      {...field}
                      displayEmpty
                      onChange={(e) => field.onChange(e.target.value)}
                      value={field.value || ""}
                      fullWidth
                    >
                      <MenuItem value="" disabled>
                        Select an owner
                      </MenuItem>
                      {data?.owners?.results?.map((owner) => (
                        <MenuItem key={owner.id} value={owner.id}>
                          {owner.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {field.value && (
                      <IconButton onClick={handleClearSelection}>
                        <Clear />
                      </IconButton>
                    )}
                  </Box>
                )}
              />
            </FormControl>
          </Box>
        </Grid>
        <OwnerModalForm open={open} onClose={handleModalClose} />
      </Grid>
    );
  }