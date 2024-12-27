import Papa from 'papaparse';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  expiryDate: string;
  threshold: number;
  status: 'safe' | 'expiring' | 'expired';
}

export async function parseCSVFile(file: File): Promise<InventoryItem[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const items: InventoryItem[] = results.data.map((row: any, index) => ({
          id: index.toString(),
          name: row.name || '',
          quantity: parseInt(row.quantity) || 0,
          expiryDate: row.expiryDate || '',
          threshold: parseInt(row.threshold) || 7,
          status: calculateStatus(row.expiryDate)
        }));
        resolve(items);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}

function calculateStatus(expiryDate: string): 'safe' | 'expiring' | 'expired' {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry < 0) return 'expired';
  if (daysUntilExpiry <= 7) return 'expiring';
  return 'safe';
}