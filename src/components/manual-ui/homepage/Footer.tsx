import React from "react";
import { Github, Linkedin, Heart } from "lucide-react";

export default function Footer() {
  const developers = [
    {
      name: "Sachin",
      github: "https://github.com/sachin-pro-dev",
      linkedin: "https://www.linkedin.com/in/sachinbaluragi/",
    },
    {
      name: "Rahul",
      github: "https://github.com/Rahul-Jadvani",
      linkedin: "https://www.linkedin.com/in/rahul-jadvani-741751208/",
    },
    {
      name: "Sai",
      github: "https://github.com/saijadhav369",
      linkedin: "https://www.linkedin.com/in/sai-jadhav-371871200/",
    },
    {
      name: "Yaseen",
      github: "https://github.com/apex-parzival",
      linkedin: "https://www.linkedin.com/in/mohammedyaseen-sutar-6b0a9b195/",
    },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Feed Forward</h3>
            <p className="text-gray-400">
              Transforming surplus food into community support. Every meal
              shared creates a better future.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "About",
                "Features",
                "Impact",
                "NFT Collection",
                "Community",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
            <p className="text-gray-400">Email: hello@feedforward.org</p>
            <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">
              Developed with <Heart className="w-4 h-4 inline text-red-500" />{" "}
              by
            </h4>
            <div className="flex flex-wrap justify-center gap-8">
              {developers.map((dev) => (
                <div key={dev.name} className="flex items-center gap-3">
                  <span className="text-gray-400">{dev.name}</span>
                  <div className="flex gap-2">
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Feed Forward. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
