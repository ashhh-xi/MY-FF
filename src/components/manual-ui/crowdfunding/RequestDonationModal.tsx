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
import { Textarea } from '@/components/ui/textarea';
import { Upload, Wallet } from 'lucide-react';

interface RequestDonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RequestDonationModal({ open, onOpenChange }: RequestDonationModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    walletAddress: '',
  });

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/95 border border-gray-800 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Request Donation</DialogTitle>
          <DialogDescription className="text-gray-400">
            Fill out the form below to submit your donation request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Amount Needed (FDC)</label>
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
            <label className="text-sm text-gray-400">Purpose/Reason</label>
            <Textarea
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="bg-black/50 border-gray-700 text-white h-32"
              placeholder="Explain why you need these funds..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Wallet Address</label>
            <Input
              value={formData.walletAddress}
              onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
              className="bg-black/50 border-gray-700 text-white"
              placeholder="Enter your wallet address"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Supporting Documents</label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-emerald-500/50 transition-colors cursor-pointer">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-400">
                Drag and drop files here, or click to select files
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PDF, DOC, DOCX, JPG, PNG (max 10MB)
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
      
              onClick={() => onOpenChange(false)}
              className="border-gray-700 text-gray-400 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}