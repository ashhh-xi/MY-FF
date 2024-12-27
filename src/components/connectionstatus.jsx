"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useRecoilState } from "recoil";
import { userAddressAtom } from "@/recoil/atoms/userAtoms";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xYourContractAddress";
const contractABI = [
  "function getContractData() public view returns (string)", // Example ABI function
];

const ConnectionStatus = () => {
  const [userAddress, setUserAddress] = useRecoilState(userAddressAtom); // Using Recoil state
  const [isConnecting, setIsConnecting] = useState(false);
  const [contractData, setContractData] = useState(null);

  useEffect(() => {
    if (userAddress) {
      console.log("Connected Address:", userAddress);
      interactWithContract();
    } else {
      console.log("No wallet connected.");
    }
  }, [userAddress]);

  const interactWithContract = async () => {
    try {
      if (!window.ethereum) {
        console.log("Ethereum wallet not found.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const data = await contract.getContractData();
      setContractData(data);
      console.log("Contract Data:", data);
    } catch (error) {
      console.error("Error interacting with the contract:", error);
    }
  };

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address); // Set Recoil state
      setIsConnecting(false);
      console.log("Wallet connected successfully.");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setUserAddress(null); // Reset Recoil state
    console.log("Wallet disconnected.");
  };

  return (
    <div className="wallet-connection">
      {userAddress ? (
        <div>
          <p>Connected Wallet: {userAddress}</p>
          <button onClick={handleDisconnect}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={handleConnect} disabled={isConnecting}>
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default ConnectionStatus;