import { toast } from "react-toastify";

export const handleLogout = (router) => {
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  } catch (error) {
    toast.error(`Logout failed: ${error.message}`);
  }
};
