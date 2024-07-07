import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
import authReducer from "@/lib/redux/features/auth/authSlice";
import userReducer from "@/lib/redux/features/users/userSlice";
import patientReducer from "@/lib/redux/features/patients/patientSlice";

export const rootReducer = {
  [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  auth: authReducer,
  user: userReducer,
  patient: patientReducer,
};
