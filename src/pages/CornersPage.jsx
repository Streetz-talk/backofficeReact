import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for making API calls
import { useAuth } from "../context/AuthContext";

import {
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

// Custom Card Component
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CornersPage = () => {
  const [corners, setCorners] = useState([]); // State for corners data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [totalCorners, setTotalCorners] = useState(0);
  const { token } = useAuth();

  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const usersPerPage = 10; // Define how many users per page

  const stats = [
    // { title: "Total Users", value: "2,420", change: "+40%", trending: "up" },
    // { title: "Highrise", value: "316", change: "-20%", trending: "down" },
    { title: "Street Corners", value: totalCorners, change: "+10%", trending: "up" },
  ];

  const apps = [
    // Your existing apps array
  ];

  const trending = [
    // Your existing trending array
  ];

  // Fetch corners data from the API
  useEffect(() => {
    const fetchCorners = async () => {
      try {
        const response = await axios.get(
          `https://streetz.xyz/api/collections/corners/records?perPage=${usersPerPage}&page=${currentPage}`,
          {
            method: "GET", // You can specify the method if needed
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token here
            },
          }
        );
        setCorners(response.data.items); // Set the corners data from the API response
        setTotalPages(response.data.totalPages);
        setTotalCorners(response.data.totalItems); // Set total pages from the API response
      } catch (err) {
        setError(err.message); // Set error message if the API call fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCorners(); // Call the fetch function
  }, [currentPage, token]); // Dependency array includes currentPage and token

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading text while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there was an issue
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow" style={{overflow: 'auto', height: '100vh', marginBottom: '50px'}}>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Welcome back, Olivia</h1>
        <p className="text-gray-500">
          Track, manage and forecast your customers and orders.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500">{stat.title}</span>
              <button className="text-gray-400">
                <ChevronDown size={16} />
              </button>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span
                className={`ml-2 text-sm ${
                  stat.trending === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change}
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

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Streetz corner</span>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
            <button className="px-3 py-1 text-sm border rounded-md">
              Filters
            </button>
          </div>

          <div className="relative mb-6">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          {/* Corners List */}
          <div className="space-y-4">
            {corners.map((corner) => (
              <Card key={corner.id} className="p-3 hover:bg-gray-50">
                <div className="flex flex-col">
                  <h3 className="font-medium">{corner.name}</h3>
                  <p className="text-sm text-gray-600">{corner.description}</p>
                  <p className="text-xs text-gray-400">{corner.address}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePreviousPage}
              className="flex items-center text-gray-500 disabled:opacity-50"
              disabled={currentPage === 1} // Disable button if on the first page
            >
              <ArrowLeft size={16} className="mr-1" />
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="flex items-center text-gray-500 disabled:opacity-50"
              disabled={currentPage === totalPages} // Disable button if on the last page
            >
              Next
              <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
        </div>

        {/* Right Column - Trending Topics */}
        <div className="w-full lg:w-64">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Trending Topics</span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {trending.map((topic, index) => (
              <Card key={index} className="p-3">
                <h4 className="font-medium">{topic.name}</h4>
                <p className="text-sm text-gray-500">{topic.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CornersPage;
