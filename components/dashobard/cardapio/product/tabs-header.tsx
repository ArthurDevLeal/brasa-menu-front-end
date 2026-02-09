import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, ProductWithRelations } from "@/types/product-type";
import { CirclePlus, Layers, Package } from "lucide-react";
interface TabsHeaderProps {
  product: ProductWithRelations;
}
export default function TabsHeader({ product }: TabsHeaderProps) {
  return (
    <TabsList className="bg-muted/50">
      <TabsTrigger value="geral" className="gap-2">
        <Package className="h-4 w-4" />
        Informações
      </TabsTrigger>
      <TabsTrigger value="variantes" className="gap-2">
        <Layers className="h-4 w-4" />
        Variantes
        {product.variantCategories.length >0 && (
          <Badge variant="secondary" className="ml-1">
            {product.variantCategories.length}
          </Badge>
        )}
      </TabsTrigger>
      <TabsTrigger value="adicionais" className="gap-2">
        <CirclePlus className="h-4 w-4" />
        Adicionais
        {product.addOnCategories.length >0 && (
          <Badge variant="secondary" className="ml-1">
            {product.addOnCategories.length}
          </Badge>
        )}
      </TabsTrigger>
    </TabsList>
  );
}
