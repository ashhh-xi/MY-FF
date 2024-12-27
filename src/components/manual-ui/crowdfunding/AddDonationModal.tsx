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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wallet } from 'lucide-react';

interface AddDonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddDonationModal({ open, onOpenChange }: AddDonationModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: '',
  });

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Donation submitted:', formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Donation</DialogTitle>
          <DialogDescription className="text-gray-400">
            Contribute to the donation pool
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Donation Amount (FDC)</label>
            <div className="relative">
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-black/50 border-gray-700 text-white pl-12"
                placeholder="Enter amount"
              />
              <Wallet className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 h-5 w-5" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Payment Method</label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger className="bg-black/50 border-gray-700 text-white">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-700">
                <SelectItem value="crypto">Crypto Wallet</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
              </SelectContent>
            </Select>
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
              onClick={handleSubmit}
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
            >
              Add Donation
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}