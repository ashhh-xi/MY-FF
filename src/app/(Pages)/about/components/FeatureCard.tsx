"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: ReactNode;
  };
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 bg-gray-800/50 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all hover:transform hover:-translate-y-1">
        <div className="mb-4">{feature.icon}</div>
        <h3 className="text-xl font-semibold text-green-400 mb-2">{feature.title}</h3>
        <p className="text-gray-400">{feature.description}</p>
      </Card>
    </motion.div>
  );
}