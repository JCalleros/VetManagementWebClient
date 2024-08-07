import { baseApiSlice } from "../api/baseApiSlice";

export const patientApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPatient: builder.mutation({
      query: (postData) => ({
        url: "/patients/create/",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Patient"],
    }),
    getAllPatients: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams();
        if (params.page) {
          queryString.append("page", params.page.toString());
        }
        if (params.searchTerm) {
          queryString.append("search", params.searchTerm);
        }
        return `/patients/?${queryString.toString()}`;
      },
      providesTags: ["Patient"],
    }),
    getSinglePatient: builder.query({
      query: (patientId) => `/patients/${patientId}/`,
      providesTags: ["Patient"],
    }),
    updatePatient: builder.mutation({
      query: ({ patientId, ...postData }) => ({
        url: `/patients/${patientId}/update/`,
        method: "PATCH",
        body: postData,
      }),
      invalidatesTags: ["Patient"],
    }),
    deletePatient: builder.mutation({
      query: (patientId) => ({
        url: `/patients/${patientId}/delete/`,
        method: "DELETE",
        invalidatesTags: ["Patient"],
      }),
    }),
  }),
});

export const {
  useCreatePatientMutation,
  useGetAllPatientsQuery,
  useGetSinglePatientQuery,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientApiSlice;
