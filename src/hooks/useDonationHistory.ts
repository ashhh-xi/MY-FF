import { useState, useEffect } from 'react';

interface Donation {
  id: string;
  recipient: string;
  amount: number;
  date: string;
  status: 'fully_funded' | 'partially_funded';
}

export function useDonationHistory() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Fetch donation history from API
    // This is mock data for demonstration
    setDonations([
      {
        id: '1',
        recipient: 'Local Food Bank',
        amount: 5000,
        date: '2024-03-15',
        status: 'fully_funded',
      },
      {
        id: '2',
        recipient: 'Community Kitchen',
        amount: 2500,
        date: '2024-03-14',
        status: 'partially_funded',
      },
    ]);
  }, []);

  return { donations };
}