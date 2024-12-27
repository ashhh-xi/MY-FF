import { useState, useEffect } from 'react';

interface DonationRequest {
  id: string;
  organization: string;
  amount: number;
  purpose: string;
  upvotes: number;
  downvotes: number;
}

export function useDonationRequests() {
  const [requests, setRequests] = useState<DonationRequest[]>([]);

  useEffect(() => {
    // Fetch requests from API
    // This is mock data for demonstration
    setRequests([
      {
        id: '1',
        organization: 'Local Food Bank',
        amount: 5000,
        purpose: 'Weekly food distribution for 100 families',
        upvotes: 45,
        downvotes: 5,
      },
      {
        id: '2',
        organization: 'Community Kitchen',
        amount: 2500,
        purpose: 'Kitchen equipment upgrade',
        upvotes: 30,
        downvotes: 8,
      },
    ]);
  }, []);

  const handleVote = async (requestId: string, voteType: 'up' | 'down') => {
    // Implement voting logic with API
    console.log(`Voted ${voteType} for request ${requestId}`);
  };

  return { requests, handleVote };
}