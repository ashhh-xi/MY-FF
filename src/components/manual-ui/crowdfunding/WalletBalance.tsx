import { Wallet } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function WalletBalance() {
  return (
    <Card className="bg-black/40 border border-emerald-500/20 p-8 text-center backdrop-blur-sm">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl"></div>
          <Wallet className="h-16 w-16 text-emerald-500 relative" />
        </div>
      </div>
      <h2 className="text-xl text-gray-400 mb-2">Current Donation Wallet Balance</h2>
      <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
        1,234.56 FDC
      </div>
      <p className="text-gray-400 mt-2">≈ $2,469.12 USD</p>
    </Card>
  );
}