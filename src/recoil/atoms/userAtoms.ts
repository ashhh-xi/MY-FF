"use client";
import { atom } from "recoil";

// Update the atom to store a string for the user wallet address
export const userAddressAtom = atom<string | null>({
  key: "userAddress",  // Unique key for this atom
  default: null,       // Default value
});

export const balanceAtom = atom<number | null>({
  key: "balance",  // Unique key for this atom
  default: 0,       // Default value
});