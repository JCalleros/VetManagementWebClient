"use client";
import { getCookie } from "cookies-next";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useEffect } from "react";
import { setAuth, setLogout } from "@/lib/redux/features/auth/authSlice";

export default function PersistAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      dispatch(
        setAuth({ accessToken: accessToken, refreshToken: refreshToken })
      );
    } else {
      dispatch(setLogout());
    }
  }, [dispatch]);

  return null;
}
