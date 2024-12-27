import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import DonateModal from './DonateModal';

interface Campaign {
  id: string;
  name: string;
  amount: number;
  raised: number;
  purpose: string;
  daysLeft: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'School Lunch Program',
    amount: 2000,
    raised: 1500,
    purpose: 'Providing nutritious lunches for underprivileged students',
    daysLeft: 5,
  },
  {
    id: '2',
    name: 'Elderly Care Meals',
    amount: 1500,
    raised: 900,
    purpose: 'Weekly meal delivery for senior citizens',
    daysLeft: 3,
  },
];

export default function ActiveCampaigns() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {mockCampaigns.map(campaign => {
        const progress = (campaign.raised / campaign.amount) * 100;
        
        return (
          <Card key={campaign.id} className="bg-black/40 border border-gray-800 p-6 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">{campaign.name}</h3>
                <p className="text-emerald-500 font-semibold">
                  {campaign.raised} / {campaign.amount} FDC
                </p>
              </div>
              <Button
                onClick={() => setSelectedCampaign(campaign)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                Donate
              </Button>
            </div>
            
            <p className="text-gray-400 mb-4">{campaign.purpose}</p>
            
            <div className="space-y-2">
              <Progress value={progress} className="h-2 bg-gray-700">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </Progress>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-500">{Math.round(progress)}% Funded</span>
                <span className="text-gray-400">{campaign.daysLeft} days left</span>
              </div>
            </div>
          </Card>
        );
      })}

      <DonateModal
        open={!!selectedCampaign}
        onOpenChange={() => setSelectedCampaign(null)}
        request={selectedCampaign}
      />
    </div>
  );
}