import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  CheckCircle2,
  MapPin,
  Mail,
  Users,
  Calendar,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Set the number of users per page
  const [data, setData] = useState({ items: [], totalItems: 0, totalPages: 0 });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { token } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `https://streetz.xyz/api/collections/users/records?perPage=${usersPerPage}&page=${currentPage}`,
        {
          method: "GET", // You can specify the method if needed
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );
      setData(response.data); // Assuming response.data has the structure you need
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]); // Re-fetch users when currentPage changes

  const filteredUsers = data.items.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleDropdown = (userId) => {
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen" style={{overflow: 'auto', height: '100vh', marginBottom: '50px'}}>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Users</h1>
        <p className="text-gray-500">Manage and monitor user accounts</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-gray-800 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>
        <button className="px-4 py-2 bg-white text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors border border-gray-200">
          Filter
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">User</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Location</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Stats</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Joined</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">Status</th>
                <th className="py-4 px-6"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        {user.avatar && (
                          <img
                            src={`https://streetz.xyz/api/files/_pb_users_auth_/${user.id}/${user.avatar}`}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium flex items-center gap-2">
                          {user.name}
                          {user.verified && (
                            <CheckCircle2 className="text-pink-500" size={16} />
                          )}
                        </div>
                        <div className="text-gray-500 text-sm">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={16} className="text-gray-400" />
                      {user.priLocation?.city}, {user.priLocation?.country}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Users size={16} className="text-gray-400" />
                        {user.followers?.length || 0}
                      </div>
                      <div className="flex items-center gap-1 text-gray-700">
                        <Mail size={16} className="text-gray-400" />
                        {user.posts?.length || 0}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={16} className="text-gray-400" />
                      {formatDate(user.created)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {user.verified ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                        Verified
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        Unverified
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 relative dropdown-container">
                    <button
                      onClick={() => toggleDropdown(user.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>

                    {/* Custom Dropdown Menu */}
                    {activeDropdown === user.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                        <div className="py-1">
                          <button
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => {/* Handle view profile */}}
                          >
                            View Profile
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => {/* Handle edit user */}}
                          >
                            Edit User
                          </button>
                          <div className="border-t border-gray-200 my-1"></div>
                          <button
                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                            onClick={() => {/* Handle suspend user */}}
                          >
                            Suspend User
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="py-4 px-6 border-t border-gray-200 flex items-center justify-between">
          <div className="text-gray-500">
            Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
            {Math.min(currentPage * usersPerPage, data.totalItems)} of {data.totalItems} users
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg disabled:opacity-50 hover:bg-pink-600 transition-colors"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data.totalPages))}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg disabled:opacity-50 hover:bg-pink-600 transition-colors"
              disabled={currentPage === data.totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;