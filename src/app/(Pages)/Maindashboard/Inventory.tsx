// "use client";
// import React, { useState } from "react";
// import { FileUp, Link } from "lucide-react";
// import { Button } from "../../../components/manual-ui/inventoryPage/Button";
// import { FileUpload } from "../../../components/manual-ui/inventoryPage/FileUpload";
// import { InventoryTable } from "../../../components/manual-ui/inventoryPage/InventoryTable";
// import { ImpactSummary } from "../../../components/manual-ui/inventoryPage/ImpactSummary";

// const mockItems = [
//   {
//     id: "1",
//     name: "Milk",
//     quantity: 50,
//     expiryDate: "2024-03-20",
//     threshold: 1,
//     status: "expiring",
//   },
//   {
//     id: "2",
//     name: "Bread",
//     quantity: 30,
//     expiryDate: "2024-03-19",
//     threshold: 2,
//     status: "expired",
//   },
//   {
//     id: "3",
//     name: "Vegetables",
//     quantity: 100,
//     expiryDate: "2024-03-25",
//     threshold: 3,
//     status: "safe",
//   },
// ] as const;

// export default function Inventory() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileSelect = (file: File) => {
//     setSelectedFile(file);
//     // Here you would typically process the file
//     console.log("Selected file:", file.name);
//   };

//   return (
//     <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-8">
//           <h1 className="mb-4 text-3xl font-bold">Inventory Management</h1>
//           <p className="text-zinc-400">
//             Manage your inventory, set thresholds, and schedule donations all in
//             one place.
//           </p>
//         </div>

//         <div className="mb-8 flex flex-wrap gap-4">
//           <Button size="lg">
//             <FileUp className="mr-2 h-5 w-5" />
//             Add Inventory File
//           </Button>
//           <Button variant="secondary" size="lg">
//             <Link className="mr-2 h-5 w-5" />
//             Connect Your Inventory
//           </Button>
//         </div>

//         <div className="mb-8">
//           <h2 className="mb-4 text-xl font-semibold">Upload Inventory</h2>
//           <FileUpload onFileSelect={handleFileSelect} />
//           {selectedFile && (
//             <p className="mt-2 text-sm text-green-500">
//               File "{selectedFile.name}" ready to be processed
//             </p>
//           )}
//         </div>

//         <div className="mb-8">
//           <h2 className="mb-4 text-xl font-semibold">Current Inventory</h2>
//           <InventoryTable
//             items={[...mockItems]} // Spread creates a mutable copy
//             onEdit={(id) => console.log("Edit", id)}
//             onDelete={(id) => console.log("Delete", id)}
//             onSchedule={(id) => console.log("Schedule", id)}
//           />
//         </div>

//         <div>
//           <h2 className="mb-4 text-xl font-semibold">Impact Summary</h2>
//           <ImpactSummary
//             flaggedItems={5}
//             scheduledDonations={12}
//             mealsProvided={150}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { FileUp, Link } from "lucide-react";
import { Button } from "../../../components/manual-ui/inventoryPage/Button";
import { FileUpload } from "../../../components/manual-ui/inventoryPage/FileUpload";
import { InventoryTable } from "../../../components/manual-ui/inventoryPage/InventoryTable";
import { ImpactSummary } from "../../../components/manual-ui/inventoryPage/ImpactSummary";
import UploadedInventory from "../../../components/manual-ui/inventoryPage/UploadedInventory";
import { parseCSVFile, type InventoryItem } from "@/lib/csvParser";

const mockItems = [
  {
    id: "1",
    name: "Milk",
    quantity: 50,
    expiryDate: "2024-03-20",
    threshold: 1,
    status: "expiring",
  },
  {
    id: "2",
    name: "Bread",
    quantity: 30,
    expiryDate: "2024-03-19",
    threshold: 2,
    status: "expired",
  },
  {
    id: "3",
    name: "Vegetables",
    quantity: 100,
    expiryDate: "2024-03-25",
    threshold: 3,
    status: "safe",
  },
] as unknown as InventoryItem[];

export default function InventoryManagement() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedItems, setUploadedItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsLoading(true);
    setError(null);

    try {
      const items = await parseCSVFile(file);
      setUploadedItems(items);
    } catch (err) {
      setError("Failed to parse CSV file. Please check the file format.");
      console.error("Error parsing CSV:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold">Inventory Management</h1>
          <p className="text-zinc-400">
            Manage your inventory, set thresholds, and schedule donations all in
            one place.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <Button size="lg">
            <FileUp className="mr-2 h-5 w-5" />
            Add Inventory File
          </Button>
          <Button variant="secondary" size="lg">
            <Link className="mr-2 h-5 w-5" />
            Connect Your Inventory
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Upload Inventory</h2>
          <FileUpload onFileSelect={handleFileSelect} />
          {isLoading && (
            <p className="mt-2 text-sm text-zinc-400">Processing file...</p>
          )}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {selectedFile && !isLoading && !error && (
            <p className="mt-2 text-sm text-green-500">
              File "{selectedFile.name}" processed successfully
            </p>
          )}
        </div>

        {uploadedItems.length > 0 && (
          <UploadedInventory items={uploadedItems} />
        )}

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Current Inventory</h2>
          <InventoryTable
            items={Array.from(mockItems)} // Create a mutable copy
            onEdit={(id) => console.log("Edit", id)}
            onDelete={(id) => console.log("Delete", id)}
            onSchedule={(id) => console.log("Schedule", id)}
          />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Impact Summary</h2>
          <ImpactSummary
            flaggedItems={5}
            scheduledDonations={12}
            mealsProvided={150}
          />
        </div>
      </div>
    </div>
  );
}
