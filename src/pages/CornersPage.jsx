import React from "react";
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
  const stats = [
    { title: "Total Users", value: "2,420", change: "+40%", trending: "up" },
    { title: "Highrise", value: "316", change: "-20%", trending: "down" },
    { title: "Street Corners", value: "1,210", change: "+10%", trending: "up" },
  ];

  const apps = [
    {
      icon: "🟣",
      name: "Catalog",
      domain: "streetcorner.io",
      description: "Content curation app",
      subtext: "Brings all your news into one place",
      users: 6,
    },
    {
      icon: "🔵",
      name: "Cronodes",
      domain: "getcronodes.com",
      description: "Design software",
      subtext: "Super lightweight design app",
      users: 5,
    },
    {
      icon: "🟠",
      name: "Command+R",
      domain: "cmdr.sh",
      description: "Data prediction",
      subtext: "AI and machine learning data",
      users: 6,
    },
    {
      icon: "⚪",
      name: "Hourglass",
      domain: "hourglass.app",
      description: "Productivity app",
      subtext: "Time management and productivity",
      users: 4,
    },
  ];

  const trending = [
    { name: "Lagos", description: "Bring all your news into one place" },
    { name: "Ibadan", description: "The latest happening around you" },
    { name: "Calabar", description: "What's new" },
    { name: "Kano", description: "The latest happening around you" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow">
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

          {/* Apps List */}
          <div className="space-y-4">
            {apps.map((app, index) => (
              <Card key={index} className="p-3 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="mr-3 text-2xl">{app.icon}</div>
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <h3 className="font-medium">{app.name}</h3>
                      <span className="text-gray-400 text-sm ml-2">
                        ({app.domain})
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{app.description}</p>
                    <p className="text-xs text-gray-400">{app.subtext}</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[...Array(app.users)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"
                      />
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button className="flex items-center text-gray-500">
              <ArrowLeft size={16} className="mr-1" />
              Previous
            </button>
            <span className="text-sm text-gray-500">Page 1 of 10</span>
            <button className="flex items-center text-gray-500">
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
