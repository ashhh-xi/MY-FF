"use client";

import React, { useEffect, useRef } from "react";
import { Flag, Bell, Shield, Clock } from "lucide-react";

export default function Features() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const rect = parallaxRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          parallaxRef.current.style.transform = `translateY(${
            (scrolled - rect.top) * 0.1
          }px)`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Flag className="w-6 h-6" />,
      title: "Food Flags",
      description: "Real-time donation tracking system",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Alerts",
      description: "Instant notifications for local availability",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Users",
      description: "Trusted community verification",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Live Tracking",
      description: "End-to-end donation monitoring",
    },
  ];

  return (
    <div className="relative bg-black py-32 overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0">
        <div className="gradient-blur w-[600px] h-[600px] right-[-200px] top-[20%] animate-float" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#8dc443]">
            Core Features
          </h2>
          <p className="text-xl text-gray-400">
            Powerful tools designed to maximize impact and efficiency in food
            redistribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all animate-scale"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform animate-float">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
