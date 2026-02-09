"use client";
import { getRestaurantCategories } from "@/actions/category/category";
import { getProductById } from "@/actions/product/product";
import { getRestaurantById } from "@/actions/restaurants/restaurant";
import AddOnTab from "@/components/dashobard/cardapio/product/addon-tab";
import GeneralTab from "@/components/dashobard/cardapio/product/general-tab";
import VariantTab from "@/components/dashobard/cardapio/product/variant-tab";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loadings";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/types/category-type";
import { ProductWithRelations } from "@/types/product-type";
import { Restaurant } from "@/types/restaurant-type";
import { Tabs } from "@radix-ui/react-tabs";
import { ArrowLeft, Box, CirclePlus, Layers } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const router = useRouter();
  const { id, productId }: { id: string; productId: string } = useParams();
  const [product, setProduct] = useState<ProductWithRelations>();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const productReq = await getProductById({ productId });
      const restaurantReq = await getRestaurantById({ id });
      const categoriesReq = await getRestaurantCategories({ restaurantId: id });

      setProduct(productReq.data);
      setRestaurant(restaurantReq.data);
      setCategories(categoriesReq.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBackToMenu = () => {
    router.push(`/dashboard/${id}/cardapio`);
  };

  if (!restaurant || !product || !categories) {
    return (
      <Layout.Root title="Configurações" subtitle="Personalize seu restaurante">
        <div className="w-full h-124 flex items-center justify-center gap-3">
          <Loading variant="bars" size="sm" />
          <span className="text-muted-foreground text-sm">Buscando dados...</span>
        </div>
      </Layout.Root>
    );
  }

  return (
    <Layout.Root title="Editar Produto" subtitle={product.name}>
      <Tabs defaultValue="geral" className="space-y-6">
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" onClick={handleBackToMenu} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao cardápio
          </Button>
          <TabsList className="bg-muted/50">
            <TabsTrigger value="geral" className="gap-2">
              <Box className="h-4 w-4" />
              Informações
            </TabsTrigger>
            <TabsTrigger value="variantes" className="gap-2">
              <Layers className="h-4 w-4" />
              Variantes
              {product.variantCategories?.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {product.variantCategories.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pedidos" className="gap-2">
              <CirclePlus className="h-4 w-4" />
              Adicionais
              {product.addOnCategories?.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {product.addOnCategories.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        <GeneralTab categories={categories} productOriginal={product} saveData={fetchData} />
        <VariantTab product={product} onSave={fetchData} />
        <AddOnTab product={product} onSave={fetchData} />
      </Tabs>
    </Layout.Root>
  );
}
