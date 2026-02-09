import { getProductById } from "@/actions/product/product";
import { TopProductByViews } from "@/types/metrics-type";
import { Product } from "@/types/product-type";
import { UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

interface RecentProductCardProps {
  product: TopProductByViews;
}
export default function RecentProductCard({ product }: RecentProductCardProps) {
  
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
          <UtensilsCrossed className="h-5 w-5 text-ember" />
        </div>
        <div>
          <p className="font-medium">{product.product.name}</p>
          <p className="text-sm text-muted-foreground">{product.views} visualizações</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium">{product.conversionRate}%</p>
          <p className="text-xs text-muted-foreground">conversões</p>
        </div>
        <Badge
          variant={product.product.isAvailable ? "default" : "secondary"}
          className={product.product.isAvailable ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""}
        >
          {product.product.isAvailable ? "Ativo" : "Inativo"}
        </Badge>
      </div>
    </div>
  );
}
