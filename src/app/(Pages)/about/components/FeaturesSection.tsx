"use client";

import { motion } from "framer-motion";
import { Bell, Coins, Users, Shield } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    title: "FoodFlags",
    description: "On-chain signals for real-time food availability tracking",
    icon: <Bell className="w-6 h-6 text-green-400" />,
  },
  {
    title: "FeedCoin Rewards",
    description: "Earn tokens for active participation in food redistribution",
    icon: <Coins className="w-6 h-6 text-green-400" />,
  },
  {
    title: "DAO Governance",
    description: "Community-driven decision-making using blockchain",
    icon: <Users className="w-6 h-6 text-green-400" />,
  },
  {
    title: "Blockchain Security",
    description: "Transparent and secure transaction recording",
    icon: <Shield className="w-6 h-6 text-green-400" />,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_65%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-green-400 mb-4">Our Mission</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
          Our mission at FeedForward is to create a sustainable, decentralized platform that bridges the gap between food surplus and those in need. By leveraging blockchain technology, we aim to eliminate food waste, empower communities, and foster transparency in food redistribution. Through collaboration, innovation, and incentivization, we strive to ensure no meal goes to waste while promoting a culture of sustainability and social responsibility worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}