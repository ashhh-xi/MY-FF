import React from 'react';

export default function NFTCollection() {
  const nfts = [
    {
      image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80",
      title: "Earth Saver",
      perks: "Premium donor status, exclusive events access"
    },
    {
      image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?auto=format&fit=crop&w=800&q=80",
      title: "Community Champion",
      perks: "Priority matching, custom badge"
    },
    {
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      title: "Impact Maker",
      perks: "Governance rights, special recognition"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl p-8 text-center backdrop-blur-lg
    ">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-16 text-[#8dc443]">NFT Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nfts.map((nft, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:-translate-y-2 transition-all">
              <img src={nft.image} alt={nft.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{nft.title}</h3>
                <p className="text-gray-400">{nft.perks}</p>
                <button className="mt-4 w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all">
                  Mint NFT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}