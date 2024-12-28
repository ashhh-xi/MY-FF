// import React, { useState } from "react";
// import { ethers } from "ethers"; // For Web3 integration
// import { Flag, MapPin, Clock } from "lucide-react";
// import Link from "next/link";
// import { useRecoilValue } from "recoil";
// import { walletAddressState } from "@/recoil/atoms/userAtoms"; // Correct atom imports

// interface FoodFlagsProps {
//   isDarkMode: boolean;
// }

// export default function FoodFlags({ isDarkMode }: FoodFlagsProps) {
//   const walletAddress = useRecoilValue(walletAddressState);

//   const [isClaiming, setIsClaiming] = useState(false);

//   const activeDonations = [
//     {
//       id: 1,
//       type: "Fresh Produce",
//       quantity: "5kg",
//       location: "KR Market",
//       expiresIn: "2 hours",
//       status: "Active",
//       price: ethers.utils.parseEther("0.01"), // Example claim price
//     },
//     {
//       id: 2,
//       type: "Baked Goods",
//       quantity: "20 items",
//       location: "Central Bakery",
//       expiresIn: "4 hours",
//       status: "Active",
//       price: ethers.utils.parseEther("0.02"), // Example claim price
//     },
//   ];

//   async function handleClaim(donation: any) {
//     if (!walletAddress) {
//       alert("Please connect your wallet to claim a donation.");
//       return;
//     }

//     try {
//       setIsClaiming(true);

//       // Connect to the user's wallet
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();

//       // Example: Sending a transaction (replace with your contract interaction)
//       const transaction = await signer.sendTransaction({
//         to: walletAddress, // Replace with the recipient's address
//         value: donation.price, // The price of the donation
//       });

//       await transaction.wait();
//       alert(`Transaction successful! Hash: ${transaction.hash}`);
//     } catch (error) {
//       console.error("Transaction failed", error);
//       alert("Transaction failed. Please try again.");
//     } finally {
//       setIsClaiming(false);
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1
//           className={`text-2xl font-bold ${
//             isDarkMode ? "text-white" : "text-gray-900"
//           }`}
//         >
//           Food Flags
//         </h1>
//         <div className="flex gap-4">
//           <Link href="/donate">
//             <button className="btn-primary px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//               Create New Flag
//             </button>
//           </Link>
//           <Link href="/claim">
//             <button className="btn-primary px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//               Claim Flags
//             </button>
//           </Link>
//           <Link href="/volunteer">
//             <button className="btn-primary px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//               Become a Volunteer
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div
//         className={`${
//           isDarkMode ? "bg-dark-lighter" : "bg-white"
//         } rounded-xl p-6 border ${
//           isDarkMode ? "border-gray-800" : "border-gray-200"
//         }`}
//       >
//         <div className="space-y-4">
//           {activeDonations.map((donation) => (
//             <div
//               key={donation.id}
//               className={`${
//                 isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
//               } rounded-lg p-4 hover:scale-[1.01] transition-transform`}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-2 rounded-lg ${
//                       isDarkMode ? "bg-gray-700" : "bg-white"
//                     }`}
//                   >
//                     <Flag className="w-5 h-5 text-blue-500" />
//                   </div>
//                   <div>
//                     <h3
//                       className={`font-medium ${
//                         isDarkMode ? "text-white" : "text-gray-900"
//                       }`}
//                     >
//                       {donation.type}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       Quantity: {donation.quantity}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   className={`btn-primary px-4 py-2 rounded-lg w-[150px] bg-gradient-to-r from-blue-500 to-purple-500 text-white ${
//                     isClaiming ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                   onClick={() => handleClaim(donation)}
//                   disabled={isClaiming}
//                 >
//                   {isClaiming ? "Processing..." : "Claim"}
//                 </button>
//               </div>
//               <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
//                 <div className="flex items-center gap-1">
//                   <MapPin className="w-4 h-4" />
//                   {donation.location}
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   Expires in {donation.expiresIn}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { ethers } from "ethers"; // For Web3 integration
import { Flag, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { walletAddressState } from "@/recoil/atoms/userAtoms"; // Correct atom imports

const CONTRACT_ADDRESS = "0xa81F35187C9DfaEBfc8ae8b9f7c45Acf3Bb8E2fa"; // Replace with your contract address
const ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "count", type: "uint256" },
      { internalType: "string", name: "donationType", type: "string" },
    ],
    name: "donate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

interface FoodFlagsProps {
  isDarkMode: boolean;
}

export default function FoodFlags({ isDarkMode }: FoodFlagsProps) {
  const walletAddress = useRecoilValue(walletAddressState);

  const [isClaiming, setIsClaiming] = useState(false);

  const activeDonations = [
    {
      id: 1,
      type: "Fresh Produce",
      quantity: "5", // Representing count
      location: "KR Market",
      expiresIn: "2 hours",
    },
    {
      id: 2,
      type: "Baked Goods",
      quantity: "20", // Representing count
      location: "Central Bakery",
      expiresIn: "4 hours",
    },
    {
      id: 3,
      type: "Vegetables",
      quantity: "100", // Representing count
      location: "Banashakari",
      expiresIn: "1 hours",
    },
    {
      id: 4,
      type: "Meat",
      quantity: "100", // Representing count
      location: "Banashakari",
      expiresIn: "1 hours",
    },
  ];

  async function handleClaim(donation: any) {
    if (!walletAddress) {
      alert("Please connect your wallet to claim a donation.");
      return;
    }

    try {
      setIsClaiming(true);

      // Connect to the user's wallet
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Connect to the smart contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      // Call the `donate` function on the contract
      const transaction = await contract.donate(
        ethers.utils.parseUnits(donation.quantity, 0),
        donation.type,
        { gasLimit: 300000 } // Adjust gas limit as needed
      );

      await transaction.wait();
      alert(`Donation claimed successfully! Hash: ${transaction.hash}`);
    } catch (error) {
      console.error("Transaction failed", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setIsClaiming(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1
          className={`text-2xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Food Flags
        </h1>
        <div className="flex gap-4">
          <Link href="/donate">
            <button className="btn-primary px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Create New Flag
            </button>
          </Link>
          <Link href="/claim">
            <button className="btn-primary px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Claim Flags
            </button>
          </Link>
          <Link href="/volunteer">
            <button className="btn-primary px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Become a Volunteer
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`$${
          isDarkMode ? "bg-dark-lighter" : "bg-white"
        } rounded-xl p-6 border ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="space-y-4">
          {activeDonations.map((donation) => (
            <div
              key={donation.id}
              className={`$${
                isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
              } rounded-lg p-4 hover:scale-[1.01] transition-transform`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg $${
                      isDarkMode ? "bg-gray-700" : "bg-white"
                    }`}
                  >
                    <Flag className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3
                      className={`font-medium $${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {donation.type}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Quantity: {donation.quantity}
                    </p>
                  </div>
                </div>

                <button
                  className={`btn-primary px-4 py-2 rounded-lg w-[150px] bg-gradient-to-r from-blue-500 to-purple-500 text-white $${
                    isClaiming ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleClaim(donation)}
                  disabled={isClaiming}
                >
                  {isClaiming ? "Processing..." : "Claim"}
                </button>
              </div>
              <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {donation.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Expires in {donation.expiresIn}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
