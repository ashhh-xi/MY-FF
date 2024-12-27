import React from "react";
import { Utensils, TreePine, Users } from "lucide-react";

export default function ImpactDashboard() {
  return (
    <div className="bg-gray-900 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-16 text-[#8dc443]">
          Social Impact Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl p-8 text-center backdrop-blur-lg">
            <Utensils className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2 ">0</div>
            <div className="text-gray-400">Meals Distributed</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl p-8 text-center backdrop-blur-lg ">
            <TreePine className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">0</div>
            <div className="text-gray-400">CO₂ Emissions Saved</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl p-8 text-center backdrop-blur-lg">
            <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">0</div>
            <div className="text-gray-400">Active Community Members</div>
          </div>
        </div>
      </div>
    </div>
  );
}
