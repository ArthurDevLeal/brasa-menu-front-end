"use client";

import { getRestaurantCategories } from "@/actions/category/category";
import { recordProductView } from "@/actions/metrics/metrics";
import { getRestaurantProducts } from "@/actions/product/product";
import { getRestaurantBySlug } from "@/actions/restaurants/restaurant";
import ProductModal from "@/components/cardapio/product-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/store/cart-store";
import { Category } from "@/types/category-type";
import { ProductWithRelations } from "@/types/product-type";
import { Restaurant } from "@/types/restaurant-type";
import { ChevronRight, Search, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cardapio() {
  const { slug }: { slug: string } = useParams();
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithRelations[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [sortedCategories, setSortedCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithRelations | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (categories.length > 0) {
      const sorted = [...categories].sort((a, b) => a.orderIndex - b.orderIndex);
      setSortedCategories(sorted);
    }
  }, [categories]);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchQuery, products]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const restaurantReq = await getRestaurantBySlug({ slug });
      const productsReq = await getRestaurantProducts({ restaurantId: restaurantReq.data.id });
      const categoriesReq = await getRestaurantCategories({ restaurantId: restaurantReq.data.id });
      setProducts(productsReq.data);
      setRestaurant(restaurantReq.data);
      setCategories(categoriesReq.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== "Todas") {
      filtered = filtered.filter((p) => p.category?.name === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleProductClick = async (product: ProductWithRelations) => {
    setSelectedProduct(product);

    if (restaurant) {
      try {
        await recordProductView({
          productId: product.id,
          restaurantId: restaurant.id,
        });
      } catch (error) {
        console.error("Error recording product view:", error);
      }
    }
  };

  if (isLoading || !restaurant) {
    return (
      <div className="flex flex-col gap-6 p-6 pb-32">
        <Skeleton className="h-12 w-full rounded-full" />

        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full shrink-0" />
          ))}
        </div>

        <Skeleton className="h-8 w-32" />

        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-border">
              <Skeleton className="w-20 h-20 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-6 p-6 pb-32">
      <div className="relative">
        <Input
          placeholder="Buscar no cardápio..."
          className="w-full h-12 pl-12 pr-4 rounded-full bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-6 px-6">
        <Button
          onClick={() => setSelectedCategory("Todas")}
          variant={selectedCategory === "Todas" ? "default" : "outline"}
          className={`rounded-full shrink-0 font-medium transition-all ${
            selectedCategory === "Todas" ? "shadow-lg shadow-primary/20" : "hover:bg-secondary"
          }`}
        >
          <Sparkles className="w-4 h-4 mr-1.5" />
          Todas
        </Button>
        {sortedCategories.map((category) => {
          const isSelected = selectedCategory === category.name;

          return (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              variant={isSelected ? "default" : "outline"}
              className={`rounded-full shrink-0 font-medium transition-all ${
                isSelected ? "shadow-lg shadow-primary/20" : "hover:bg-secondary"
              }`}
            >
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Lista de produtos */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl text-foreground">{selectedCategory}</h2>
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "itens"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group rounded-2xl"
              onClick={() => handleProductClick(product)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="flex items-center p-3 gap-4">
                <div className="relative shrink-0">
                  <img
                    src={product.imageUrl || ""}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-secondary group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="font-bold text-primary mt-2 text-lg">R$ {product.price.toFixed(2)}</p>
                </div>
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ChevronRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground text-sm mt-1">Tente buscar por outro termo ou categoria</p>
          </div>
        )}
      </div>

      <ProductModal
        restaurantId={restaurant.id}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </main>
  );
}
