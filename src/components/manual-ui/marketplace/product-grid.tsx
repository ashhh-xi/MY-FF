"use client";

import { ProductCard } from "./product-card";
import { ProductSkeleton } from "./product-skeleton";
// import { MarketplaceItem } from "@/types/marketplace";
import { MarketplaceItem } from "../../../../types/marketplace";

interface ProductGridProps {
  items: MarketplaceItem[];
  isLoading: boolean;
}

export function ProductGrid({ items, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ProductCard key={item.item_id} product={item} />
      ))}
    </div>
  );
}
