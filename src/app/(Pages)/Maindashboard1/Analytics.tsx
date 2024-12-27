import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock } from 'lucide-react';

interface AnalyticsProps {
  isDarkMode: boolean;
}

const data = [
  { month: 'Jan', donations: 65, claims: 45, impact: 80 },
  { month: 'Feb', donations: 75, claims: 55, impact: 95 },
  { month: 'Mar', donations: 85, claims: 65, impact: 110 },
  { month: 'Apr', donations: 95, claims: 75, impact: 125 },
  { month: 'May', donations: 105, claims: 85, impact: 140 },
  { month: 'Jun', donations: 115, claims: 95, impact: 155 },
];

export default function Analytics({ isDarkMode }: AnalyticsProps) {
  const chartColor = isDarkMode ? '#fff' : '#000';

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${isDarkMode ? 'bg-dark-lighter' : 'bg-white'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Monthly Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                <XAxis dataKey="month" stroke={chartColor} />
                <YAxis stroke={chartColor} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                    color: isDarkMode ? '#FFFFFF' : '#000000'
                  }}
                />
                <Line type="monotone" dataKey="donations" stroke="#818CF8" />
                <Line type="monotone" dataKey="claims" stroke="#34D399" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-dark-lighter' : 'bg-white'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Impact Metrics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                <XAxis dataKey="month" stroke={chartColor} />
                <YAxis stroke={chartColor} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                    color: isDarkMode ? '#FFFFFF' : '#000000'
                  }}
                />
                <Bar dataKey="impact" fill="#818CF8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}