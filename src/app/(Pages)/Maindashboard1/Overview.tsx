import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Users, ShoppingBag } from "lucide-react";

const data = [
  { name: "Jan", donations: 65, claims: 45, impact: 80 },
  { name: "Feb", donations: 75, claims: 55, impact: 95 },
  { name: "Mar", donations: 85, claims: 65, impact: 110 },
  { name: "Apr", donations: 95, claims: 75, impact: 125 },
  { name: "May", donations: 105, claims: 85, impact: 140 },
  { name: "Jun", donations: 115, claims: 95, impact: 155 },
];

interface OverviewProps {
  isDarkMode: boolean;
}

export default function Overview({ isDarkMode }: OverviewProps) {
  const chartColor = isDarkMode ? "#fff" : "#000";

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`${
            isDarkMode ? "bg-dark-lighter" : "bg-white"
          } rounded-xl p-6 border ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Donations
              </p>
              <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                10,234
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${
            isDarkMode ? "bg-dark-lighter" : "bg-white"
          } rounded-xl p-6 border ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Active Users
              </p>
              <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                1,234
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${
            isDarkMode ? "bg-dark-lighter" : "bg-white"
          } rounded-xl p-6 border ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10">
              <ShoppingBag className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Claims
              </p>
              <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                1,890
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`${
            isDarkMode ? "bg-dark-lighter" : "bg-white"
          } rounded-xl p-6 border ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Donation Trends
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient
                    id="colorDonations"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#818CF8" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDarkMode ? "#374151" : "#E5E7EB"}
                />
                <XAxis dataKey="name" stroke={chartColor} />
                <YAxis stroke={chartColor} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                    borderColor: isDarkMode ? "#374151" : "#E5E7EB",
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="donations"
                  stroke="#818CF8"
                  fillOpacity={1}
                  fill="url(#colorDonations)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className={`${
            isDarkMode ? "bg-dark-lighter" : "bg-white"
          } rounded-xl p-6 border ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Impact Overview
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDarkMode ? "#374151" : "#E5E7EB"}
                />
                <XAxis dataKey="name" stroke={chartColor} />
                <YAxis stroke={chartColor} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                    borderColor: isDarkMode ? "#374151" : "#E5E7EB",
                    color: isDarkMode ? "#FFFFFF" : "#000000",
                  }}
                />
                <Bar dataKey="impact" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
