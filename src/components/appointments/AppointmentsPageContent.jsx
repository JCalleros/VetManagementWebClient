"use client";

import { useMemo, useState } from 'react';
import { Box, Button, CircularProgress, useMediaQuery, useTheme, Typography, Select, MenuItem } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/typedHooks';
import { useGetAllAppointmentsQuery } from '@/lib/redux/features/appointments/appointmentsApiSlice';
import AppointmentModalForm from '../modals/appointments/AppointmentModalForm';
import ModalForm from '../modals/ModalForm';
import CreateAppointmentForm from '../forms/appointment/CreateAppointmentForm';
import { useRouter } from 'next/navigation';
import { setSearchTerm } from '@/lib/redux/features/appointments/appointmentSlice';

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
moment.tz.setDefault(userTimeZone); 
const localizer = momentLocalizer(moment);

export default function AppointmentsPageContent({ params }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [newEventStart, setNewEventStart] = useState(null);
  const [statusFilter, setStatusFilter] = useState('SCHEDULED');
  const [view, setView] = useState('month'); 
  const [date, setDate] = useState(new Date());

  const { startDate, endDate } = useMemo(() => {
    let start, end;

    switch (view) {
      case 'week':
        start = moment(date).startOf('week').toDate();
        end = moment(date).endOf('week').toDate();
        break;
      case 'day':
        start = moment(date).startOf('day').toDate();
        end = moment(date).endOf('day').toDate();
        break;
      case 'month':
      default:
        start = moment(date).startOf('month').toDate();
        end = moment(date).endOf('month').toDate();
        break;
    }

    return { 
      startDate: start.toISOString().split('T')[0], 
      endDate: end.toISOString().split('T')[0] 
    };
  }, [view, date]);



  const { data, isLoading } = useGetAllAppointmentsQuery({
    startDate: startDate,
    endDate: endDate,
    searchTerm: statusFilter,
    pageSize: "100",
  });
  
  
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
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
    const localStart = moment(slotInfo.start);
    const utcStart = localStart.utc().toISOString();
    const selectedDate = localStart.clone().utc();
    setNewEventStart(selectedDate);
    setModalOpen(true);
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return '#1976d2';
      case 'completed':
        return '#388e3c';
      case 'cancelled':
        return '#d32f2f';
      default:
        return '#757575';
    }
  };


  const handleFilter = (event) => {
    setStatusFilter(event.target.value);
    const term = event.target.value.toLowerCase();
    dispatch(setSearchTerm(term));
  }


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
      <Select
          value={statusFilter}
          onChange={handleFilter}
          displayEmpty
          sx={{
            minWidth: { xs: '120px', sm: '200px' },
            fontSize: { xs: '0.75rem', sm: '1rem' },
            backgroundColor: '#fff',
            boxShadow: 1,
            borderRadius: 1,
          }}
        >
          <MenuItem value="">All Appointments</MenuItem>
          <MenuItem value="SCHEDULED">Scheduled</MenuItem>
          <MenuItem value="COMPLETED">Completed</MenuItem>
          <MenuItem value="CANCELLED">Cancelled</MenuItem>
        </Select>
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
              const localStart = moment.utc(appointment.date).tz(userTimeZone).toDate();
              const localEnd = moment.utc(appointment.date).add(15, 'minutes').tz(userTimeZone).toDate();
              
              return {
                id: appointment.id,
                title: `${appointment.patients.map(patient => patient.name).join(', ')} - ${appointment.service_type}`,
                start: localStart,
                end: localEnd,
                status: appointment.status,
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
                backgroundColor: getStatusColor(event.status),
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
