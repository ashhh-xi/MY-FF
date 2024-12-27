import React from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Project Feed Forward has revolutionized how we handle excess food at our restaurant. It's incredible to see our surplus going to those who need it most.",
      author: "Sarah Chen",
      role: "Restaurant Owner"
    },
    {
      quote: "The platform made it so easy to connect with local donors. We've been able to help so many more families in our community.",
      author: "Michael Rodriguez",
      role: "Food Bank Coordinator"
    },
    {
      quote: "Being part of this community has opened my eyes to how much impact we can have when we work together to reduce food waste.",
      author: "Emma Thompson",
      role: "Community Volunteer"
    }
  ];

  return (
    <div className="bg-gray-900 py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Community Stories</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-800 rounded-xl p-8 relative">
                      <Quote className="absolute top-4 left-4 w-8 h-8 text-emerald-400 opacity-50" />
                      <p className="text-gray-300 text-lg mb-6 pt-8">{testimonial.quote}</p>
                      <div className="flex items-center">
                        <div>
                          <p className="text-white font-semibold">{testimonial.author}</p>
                          <p className="text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 hover:bg-white/20 rounded-full p-2">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 hover:bg-white/20 rounded-full p-2">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}