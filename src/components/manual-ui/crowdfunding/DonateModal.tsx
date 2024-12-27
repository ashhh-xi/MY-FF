import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

interface DonateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: any;
}

export default function DonateModal({ open, onOpenChange, request }: DonateModalProps) {
  const [amount, setAmount] = useState('');

  const handleDonate = () => {
    // Handle donation logic here
    console.log('Donating:', amount, 'FDC');
    onOpenChange(false);
  };

  if (!request) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Make a Donation</DialogTitle>
          <DialogDescription className="text-gray-400">
            Support {request.name} with your contribution
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Amount (FDC)</label>
            <div className="relative">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/50 border-gray-700 text-white pl-12"
                placeholder="Enter amount"
              />
              <Wallet className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-700 text-gray-400 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDonate}
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
            >
              Confirm Donation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}