export interface MarketplaceItem {
  item_id: number;
  item_name: string;
  description: string;
  price_in_fdc: number;
  stock_quantity: number;
  seller: string;
  category: string;
  image_url: string;
}

export interface MarketplaceResponse {
  success: boolean;
  data: MarketplaceItem[];
}