import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Add CSS for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <img src="/logo.png" alt="Streetz Talk Logo" />
      </div>

      {/* Search Input */}
      <div className="sidebar-search">
        <input type="text" placeholder="Search" />
      </div>

      {/* Menu Items */}
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <i className="icon-dashboard" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/reviews">
            <i className="icon-reviews" /> Reviews
          </Link>
        </li>
        <li>
          <Link to="/faqs">
            <i className="icon-faqs" /> FAQs
          </Link>
        </li>
        <li>
          <Link to="/notifications">
            <i className="icon-notification" /> Notification
          </Link>
        </li>
        <li>
          <Link to="/users">
            <i className="icon-users" /> Users
          </Link>
        </li>
      </ul>

      {/* Bottom Section - Settings and Profile */}
      <div className="sidebar-bottom">
        <div className="sidebar-settings">
          <i className="icon-settings" /> Settings
        </div>
        <div className="sidebar-profile">
          <img src="/profile-pic.jpg" alt="Profile" />
          <div>
            <p>Olivia Rhye</p>
            <p>olivia@untitledui.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
