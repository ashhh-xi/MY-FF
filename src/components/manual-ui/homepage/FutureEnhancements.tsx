import React from 'react';
import { Brain, Blocks, LineChart } from 'lucide-react';

export default function FutureEnhancements() {
  return (
    <div className="bg-gradient-to-b from-purple-900 to-gray-900 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-16">Future Enhancements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Brain className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Predictions</h3>
            <p className="text-gray-400">Smart algorithms to predict food surplus and optimize distribution</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Blocks className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Blockchain Transparency</h3>
            <p className="text-gray-400">Enhanced tracking and verification through blockchain technology</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <LineChart className="w-12 h-12 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-400">Detailed insights and impact tracking for all stakeholders</p>
          </div>
        </div>
      </div>
    </div>
  );
}