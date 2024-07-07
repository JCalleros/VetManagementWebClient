import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";

export const userApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams();
        if (params.page) {
          queryString.append("page", params.page.toString());
        }

        if (params.searchTerm) {
          queryString.append("search", params.searchTerm);
        }
        return `/profiles/all/?${queryString.toString()}`;
      },
      providesTags: ["User"],
    }),

    getAllTechnicians: builder.query({
      query: (params = {}) => {
        const queryString = new URLSearchParams();
        if (params.page) {
          queryString.append("page", params.page.toString());
        }

        if (params.searchTerm) {
          queryString.append("search", params.searchTerm);
        }
        return `/profiles/non-tenant-profiles/?${queryString.toString()}`;
      },
      providesTags: ["User"],
    }),
    getUserProfile: builder.query({
      query: () => "/profiles/user/my-profile",
      providesTags: ["User"],
    }),
    udpateUserProfile: builder.mutation({
      query: (formData) => ({
        url: "/profiles/user/update/",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useUdpateUserProfileMutation,
  useGetAllTechniciansQuery,
} = userApiSlice;
