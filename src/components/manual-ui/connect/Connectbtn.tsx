"use client";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { walletAddressState } from "@/recoil/atoms/userAtoms"; // Import the atom

// Extend the Window interface to include 'ethereum'
declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ConnectBtn() {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectedSectionVisible, setIsConnectedSectionVisible] = useState(true); // Manage visibility of the wallet section
  const [walletAddress, setWalletAddress] = useRecoilState(walletAddressState); // Recoil state to manage wallet address

  useEffect(() => {
    // Initialize Web3 instance if MetaMask is available
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.warn("MetaMask not detected. Please install MetaMask!");
    }
  }, []);

  const connectWallet = async () => {
    if (!web3) {
      alert("MetaMask not detected. Please install MetaMask!");
      return;
    }

    setIsLoading(true);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts); // Update connected accounts
      setWalletAddress(accounts[0]); // Set the wallet address globally using Recoil
    } catch (error: any) {
      console.error("Error connecting wallet: ", error.message);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    // Listen for account changes in MetaMask
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (newAccounts: string[]) => {
        setAccounts(newAccounts);
        setWalletAddress(newAccounts[0]); // Update wallet address globally on account change
      });
    }
  }, []);

  // Close the wallet connected section
  const closeConnectedSection = () => {
    setIsConnectedSectionVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white">
      <button
        className={`p-3 ${
          accounts.length
            ? "bg-green-500 cursor-default"
            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        } rounded-lg text-white font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
        onClick={!accounts.length ? connectWallet : undefined}
        disabled={isLoading || accounts.length > 0}
      >
        {isLoading
          ? "Connecting..."
          : accounts.length
          ? "Connected"
          : "Connect Wallet"}
      </button>

      {isConnectedSectionVisible && accounts.length ? (
        <div className="mt-4 p-6 bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-2">Wallet Connected</h2>
          <code className="block text-purple-300 font-mono">{walletAddress}</code>
          <button
            className="mt-2 text-red-500 font-semibold hover:text-red-600"
            onClick={closeConnectedSection} // Close button to hide the section
          >
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}
 