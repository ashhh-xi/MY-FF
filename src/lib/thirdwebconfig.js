// src/lib/thirdwebconfig.js

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Sepolia } from "@thirdweb-dev/chains";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Fetch environment variables
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// Check if the clientId is provided
if (!clientId) {
  console.error("Missing Thirdweb Client ID. Set NEXT_PUBLIC_THIRDWEB_CLIENT_ID in your .env file.");
  throw new Error("Thirdweb Client ID is required");
}

// Initialize Thirdweb SDK for direct interaction with Sepolia chain
let sdk;
try {
  sdk = new ThirdwebSDK(Sepolia, { clientId });
} catch (error) {
  console.error("Error initializing Thirdweb SDK:", error);
  throw error;
}

// Initialize the Thirdweb client for contract interaction
const client = createThirdwebClient({
  clientId: clientId,
});

// Connect to the contract using the client
const contract = getContract({
  client,
  chain: defineChain(11155111), // Sepolia chain ID; update if using a different network
  address: contractAddress,
});

// Export functions to interact with the contract
export const getContractInstance = async () => {
  try {
    const contractInstance = await sdk.getContract(contractAddress); // Use environment variable for contract address
    return contractInstance;
  } catch (error) {
    console.error("Error getting contract instance:", error);
    throw error;
  }
};

// Export the client and contract for use in other parts of the application
export { client, contract };