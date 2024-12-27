"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface TeamCardProps {
  member: {
    name: string;
    role: string;
    image: string;
    bio: string;
  };
  index: number;
}

export function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden bg-gray-800/50 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all hover:transform hover:-translate-y-1">
        <div className="aspect-square relative">
          <Image
            src={member.image}
            alt={member.name}
            width="400"
            height="400"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-green-400">{member.name}</h3>
          <p className="text-gray-400 text-sm mb-2">{member.role}</p>
          <p className="text-gray-500 text-sm">{member.bio}</p>
        </div>
      </Card>
    </motion.div>
  );
}