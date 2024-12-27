import React from 'react';
import { Gem } from 'lucide-react';

interface NFTCollectionProps {
  isDarkMode: boolean;
}

export default function NFTCollection({ isDarkMode }: NFTCollectionProps) {
  const nfts = [
    {
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80",
      name: "Earth Saver #123",
      rarity: "Legendary",
      perks: "Premium donor status"
    },
    {
      image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?auto=format&fit=crop&w=800&q=80",
      name: "Community Hero #045",
      rarity: "Rare",
      perks: "Priority matching"
    },
    {
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      name: "Impact Maker #078",
      rarity: "Epic",
      perks: "Governance rights"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>NFT Collection</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nfts.map((nft, index) => (
          <div
            key={index}
            className={`${isDarkMode ? 'bg-dark-lighter' : 'bg-white'} rounded-xl overflow-hidden border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} hover:scale-[1.02] transition-transform`}
          >
            <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{nft.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-500">
                  {nft.rarity}
                </span>
              </div>
              <p className="text-sm text-gray-500">{nft.perks}</p>
              <button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}