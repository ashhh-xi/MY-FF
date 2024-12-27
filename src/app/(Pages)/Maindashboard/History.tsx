import React from 'react';
import { Clock, Package, Check } from 'lucide-react';

interface HistoryProps {
  isDarkMode: boolean;
}

export default function History({ isDarkMode }: HistoryProps) {
  const activities = [
    {
      type: "Donation",
      item: "Fresh Produce",
      quantity: "5kg",
      date: "2024-03-10",
      status: "Completed"
    },
    {
      type: "Claim",
      item: "Baked Goods",
      quantity: "20 items",
      date: "2024-03-08",
      status: "Completed"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>History</h1>

      <div className={`${isDarkMode ? 'bg-dark-lighter' : 'bg-white'} rounded-xl p-6 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg p-4 hover:scale-[1.01] transition-transform`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                    {activity.type === "Donation" ? (
                      <Package className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {activity.type}: {activity.item}
                    </h3>
                    <p className="text-sm text-gray-500">Quantity: {activity.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{activity.date}</div>
                  <div className="text-sm font-medium text-green-500">{activity.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}