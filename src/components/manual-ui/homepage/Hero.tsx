"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center overflow-hidden Bruno-Ace-SC;
"
    >
      <div ref={parallaxRef} className="absolute inset-0 parallax-scroll">
        <div className="gradient-blur w-[500px] h-[500px] left-[-100px] top-[-100px] animate-float" />
        <div
          className="gradient-blur w-[400px] h-[400px] right-[-50px] bottom-[-50px] animate-float"
          style={{ animationDelay: "-3s" }}
        />
      </div>

      <div className="relative container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              {/* <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-glow">
                Reduce Food Waste
              </span> */}
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-lime-400 to-lime-600 animate-glow bruno-ace-sc;
"
              >
                Reduce Food Waste
              </span>
              <span className="block mt-2 text-white">Share with Purpose</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Join our movement to transform surplus food into community
              support. Every meal shared creates a better future.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/Signupin">
                <button
                  className="group px-8 py-4 bg-[#8dc443] text-white rounded-full font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 animate-scale"
                  style={{ animationDelay: "0.3s" }}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <Link href="/about">
                <button
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-full font-medium hover:bg-[#8dc443] transition-all animate-scale"
                  style={{ animationDelay: "0.6s" }}
                >
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "2500+",
                label: "Meals Shared",
                description: "Direct impact on communities",
              },
              {
                number: "100+",
                label: "Active Partners",
                description: "Growing network of support",
              },
              {
                number: "5000+",
                label: "CO₂ Saved",
                description: "Environmental impact in kg",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all animate-scale text-[#8dc443] text-center"
                style={{ animationDelay: `${0.2 * (index + 1)}s` }}
              >
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 animate-glow text-[#8dc443]">
                  {stat.number}
                </div>
                <div className="mt-2 text-xl font-medium text-white">
                  {stat.label}
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
