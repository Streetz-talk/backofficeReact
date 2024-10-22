import React from "react";
import Sidebar from "./sidebar/Sidebar"; // Import the Sidebar component
import "./AuthenticatedLayout.css"; // Optional: styles for layout

const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="authenticated-layout">
      <Sidebar /> {/* Sidebar is always present on authenticated pages */}
      <div className="main-content">
        {children} {/* This will render the page content */}
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
