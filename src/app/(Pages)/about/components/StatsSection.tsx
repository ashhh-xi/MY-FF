"use client";

import { motion } from "framer-motion";
import { Leaf, Users, Building2, Coins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { StatCard } from "./StatCard";

const stats = [
  { label: "Food Waste Reduced", value: "75T", icon: <Leaf className="w-5 h-5" /> },
  { label: "Active Users", value: "10K+", icon: <Users className="w-5 h-5" /> },
  { label: "NGO Partners", value: "200+", icon: <Building2 className="w-5 h-5" /> },
  { label: "FeedCoin Distributed", value: "1M+", icon: <Coins className="w-5 h-5" /> },
];

export function StatsSection() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}