import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { setCurrentPage as setUserCurrentPage } from "@/lib/redux/features/users/userSlice";
import { setCurrentPage as setPatientCurrentPage } from "@/lib/redux/features/patients/patientSlice";
import { setCurrentPage as setAppointmentCurrentPage } from "@/lib/redux/features/appointments/appointmentSlice";
import { Stack, Pagination, PaginationItem } from "@mui/material";

const entityConfig = {
  user: {
    selectPage: (state) => state.user.page,
    setCurrentPage: setUserCurrentPage,
  },
  patient: {
    selectPage: (state) => state.patient.page,
    setCurrentPage: setPatientCurrentPage,
  },
  appointment: {
    selectPage: (state) => state.appointment.page,
    setCurrentPage: setAppointmentCurrentPage,
  },
  // Add more entities here as needed
};

const PaginationSection = ({
  totalPages,
  entityType,
}) => {

  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) => entityConfig[entityType].selectPage(state));
  const setCurrentPageAction = entityConfig[entityType].setCurrentPage;
 
  const handleChange = (event, value) => {
	if (currentPage !== value)
	  dispatch(setCurrentPageAction(value));
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        sx={{
          marginTop: '1rem',
          borderRadius: '9999px'
        }}
        onChange={handleChange}
      >
      </Pagination>
    </Stack>
  );
};

export default PaginationSection;