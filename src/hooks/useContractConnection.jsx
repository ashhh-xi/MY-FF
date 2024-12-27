"use client";

import { useEffect, useState } from "react";
import { getContractInstance } from "../lib/thirdwebconfig";

export function useContractConnection() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("Checking contract connection...");
        const contract = await getContractInstance();

        // Replace "name" with a valid read-only function name from your contract
        const name = await contract.call("name"); // Ensure your contract has a "name" function
        console.log("Contract name:", name);
        setIsConnected(true);
      } catch (error) {
        console.error("Contract connection failed:", error);
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  return isConnected;
}