import PatientDetails from "@/components/patient/PatientDetails";


export const metadata = {
  title: "Vet Management | Patient Details",
  description: "Authenticated users can see the details of patients",
};

export default function PatientDetailPage({ params }) {
  return (
  	<>
  	  <PatientDetails params={params} />
  	</>
  );
}