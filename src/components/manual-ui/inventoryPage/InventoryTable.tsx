import React from 'react';
import { Edit, Trash2, Calendar } from 'lucide-react';
import { Button } from './Button';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  expiryDate: string;
  threshold: number;
  status: 'safe' | 'expiring' | 'expired';
}

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSchedule: (id: string) => void;
}

export function InventoryTable({ items, onEdit, onDelete, onSchedule }: InventoryTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-zinc-900';
      case 'expiring':
        return 'bg-yellow-900/20';
      case 'expired':
        return 'bg-red-900/20';
      default:
        return 'bg-zinc-900';
    }
  };

  return (
    <div className="relative overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-900 text-xs uppercase text-zinc-400">
          <tr>
            <th className="px-6 py-3">Product Name</th>
            <th className="px-6 py-3">Quantity</th>
            <th className="px-6 py-3">Expiry Date</th>
            <th className="px-6 py-3">Threshold (Days)</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.id}
              className={`${getStatusColor(item.status)} border-b border-zinc-800`}
            >
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="px-6 py-4">{item.expiryDate}</td>
              <td className="px-6 py-4">{item.threshold}</td>
              <td className="px-6 py-4 capitalize">{item.status}</td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEdit(item.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onSchedule(item.id)}
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}