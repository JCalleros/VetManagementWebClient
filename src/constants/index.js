import { BookOpenText, LayoutDashboard, PawPrint } from "lucide-react";

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
];
