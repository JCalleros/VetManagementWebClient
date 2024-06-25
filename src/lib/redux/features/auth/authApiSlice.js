import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/users/",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    activateUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/users/activation/",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPasswordRequest: builder.mutation({
      query: (formData) => ({
        url: "/auth/users/reset_password/",
        method: "POST",
        body: formData,
      }),
    }),
    resetPasswordConfirmation: builder.mutation({
      query: (formData) => ({
        url: "/auth/users/reset_password_confirm/",
        method: "POST",
        body: formData,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
    }),
    refreshJWT: builder.mutation({
      query: () => ({
        url: "/auth/refresh/",
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: () => "/auth/user/me/",
    }),
    socialAuthentication: builder.mutation({
      query: ({ provider, state, code }) => ({
        url: `/auth/o/${provider}/?state=${encodeURIComponent(
          state
        )}&code=${encodeURIComponent(code)}`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "apllication/x-www-form-urlencoded",
        },
      }),
    }),
  }),
});

export const {
  useSocialAuthenticationMutation,
  useActivateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useRegisterUserMutation,
  useResetPasswordConfirmationMutation,
  useResetPasswordRequestMutation,
  useRefreshJWTMutation,
} = authApiSlice;
