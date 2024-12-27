"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function DonationHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_65%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge variant="secondary" className="mb-4 bg-gray-800/50 backdrop-blur-sm border border-green-500/20">
            Make a Difference
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-green-300 mb-6">
            Support Our Causes
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every contribution counts. Choose a cause that resonates with you and help make a positive impact in someone's life.
          </p>
        </motion.div>
      </div>
    </section>
  );
}