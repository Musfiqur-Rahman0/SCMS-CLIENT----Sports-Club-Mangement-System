import React from "react";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div>
      dashboard
      <Outlet />
    </div>
  );
};

export default Dashboard;
