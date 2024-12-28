"use client";

import { useEffect, useState } from "react";
import { ProductGrid } from "../../../../components/manual-ui/marketplace/product-grid";
import { MarketplaceHeader } from "../../../../components/manual-ui/marketplace/marketplace-header";
import { useToast } from "@/hooks/use-toast";
import {
  MarketplaceItem,
  MarketplaceResponse,
} from "../../../../../types/marketplace";

export default function Marketplace() {
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMarketplaceItems = async () => {
      try {
        const response = await fetch(
          "http://localhost:5500/api/v1/mp/marketplace"
        );

        const data: MarketplaceResponse = await response.json();
        console.log(data);
        if (data.success) {
          setItems(data.data);
        } else {
          throw new Error("Failed to fetch marketplace items");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description:
            "Failed to load marketplace items. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplaceItems();
  }, [toast]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.1),transparent_50%)]">
      <div className="container mx-auto px-4 py-8">
        <MarketplaceHeader />
        <ProductGrid items={items} isLoading={loading} />
      </div>
    </div>
  );
}
