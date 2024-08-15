import AppointmentsPageContent from '@/components/appointments/AppointmentsPageContent';
import React from 'react'


export const metadata = {
  title: "Vet Management | Appointments",
  description: "Authenticated users can see the appointment page",
};

export default function AppointmentsPage() {
  return (
    <AppointmentsPageContent />
  )
}
