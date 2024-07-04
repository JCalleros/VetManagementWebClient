import { baseApiSlice } from "../api/baseApiSlice";

export const patientApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useGetAllPatientsQuery } = patientApiSlice;
