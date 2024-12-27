import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Donation {
  id: string;
  recipient: string;
  amount: number;
  date: string;
  status: 'Fully Funded' | 'Partially Funded' | 'In Progress';
}

const mockDonations: Donation[] = [
  {
    id: '1',
    recipient: 'Local Food Bank',
    amount: 500,
    date: '2024-03-15',
    status: 'Fully Funded',
  },
  {
    id: '2',
    recipient: 'Community Kitchen',
    amount: 750,
    date: '2024-03-14',
    status: 'Partially Funded',
  },
  {
    id: '3',
    recipient: 'School Lunch Program',
    amount: 1000,
    date: '2024-03-13',
    status: 'In Progress',
  },
];

export default function DonationHistory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDonations = mockDonations.filter(donation =>
    donation.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fully Funded':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Partially Funded':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <Input
          placeholder="Search donations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-black/40 border-gray-800 text-white placeholder-gray-500"
        />
      </div>

      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 bg-black/40">
              <TableHead className="text-gray-400">Recipient</TableHead>
              <TableHead className="text-gray-400">Amount (FDC)</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonations.map((donation) => (
              <TableRow key={donation.id} className="border-gray-800">
                <TableCell className="font-medium text-white">
                  {donation.recipient}
                </TableCell>
                <TableCell className="text-emerald-500">
                  {donation.amount}
                </TableCell>
                <TableCell className="text-gray-400">
                  {new Date(donation.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(donation.status)}>
                    {donation.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}