import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DonateModal from './DonateModal';

interface DonationRequest {
  id: string;
  name: string;
  amount: number;
  purpose: string;
  upvotes: number;
  downvotes: number;
}

const mockRequests: DonationRequest[] = [
  {
    id: '1',
    name: 'Local Food Bank',
    amount: 500,
    purpose: 'Emergency food supplies for 100 families',
    upvotes: 124,
    downvotes: 12,
  },
  {
    id: '2',
    name: 'Community Kitchen',
    amount: 750,
    purpose: 'Industrial kitchen equipment for meal prep',
    upvotes: 89,
    downvotes: 8,
  },
];

export default function DonationRequests() {
  const [requests, setRequests] = useState(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<DonationRequest | null>(null);

  const handleVote = (id: string, isUpvote: boolean) => {
    setRequests(prev => prev.map(request => {
      if (request.id === id) {
        return {
          ...request,
          upvotes: isUpvote ? request.upvotes + 1 : request.upvotes,
          downvotes: !isUpvote ? request.downvotes + 1 : request.downvotes,
        };
      }
      return request;
    }));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {requests.map(request => (
        <Card key={request.id} className="bg-black/40 border border-gray-800 p-6 backdrop-blur-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">{request.name}</h3>
              <p className="text-emerald-500 font-semibold">{request.amount} FDC</p>
            </div>
            <Button
              onClick={() => setSelectedRequest(request)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Donate
            </Button>
          </div>
          
          <p className="text-gray-400 mb-6">{request.purpose}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                onClick={() => handleVote(request.id, true)}
                className="flex items-center space-x-2 text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <ThumbsUp className="h-5 w-5" />
                <span>{request.upvotes}</span>
              </button>
              <button
                onClick={() => handleVote(request.id, false)}
                className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <ThumbsDown className="h-5 w-5" />
                <span>{request.downvotes}</span>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Success Rate: {Math.round((request.upvotes / (request.upvotes + request.downvotes)) * 100)}%
            </div>
          </div>
        </Card>
      ))}

      <DonateModal
        open={!!selectedRequest}
        onOpenChange={() => setSelectedRequest(null)}
        request={selectedRequest}
      />
    </div>
  );
}