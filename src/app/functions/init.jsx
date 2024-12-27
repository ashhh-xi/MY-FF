// thirdwebConfig.js

import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Initialize the Thirdweb client
export const client = createThirdwebClient({
  clientId: NEXT_PUBLIC_TEMPLATE_CLIENT_ID, // Replace with your actual client ID
});

// Connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(1), // 1 is for Ethereum Mainnet; use other chain IDs as needed
  address: NEXT_PUBLIC_CONTRACT_ADDRESS, // Replace with your actual contract address
});