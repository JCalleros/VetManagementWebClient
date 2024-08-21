import AppointmentPageDetails from "@/components/appointments/AppointmentPageDetails";


export const metadata = {
  title: "Vet Management | Patient Details",
  description: "Authenticated users can see the details of appointments",
};

export default function AppointmentDetailPage({ params }) {
  return (
  	<>
  	  <AppointmentPageDetails params={params} />
  	</>
  );
}