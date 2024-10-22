import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import UsersPage from "../pages/UsersPage";
import CornersPage from "../pages/CornersPage";
import PrivateRoute from "../utils/PrivateRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/corners"
          element={
            <PrivateRoute>
              <CornersPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
