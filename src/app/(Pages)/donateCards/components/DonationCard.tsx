"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";
interface DonationCardProps {
  donation: {
    title: string;
    amount: string;
    unit: string;
    image: string;
    description: string;
  };
  index: number;
}

export function DonationCard({ donation, index }: DonationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden bg-gray-800/50 backdrop-blur-sm border-green-500/20 hover:border-green-500/40 transition-all hover:transform hover:-translate-y-1 group ">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={donation.image}
            height={100}
            width={100}
            alt={donation.title}
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-green-400 mb-2">
            {donation.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4">{donation.description}</p>
          <div className="flex items-baseline mb-4">
            <span className="text-2xl font-bold text-white">
              {donation.amount}
            </span>
            <span className="text-gray-400 ml-1 text-sm">{donation.unit}</span>
          </div>
          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            <Heart className="w-4 h-4 mr-2" />
            Donate Now
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
