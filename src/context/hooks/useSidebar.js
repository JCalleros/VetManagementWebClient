import { useContext } from "react";
import { SidebarContext } from "../sidebarContext";

const useSidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  return { isSidebarOpen, toggleSidebar };
};

export default useSidebar;
