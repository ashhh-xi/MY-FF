"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  stat: {
    label: string;
    value: string;
    icon: ReactNode;
  };
  index: number;
}

export function StatCard({ stat, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 bg-gray-800/50 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-colors">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-green-500/10 rounded-lg">
            {stat.icon}
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}