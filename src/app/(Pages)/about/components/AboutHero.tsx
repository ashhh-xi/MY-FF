"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { fadeIn } from "../animations";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_65%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <Badge
            variant="secondary"
            className="mb-4 bg-gray-800/50 backdrop-blur-sm border border-green-500/20 p-4 text-lg"
          >
            About Feed Forward
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-300 mb-6">
            Transforming Surplus Food into Sustainable Solutions
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          FeedForward is a revolutionary Web3 platform dedicated to combating food waste and hunger. By connecting surplus food from events and businesses to NGOs and individuals in need, it fosters a sustainable ecosystem powered by blockchain. Through features like FoodFlags, FeedCoin rewards, and decentralized governance, FeedForward ensures transparency, incentivizes contributions, and empowers communities to make a tangible impact in reducing food waste and supporting those in need.







          </p>
        </motion.div>
      </div>
    </section>
  );
}
