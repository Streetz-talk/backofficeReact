import React, { useEffect, useState } from "react";
import {
  Search,
  ChevronDown,
  MoreVertical,
  MapPin,
  MessageCircle,
  Heart,
  Image as ImageIcon,
  Calendar,
  AlertTriangle
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const PostPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(30);
  const [data, setData] = useState({ items: [], totalItems: 0, totalPages: 0 });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [authors, setAuthors] = useState({});
  const { token } = useAuth();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `https://streetz.xyz/api/collections/posts/records?perPage=${postsPerPage}&page=${currentPage}`,
        {
            method: "GET", // You can specify the method if needed
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token here
            },
          }
      );
      setData(response.data);
      
      // Fetch authors for the posts
      const uniqueAuthorIds = [...new Set(response.data.items.map(post => post.author))];
      const authorsData = await Promise.all(
        uniqueAuthorIds.map(authorId =>
          axios.get(`https://streetz.xyz/api/collections/users/records/${authorId}`)
        )
      );
      
      const authorsMap = {};
      authorsData.forEach(response => {
        const author = response.data;
        authorsMap[author.id] = author;
      });
      setAuthors(authorsMap);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const filteredPosts = data.items.filter((post) =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleDropdown = (postId) => {
    setActiveDropdown(activeDropdown === postId ? null : postId);
  };

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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Posts</h1>
        <p className="text-gray-500">Manage and monitor user posts</p>
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
            placeholder="Search posts..."
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

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Post Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    {authors[post.author]?.avatar && (
                      <img
                        src={`https://streetz.xyz/api/files/_pb_users_auth_/${post.author}/${authors[post.author].avatar}`}
                        alt={authors[post.author]?.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-gray-900 font-medium">
                      {authors[post.author]?.name || "Loading..."}
                    </div>
                    <div className="text-gray-500 text-sm flex items-center gap-1">
                      <MapPin size={14} />
                      {post.address}
                    </div>
                  </div>
                </div>
                
                <div className="relative dropdown-container">
                  <button
                    onClick={() => toggleDropdown(post.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical size={16} className="text-gray-400" />
                  </button>

                  {activeDropdown === post.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                      <div className="py-1">
                        <button
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {/* Handle view details */}}
                        >
                          View Details
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {/* Handle edit post */}}
                        >
                          Edit Post
                        </button>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => {/* Handle delete post */}}
                        >
                          Delete Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <p className="text-gray-800 mb-4">{post.content}</p>
              
              {post.images && post.images.length > 0 && (
                <div className="mb-4">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={`https://streetz.xyz/api/files/${post.collectionId}/${post.id}/${post.images[0]}`}
                      alt="Post image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Post Stats */}
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart size={16} className="text-gray-400" />
                    {post.likes?.length || 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={16} className="text-gray-400" />
                    {post.comments?.length || 0}
                  </div>
                  {post.explicit && (
                    <div className="flex items-center gap-1 text-amber-600">
                      <AlertTriangle size={16} />
                      Explicit
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-gray-400" />
                  {formatDate(post.created)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-gray-500">
          Showing {(currentPage - 1) * postsPerPage + 1} to{" "}
          {Math.min(currentPage * postsPerPage, data.totalItems)} of {data.totalItems} posts
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg disabled:opacity-50 hover:bg-pink-600 transition-colors"
            disabled={currentPage === 1}
          >
            Previous
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
  );
};

export default PostPage;