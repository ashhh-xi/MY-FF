import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Initialize the Thirdweb client
export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

// Connect to the contract
export const contract = getContract({
  client,
  chain: defineChain(11155111), // Replace with your contract's chain ID (e.g., 1 for Ethereum mainnet, 137 for Polygon)
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
});
