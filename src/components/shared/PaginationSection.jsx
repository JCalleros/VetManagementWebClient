import { setCurrentPage as setUserCurrentPage } from "@/lib/redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { setCurrentPage as setPatientCurrentPage } from "@/lib/redux/features/patients/patientSlice";
import { Stack, Pagination, PaginationItem } from "@mui/material";



const PaginationSection = ({
  totalPages,
  entityType,
}) => {

  const dispatch = useAppDispatch();

  const currentPage = useAppSelector((state) =>
	  entityType === "user" ? state.user.page : state.patient.page,
  );

  const setCurrentPageAction =
	  entityType === "user" ? setUserCurrentPage : setPatientCurrentPage;
 
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