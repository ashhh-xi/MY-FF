"use client";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Menu, Bell, Sun, Moon, User } from "lucide-react";
import Inventory from "./Inventory";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import FoodFlags from "./FoodFlags";
import Achievements from "./Achievements";
import NFTCollection from "./NFTCollection";
import Analytics from "./Analytics";
import Community from "./Community";
import History from "./History";
import Image from "next/image";
import Connectbtn from "../../../components/manual-ui/connect/Connectbtn"; // Ensure correct case for component names
import { useRecoilValue } from "recoil";
import {
  walletAddressState,
} from "@/recoil/atoms/userAtoms"; // Correct atom imports
import Crowdfundingpage from "./Crowdfundingpage";
import { fetchBalanceSelector } from "@/blockchain/bal";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Recoil: Fetch wallet address and balance
  const walletAddress = useRecoilValue(walletAddressState);
  const balance = useRecoilValue(fetchBalanceSelector);

  // Function to toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "dark bg-dark-darker" : "bg-gray-50"
      }`}
    >
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isDarkMode={isDarkMode}
      />

      <div className="flex-1 overflow-auto">
        {/* Navigation Bar */}
        <nav
          className={`${
            isDarkMode
              ? "bg-dark-lighter border-gray-800"
              : "bg-white border-gray-200"
          } border-b sticky top-0 z-10`}
        >
          <div className="px-4 h-16 flex items-center justify-between">
            {/* Sidebar Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg ${
                isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"
              }`}
            >
              <Menu
                className={`w-6 h-6 ${
                  isDarkMode ? "text-gray-400" : "text-black"
                }`}
              />
            </button>

            <div className="flex items-center gap-6">
              {/* FeedCoin Balance and Connect Button */}
              <div className="flex items-center gap-2">
                <Image
                  src="/coin.png"
                  alt="FeedCoin"
                  width={50}
                  height={10}
                  className="rounded-full"
                />
                <p>{balance !== null ? `${100000} FDC` : "Loading..."}</p>
                <Connectbtn />
              </div>

              {/* Notifications */}
              <button
                className={`p-2 rounded-lg ${
                  isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"
                }`}
              >
                <Bell
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  isDarkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"
                }`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* User Profile Button */}
              <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800/50">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-6">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/Maindashboard" replace />}
            />
            <Route
              path="/Maindashboard"
              element={<Overview isDarkMode={isDarkMode} />}
            />
            <Route
              path="/FoodFlags"
              element={<FoodFlags isDarkMode={isDarkMode} />}
            />
            <Route
              path="/Achievements"
              element={<Achievements isDarkMode={isDarkMode} />}
            />
            <Route
              path="/NFTCollection"
              element={<NFTCollection isDarkMode={isDarkMode} />}
            />
            <Route
              path="/Analytics"
              element={<Analytics isDarkMode={isDarkMode} />}
            />
            <Route path="/Crowdfundingpage" element={<Crowdfundingpage />} />
            <Route
              path="/Community"
              element={<Community isDarkMode={isDarkMode} />}
            />
            <Route
              path="/History"
              element={<History isDarkMode={isDarkMode} />}
            />
            <Route path="/Inventory" element={<Inventory />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
