import React, { useState, useEffect } from "react";
import { Search, MoreVertical, ChevronDown, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const usersPerPage = 7;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://streetz.xyz/api/collections/users/records?perPage=${usersPerPage}&page=${currentPage}`,
          {
            method: "GET", // You can specify the method if needed
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token here
            },
          }
        );
        const data = await response.json();
        setUsers(data.items);
        setTotalItems(data.totalItems);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const stats = [
    {
      title: "Total Users",
      value: totalItems.toString(),
      change: "+40%",
      trending: "up",
    },
    {
      title: "Total Post Created",
      value: Math.floor(totalItems * 0.8).toString(),
      change: "+20%",
      trending: "up",
    },
    {
      title: "Total Corners Created",
      value: Math.floor(totalItems * 0.1).toString(),
      change: "+10%",
      trending: "up",
    },
  ];

  const totalPages = Math.ceil(totalItems / usersPerPage);

  // Card component
  const Card = ({ children, className = "" }) => (
    <div
      className={`bg-white rounded-lg border border-gray-100 shadow-sm ${className}`}
    >
      {children}
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Welcome back, Admin</h1>
          <p className="text-gray-500">
            Track, manage and forecast your users.
          </p>
        </div>
        <button className="px-4 py-2 bg-pink-500 text-white rounded-lg flex items-center gap-2">
          Create post
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500">{stat.title}</span>
              <button className="text-gray-400">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span
                className={`ml-2 text-sm ${
                  stat.trending === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change} vs last month
              </span>
            </div>
            <div className="mt-2">
              <svg className="w-full h-8">
                <path
                  d={
                    stat.trending === "up"
                      ? "M0,20 Q50,5 100,20"
                      : "M0,5 Q50,20 100,5"
                  }
                  fill="none"
                  stroke={stat.trending === "up" ? "#10B981" : "#EF4444"}
                  strokeWidth="2"
                />
              </svg>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg">
            <Users size={16} />
            Users
            <ChevronDown size={16} />
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
            Active Users
          </button>
        </div>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border rounded-lg w-64"
          />
        </div>
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-7 gap-4 py-3 px-4 bg-gray-50 rounded-t-lg text-sm text-gray-600">
        <div className="col-span-2">Users</div>
        <div>Followers</div>
        <div>Following</div>
        <div>Location</div>
        <div>Email</div>
        <div>Status</div>
      </div>

      {/* User List */}
      <div className="border rounded-b-lg">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-7 gap-4 p-4 border-b last:border-b-0 items-center"
            >
              <div className="col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                    {user.avatar && (
                      <img
                        src={`/api/placeholder/40/40`}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">
                      @{user.username}
                    </div>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-sm text-gray-500">
                    {user.bio || "No bio provided"}
                  </p>
                </div>
              </div>
              <div>{user.followers?.length || 0}</div>
              <div>{user.following?.length || 0}</div>
              <div>{user.priLocation?.city || "N/A"}</div>
              <div className="truncate">{user.email}</div>
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    user.verified
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.verified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 py-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
