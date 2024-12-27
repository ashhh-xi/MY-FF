import React from 'react';
import { Utensils, Bell, Package } from 'lucide-react';

interface ImpactSummaryProps {
  flaggedItems: number;
  scheduledDonations: number;
  mealsProvided: number;
}

export function ImpactSummary({
  flaggedItems,
  scheduledDonations,
  mealsProvided,
}: ImpactSummaryProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center">
          <Bell className="mr-3 h-6 w-6 text-yellow-500" />
          <h3 className="text-lg font-medium">Flagged Items</h3>
        </div>
        <p className="mt-4 text-3xl font-bold text-green-500">{flaggedItems}</p>
      </div>
      
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center">
          <Package className="mr-3 h-6 w-6 text-green-500" />
          <h3 className="text-lg font-medium">Scheduled Donations</h3>
        </div>
        <p className="mt-4 text-3xl font-bold text-green-500">{scheduledDonations}</p>
      </div>
      
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center">
          <Utensils className="mr-3 h-6 w-6 text-green-500" />
          <h3 className="text-lg font-medium">Meals Provided</h3>
        </div>
        <p className="mt-4 text-3xl font-bold text-green-500">{mealsProvided}</p>
      </div>
    </div>
  );
}