import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuth, setLogout } from "@/lib/redux/features/auth/authSlice";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

console.log(`Configuring base api: ${process.env.NEXT_PUBLIC_API_URL}`);
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api/v1",
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let response = await baseQuery(args, api, extraOptions);
  if (response.error && response.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResponse = await baseQuery(
          {
            url: "/auth/refresh/",
            method: "POST",
          },
          api,
          extraOptions
        );
        if (refreshResponse?.data) {
          api.dispatch(setAuth());
          response = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(setLogout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      response = await baseQuery(args, api, extraOptions);
    }
  }
  return response;
};

export const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Patient", "Owner", "Appointment"],
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({}),
});
