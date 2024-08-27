import { BookOpenText, LayoutDashboard, PawPrint, LogOut } from "lucide-react";

export const leftNavLinks = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard />,
  },
  {
    path: "/dashboard/appointments",
    label: "Appointments",
    icon: <BookOpenText />,
  },
  {
    path: "/dashboard/patients",
    label: "Patients",
    icon: <PawPrint />,
  },
  {
    path: "/logout",
    label: "Logout",
    icon: <LogOut />,
  },
];

export const timeZone = "UTC";
