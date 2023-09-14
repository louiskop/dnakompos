import React from "react";
import { Outlet } from "react-router-dom";

// component imports
import Header from "./layout/Header";

const UserRoutes = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default UserRoutes;
