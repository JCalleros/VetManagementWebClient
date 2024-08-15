import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CreateAppointmentForm from '@/components/forms/appointment/CreateAppointmentForm';


export default function AppointmentModalForm({ open, onClose, event, start }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{event ? 'Edit Appointment' : 'New Appointment'}</DialogTitle>
      <DialogContent>
        <CreateAppointmentForm onClose={onClose}/>
      </DialogContent>
      <DialogActions>
        <Button color="primary" form="appointment-form" type="submit">
          {event ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
