import { baseApiSlice } from "../api/baseApiSlice";

export const appointmentsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "/appointments/create/",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointment"],
    }),
    getAllAppointments: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams();
        if (params.page) {
          queryString.append("page", params.page.toString());
        }
        if (params.searchTerm) {
          queryString.append("search", params.searchTerm);
        }
        return `/appointments/?${queryString.toString()}`;
      },
      providesTags: ["Appointment"],
    }),
    getSingleAppointment: builder.query({
      query: (appointmentId) => `/appointments/${appointmentId}/`,
      providesTags: ["Appointment"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAllAppointmentsQuery,
  useGetSingleAppointmentQuery,
} = appointmentsApiSlice;
