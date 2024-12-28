import { atom } from "recoil";

// Wallet address state
export const walletAddressState = atom<string>({
  key: "walletAddressState",
  default: "", // Default value (initial value)
});

// Balance state
export const balanceAtom = atom<number | null>({
  key: "balance",
  default: 1000,
});
