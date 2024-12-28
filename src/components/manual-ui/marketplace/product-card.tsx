"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { MarketplaceItem } from "../../../../types/marketplace";
import { formatGoogleDriveUrl } from "@/lib/marketplace";

interface ProductCardProps {
  product: MarketplaceItem;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-[0_0_15px_rgba(74,222,128,0.2)] border-border/50">
      <CardHeader className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={formatGoogleDriveUrl(product.image_url)}
            alt={product.item_name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <Badge className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm border-primary text-primary">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">
            {product.item_name}
          </h3>
          <Badge
            variant="outline"
            className="gap-1 border-primary/50 text-primary"
          >
            <Package2 className="h-3 w-3" />
            {product.stock_quantity}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">
              {product.price_in_fdc} FDC
            </p>
            <p className="text-xs text-muted-foreground">by {product.seller}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Button
          className="w-full gap-2 bg-primary hover:bg-primary/90 text-black font-semibold"
          disabled={product.stock_quantity === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button
          className="w-full gap-2 bg-primary hover:bg-primary/90 text-black font-semibold"
          disabled={product.stock_quantity === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock_quantity === 0 ? "Out of Stock" : "Buy Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
