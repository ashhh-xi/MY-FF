"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, X } from "lucide-react";
import { Web3Provider } from "@ethersproject/providers";
import { atom, useRecoilState, useSetRecoilState } from "recoil";

// Define a Recoil atom for wallet balance
export const walletBalanceAtom = atom<string | null>({
  key: "walletBalance",
  default: null,
});

const WalletConnection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const setWalletBalance = useSetRecoilState(walletBalanceAtom); // Use Recoil's set function for balance
  const timeoutRef = useRef<NodeJS.Timeout>();

  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new Web3Provider(window.ethereum);
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0];
        setWalletAddress(address);
        setUserAddress(address);
        setIsDialogOpen(true);
      } catch (error) {
        console.error("User rejected wallet connection", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setUserAddress(null);
    setWalletBalance(null); // Clear the balance in Recoil atom
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (userAddress) {
      const fetchBalance = async () => {
        if (window.ethereum) {
          const provider = new Web3Provider(window.ethereum);
          try {
            const balance = await provider.getBalance(userAddress);
            setWalletBalance(balance.toString()); // Update the balance in Recoil atom
          } catch (error) {
            console.error("Error fetching balance:", error);
          }
        }
      };
      fetchBalance();
    }
  }, [userAddress, setWalletBalance]);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new Web3Provider(window.ethereum);
      provider.listAccounts().then((accounts) => {
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(address);
          setUserAddress(address);
        }
      });
    }
  }, []);

  return (
    <>
      {!walletAddress ? (
        <button
          className="p-2 mt-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg text-white hover:from-purple-500 hover:to-pink-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          onClick={connectWallet}
        >
          Connect
        </button>
      ) : (
        <button
          className="p-2 mt-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg text-white hover:from-purple-500 hover:to-pink-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          onClick={() => setIsDialogOpen(true)}
        >
          Wallet Connected
        </button>
      )}

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
          >
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-[550px] text-white">
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
                    className="p-1 text-gray-400 hover:text-gray-200 focus:outline-none"
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
                  className="mt-4 w-full bg-gradient-to-r from-purple-700 via-purple-500 to-purple-400 text-white py-2 px-4 rounded hover:from-blue-800 hover:via-blue-600 hover:to-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={disconnectWallet}
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
