"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon, Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function AuthPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Bearer");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const apiBaseUrl = "http://localhost:5500/api/v1/user";

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Sign up successful!");
        router.push("/Maindashboard"); // Redirect on successful signup
      } else {
        alert(`Sign up failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("An error occurred during sign up. Please try again.");
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Sign in successful!");
        router.push("/Maindashboard"); // Redirect on successful signin
      } else {
        alert(`Sign in failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      alert("An error occurred during sign in. Please try again.");
    }
  };

  const handleGoogleOAuth = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5500/api/v1/user/google-Oauth"
      );
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Google OAuth error:", error);
      alert("Error with Google OAuth. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="absolute top-6 right-6 animate-fade-in">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
            isDarkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-white text-gray-800 hover:bg-gray-100 shadow-md"
          }`}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1
              className={`text-5xl font-bold mb-3 animate-glow text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400`}
            >
              Welcome to Project Feed Forward
            </h1>
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Together, We Turn Leftovers into Lifelines
            </p>
          </div>

          <div
            className={`relative p-8 rounded-2xl transition-all duration-300 animate-scale ${
              isDarkMode
                ? "bg-gray-900/50 backdrop-blur-xl border border-blue-500/20 shadow-[0_0_50px_rgba(79,70,229,0.2)]"
                : "bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-100"
            }`}
          >
            <form
              className="space-y-6"
              onSubmit={isSignIn ? handleSignIn : handleSignUp}
            >
              {!isSignIn && (
                <div className="animate-fade-in">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your username"
                    className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 text-white border-gray-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                        : "bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    } border hover:border-blue-500/50`}
                  />
                </div>
              )}
              <div
                className="animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 text-white border-gray-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                      : "bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  } border hover:border-blue-500/50`}
                />
              </div>
              <div
                className="animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 text-white border-gray-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                        : "bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    } border hover:border-blue-500/50`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                      isDarkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-600"
                    }`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div
                className="animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <label
                  className={`block text-sm mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 text-white border-gray-700 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                      : "bg-gray-50 text-gray-900 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  } border hover:border-blue-500/50`}
                >
                  <option value="">Select</option>
                  <option value="Donor">Donor</option>
                  <option value="Receiver">Receiver</option>
                  <option value="Logistics">Logistics</option>
                </select>
              </div>
              <button
                type="submit"
                className={`w-full py-2.5 rounded-lg text-lg font-medium transition-all duration-300 ${
                  isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-500 focus:ring-4 focus:ring-blue-600/30"
                    : "bg-blue-600 text-white hover:bg-blue-500 focus:ring-4 focus:ring-blue-600/30"
                }`}
              >
                {isSignIn ? "Sign In" : "Sign Up"}
              </button>
            </form>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-gray-400 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {isSignIn
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleGoogleOAuth}
                className={`flex items-center space-x-2 text-lg bg-blue-500 hover:bg-blue-600 p-3 w-full rounded-lg justify-center  ${
                  isDarkMode
                    ? "bg-blue-600 text-white hover:bg-blue-500 focus:ring-4 focus:ring-blue-600/30"
                    : "bg-blue-600 text-white hover:bg-blue-500 focus:ring-4 focus:ring-blue-600/30"
                }`}
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
