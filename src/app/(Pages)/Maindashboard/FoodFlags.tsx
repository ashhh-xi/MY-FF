import React from "react";
import { Flag, MapPin, Clock } from "lucide-react";
import Link from "next/link";
interface FoodFlagsProps {
  isDarkMode: boolean;
}

export default function FoodFlags({ isDarkMode }: FoodFlagsProps) {
  const activeDonations = [
    {
      id: 1,
      type: "Fresh Produce",
      quantity: "5kg",
      location: "KR Market",
      expiresIn: "2 hours",
      status: "Active",
    },
    {
      id: 2,
      type: "Baked Goods",
      quantity: "20 items",
      location: "Central Bakery",
      expiresIn: "4 hours",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Food Flags
        </h1>
        <div className="flex gap-4">
          <Link href="/donate">
            <button className="btn-primary px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Create New Flag
            </button>
          </Link>
          <Link href="/claim">
            <button className="btn-primary px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Claim flags
            </button>
          </Link>
          <Link href="/volunteer">
            <button className="btn-primary px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Become a Volunteer
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`${
          isDarkMode ? "bg-dark-lighter" : "bg-white"
        } rounded-xl p-6 border ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="space-y-4">
          {activeDonations.map((donation) => (
            <div
              key={donation.id}
              className={`${
                isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
              } rounded-lg p-4 hover:scale-[1.01] transition-transform`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isDarkMode ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    <Flag className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3
                      className={`font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {donation.type}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {donation.quantity}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                  {donation.status}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {donation.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Expires in {donation.expiresIn}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
