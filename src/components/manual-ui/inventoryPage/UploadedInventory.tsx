import React from "react";
import { InventoryItem } from "@/lib/csvParser";
import { InventoryTable } from "./InventoryTable";

interface UploadedInventoryProps {
  items: InventoryItem[];
}

export default function UploadedInventory({ items }: UploadedInventoryProps) {
  const handleEdit = (id: string) => {
    console.log("Edit item:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete item:", id);
  };

  const handleSchedule = (id: string) => {
    console.log("Schedule donation:", id);
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">Uploaded Inventory</h2>
      <InventoryTable
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSchedule={handleSchedule}
      />
    </div>
  );
}
