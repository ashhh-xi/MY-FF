"use client";

import { motion } from "framer-motion";
import { TeamCard } from "./TeamCard";

const team = [
  {
    name: "Sachin Baluragi",
    role: "Software Developer",
    image: "/sachin.png",
    bio: "Full Stack Development, Blockchain Developer",
  },
  {
    name: "Rahul Jadvani",
    role: "Software Developer",
    image: "/rahul.jpg",
    bio: "Full Stack Development, Blockchain Developer",
  },
  {
    name: "Sai Jadhav",
    role: "Software Developer",
    image: "/sai.jpg",
    bio: "Full Stack Development, Blockchain Developer",
  },
  {
    name: "Mohammedyaseen Sutar ",
    role: "Software Developer",
    image: "/yaseen.jpg",
    bio: "Full Stack Development, Blockchain Developer",
  },
];

export function TeamSection() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Meet Our Team -{" "}
            <span
              className="font-medium text-4xl bg-clip-text text-transparent 
            bg-gradient-to-r from-purple-900 to-pink-400"
            >
              {" "}
              The Honoured Ones
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Passionate individuals committed to leveraging technology for social
            impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
