import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import UsersPage from "../pages/UsersPage";
import CornersPage from "../pages/CornersPage";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/corners" element={<CornersPage />} />
            {/* Redirect any other authenticated routes to Dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        ) : (
          // Redirect unauthenticated users to Login
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
