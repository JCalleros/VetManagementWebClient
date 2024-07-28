import { baseApiSlice } from "../api/baseApiSlice";

export const ownerApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOwner: builder.mutation({
      query: (postData) => ({
        url: "/owners/create/",
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["Owner"],
    }),
    getAllOwners: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams();
        if (params.page) {
          queryString.append("page", params.page.toString());
        }
        if (params.searchTerm) {
          queryString.append("search", params.searchTerm);
        }
        return `/owners/?${queryString.toString()}`;
      },
      providesTags: ["Owner"],
    }),
    getSingleOwner: builder.query({
      query: (ownerId) => `/owners/${ownerId}/`,
      providesTags: ["Owner"],
    }),
  }),
});

export const {
  useCreateOwnerMutation,
  useGetAllOwnersQuery,
  useGetSingleOwnerQuery,
} = ownerApiSlice;
