import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Core/Dashboard/Sidebar";
import "./Render.css";
function Dashboard() {
  return (
    <div className="relative flex h-[calc(100vh-3.5rem)] overflow-hidden ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 h-full overflow-hidden bg-[#000814] ">
        <div className="mx-auto w-11/12 min-w-[1080px] h-full py-10 overflow-y-auto  custom_scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
