import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  
  return (
    <div className="flex flex-col min-h-screen layout">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default AppLayout;
