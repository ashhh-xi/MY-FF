"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, X } from "lucide-react";

const WalletConnection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const walletAddress = "0x6417bD6a25bF3456Cbb712E6efd2bb982DC3d0a1";
  const timeoutRef = useRef<NodeJS.Timeout>();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setIsCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <button
        className="p-2 mt-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg text-white hover:from-purple-500 hover:to-pink-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 *:
        "
        onClick={() => setIsDialogOpen(true)}
      >
        Connect
      </button>

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
          >
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md text-white">
              <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">Wallet Connection</h2>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-200 focus:outline-none"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-2">Connected Wallet:</p>
                <div className="flex items-center justify-between bg-gray-700 p-2 rounded">
                  <code className="text-sm text-purple-300 font-mono">
                    {walletAddress}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-1 -ml-10 text-gray-400 hover:text-gray-200 focus:outline-none0"
                    aria-label="Copy wallet address"
                  >
                    <Copy size={20} />
                  </button>
                </div>
                {isCopied && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-400 text-sm mt-2"
                  >
                    Copied to clipboard!
                  </motion.p>
                )}
                <button
                  className="mt-4 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded hover:from-red-600 hover:to-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                    "
                  //   className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded hover:from-red-600 hover:to-pink-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "

                  onClick={() => {
                    // Implement disconnect logic here
                    setIsDialogOpen(false);
                  }}
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WalletConnection;
