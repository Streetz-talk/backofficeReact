import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Loader2, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://streetz.xyz/api/admins/auth-with-password",
        { identity, password }
      );
      const { email } = response.data.admin;
      login(response.data.token, email);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid login credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-white font-semibold text-2xl">
            Streetz Talk
          </span>
        </div>

        {/* Login Form */}
        <div className="bg-[#1E293B] rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className="w-full bg-[#0F172A] text-gray-300 pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0F172A] text-gray-300 pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
