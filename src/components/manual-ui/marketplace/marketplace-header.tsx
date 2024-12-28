"use client";

import { Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MarketplaceHeader() {
  return (
    <div className="mb-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          <span className="text-primary">Web3</span> Marketplace
        </h1>
        <Button 
          variant="outline" 
          size="icon"
          className="border-primary text-primary hover:bg-primary hover:text-black"
        >
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
        <Input
          placeholder="Search products..."
          className="pl-10 bg-muted border-primary/20 focus:border-primary/50 transition-colors"
        />
      </div>
    </div>
  );
}