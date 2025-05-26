import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/dashboard.css";


const Dashboard = () => {

  console.log(import.meta.env.VITE_API_URL)
  return (
    <>
      <div className="dashboard">
          <Sidebar />
          <main>
            <Topbar />
            <Outlet/>
          </main>
        </div>
    </>
  );
};

export default Dashboard;
