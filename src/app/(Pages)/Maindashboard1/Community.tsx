import React from 'react';
import { Users, MessageSquare, Heart } from 'lucide-react';

interface CommunityProps {
  isDarkMode: boolean;
}

export default function Community({ isDarkMode }: CommunityProps) {
  const members = [
    {
      name: "Sarah Chen",
      role: "Restaurant Owner",
      contributions: 156,
      joined: "2 months ago"
    },
    {
      name: "Michael Rodriguez",
      role: "Food Bank Coordinator",
      contributions: 89,
      joined: "1 month ago"
    },
    {
      name: "Emma Thompson",
      role: "Community Volunteer",
      contributions: 234,
      joined: "6 months ago"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Community</h1>

      <div className={`${isDarkMode ? 'bg-dark-lighter' : 'bg-white'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Active Members</h2>
        <div className="space-y-4">
          {members.map((member, index) => (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg p-4 hover:scale-[1.01] transition-transform`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{member.contributions}</p>
                  <p className="text-sm text-gray-500">contributions</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}