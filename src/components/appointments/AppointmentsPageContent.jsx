"use client";

import { useState } from 'react';
import { Box, Button, CircularProgress, useMediaQuery, useTheme, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAppSelector } from '@/lib/redux/hooks/typedHooks';
import { useGetAllAppointmentsQuery } from '@/lib/redux/features/appointments/appointmentsApiSlice';
import AppointmentModalForm from '../modals/appointments/AppointmentModalForm';
import ModalForm from '../modals/ModalForm';
import CreateAppointmentForm from '../forms/appointment/CreateAppointmentForm';
import { useRouter } from 'next/navigation';

const localizer = momentLocalizer(moment);
moment.tz.setDefault('utc')


export default function AppointmentsPageContent({ params }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventStart, setNewEventStart] = useState(null);
  const searchTerm = useAppSelector((state) => state.appointment.searchTerm);
  const page = useAppSelector((state) => state.appointment.page);
  const { data, isLoading, refetch } = useGetAllAppointmentsQuery({ searchTerm, page });
  const [view, setView] = useState('month'); 
  const [date, setDate] = useState(new Date());

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Display small view on medium devices too
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSelectEvent = (event) => {
    const slug = event.id;
    router.push(`/dashboard/appointments/${slug}`);
  };

  const handleSelectSlot = (slotInfo) => {
    const utcStart = moment(slotInfo.start).utc().toISOString();
    setNewEventStart(utcStart);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const appointments = data?.appointments?.results || [];

  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        p: { xs: 1, sm: 3 },
        overflowX: 'hidden',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleModalOpen}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            fontSize: { xs: '0.75rem', sm: '1rem' },
          }}
        >
          Add Appointment
        </Button>
      </Box>

      <Box
        sx={{
          padding: { xs: 1, sm: 2 },
          backgroundColor: '#fff',
          boxShadow: 1,
          borderRadius: 1,
          marginBottom: 2,
          height: { xs: '60vh', sm: '70vh' },
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isSmallScreen ? (
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Upcoming Appointments
            </Typography>
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {appointments.map((appointment) => (
                <li key={appointment.id} style={{ marginBottom: '1rem' }}>
                  <Typography variant="body1" fontWeight="bold" sx={{ color: '#1976d2' }}>
                    {`${appointment.patients.map(patient => patient.name).join(', ')} - ${appointment.service_type}`}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#757575' }}>
                    {moment(appointment.date).format('MMMM Do, h:mm a')}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        ) : (
          <Calendar
            localizer={localizer}
            events={appointments.map(appointment => {
              const localStart = moment.utc(appointment.date).toDate();
              const localEnd = moment.utc(appointment.date).add(15, 'minutes').toDate();
              
              return {
                id: appointment.id,
                title: `${appointment.patients.map(patient => patient.name).join(', ')} - ${appointment.service_type}`,
                start: localStart,
                end: localEnd,
                allDay: false,
              };
            })}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            view={view}
            date={date}
            onNavigate={handleNavigate}
            onView={handleViewChange}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: '#1976d2',
                color: '#fff',
                borderRadius: '5px',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  cursor: 'pointer',
                },
              },
            })}
          />
        )}
      </Box>
      <ModalForm open={modalOpen} onClose={handleModalClose} title="Create Appointment" submitLabel="Create Appointment"> 
        <CreateAppointmentForm onClose={handleModalClose} initialDate={newEventStart} />
      </ModalForm>
    </Box>
    </>
  );
}
