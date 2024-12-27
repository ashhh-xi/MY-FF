"use client";

import { motion } from "framer-motion";
import { DonationCard } from "./DonationCard";

const donations = [
  {
    title: "Wheel Chair",
    amount: "₹6,500",
    unit: "/Person",
    image: "/image1",
    description: "Help provide mobility and independence to those in need.",
  },
  {
    title: "Plant a Tree",
    amount: "₹55",
    unit: "/Sapling",
    image: "/image2",
    description: "Contribute to a greener future by planting trees.",
  },
  {
    title: "Child Care Kit",
    amount: "₹100",
    unit: "Starting from",
    image: "/image3",
    description: "Provide essential care items for children in need.",
  },
  {
    title: "Donate a Gift for Hospital Children",
    amount: "₹200",
    unit: "/Person",
    image: "/image4",
    description: "Bring joy to children staying in hospitals.",
  },
  {
    title: "Educate a Child",
    amount: "₹800",
    unit: "Starting from",
    image: "/image5",
    description: "Support a child's education and future prospects.",
  },
  {
    title: "Give a Grocery Kit",
    amount: "₹500",
    unit: "/Kit",
    image: "/image6",
    description: "Help families with essential grocery supplies.",
  },
  {
    title: "Give a School Bag",
    amount: "₹500",
    unit: "/Bag",
    image: "/image7",
    description: "Equip students with necessary school supplies.",
  },
  {
    title: "Feed a Homeless Person",
    amount: "₹25",
    unit: "/Person",
    image: "/image8",
    description: "Provide meals to those experiencing homelessness.",
  },
];

export function DonationGrid() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {donations.map((donation, index) => (
            <DonationCard key={index} donation={donation} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
