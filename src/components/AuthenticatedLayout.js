import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import "./AuthenticatedLayout.css";

const AuthenticatedLayout = () => {
  return (
    <div className="authenticated-layout">
      <Sidebar />
      <div className="main-content">
        <Outlet /> {/* Renders the matched child route */}
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
