import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  RadioTower,
  Settings,
  Search,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 h-screen bg-[#0F172A] text-gray-300 flex flex-col">
      {/* Logo Section */}
      <div className="p-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-white font-semibold">Streetz Talk</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#1E293B] text-gray-300 pl-10 pr-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="px-2 space-y-1">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-pink-500 bg-pink-500/10 hover:bg-pink-500/20 transition-colors"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1E293B] transition-colors"
            >
              <Users size={20} />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/corners"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1E293B] transition-colors"
            >
              <RadioTower size={20} />
              <span>Corners</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Settings, Logout and User Profile */}
      <div className="p-4 border-t border-gray-700">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1E293B] transition-colors mb-2"
        >
          <Settings size={20} />
          <span>Settings</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1E293B] transition-colors mb-4 w-full text-left text-red-400 hover:text-red-300"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-400"></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-200">Olivia Rhye</div>
            <div className="text-xs text-gray-400">olivia@streettalk.com</div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
