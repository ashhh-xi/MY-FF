import React from 'react';
import { Award, Star, Trophy } from 'lucide-react';

interface AchievementsProps {
  isDarkMode: boolean;
}

export default function Achievements({ isDarkMode }: AchievementsProps) {
  const achievements = [
    {
      title: "First Donation",
      description: "Made your first food donation",
      progress: 100,
      icon: <Award className="w-6 h-6" />,
      color: "text-blue-500"
    },
    {
      title: "Community Hero",
      description: "Helped 50 people with donations",
      progress: 75,
      icon: <Trophy className="w-6 h-6" />,
      color: "text-purple-500"
    },
    {
      title: "Earth Saver",
      description: "Saved 100kg of food from waste",
      progress: 45,
      icon: <Star className="w-6 h-6" />,
      color: "text-emerald-500"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Achievements</h1>
     

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">  
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`${isDarkMode ? 'bg-dark-lighter' : 'bg-white'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'} ${achievement.color}`}>
                {achievement.icon}
              </div>
              <div>
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{achievement.title}</h3>
                <p className="text-sm text-gray-500">{achievement.description}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
              <div className="text-sm text-gray-500">
                Progress: {achievement.progress}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}