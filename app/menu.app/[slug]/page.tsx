"use client";
import { getRestaurantCategories } from "@/actions/category/category";
import { recordProductView } from "@/actions/metrics/metrics";
import { getRestaurantProducts } from "@/actions/product/product";
import { getRestaurantBySlug } from "@/actions/restaurants/restaurant";
import ProductModal from "@/components/cardapio/product-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loadings";
import { useCartStore } from "@/store/cart-store";
import { Category } from "@/types/category-type";
import { ProductWithRelations } from "@/types/product-type";
import { Restaurant } from "@/types/restaurant-type";
import { ArrowUpRight, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const styles = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

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
          p.description?.toLowerCase().includes(searchQuery.toLowerCase()),
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
      <div className="w-full h-124 flex flex-col items-center justify-center gap-3">
        <Loading variant="dots" size="sm" />
        <span className="text-cream/70 text-sm">Carregando cardapio...</span>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4 p-6 pb-32">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="O que você procura?"
            className="w-full pl-12 py-6 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer" />
        </div>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar pb-2">
        <Button
          onClick={() => setSelectedCategory("Todas")}
          variant={selectedCategory === "Todas" ? "default" : "outline"}
        >
          Todas
        </Button>
        {sortedCategories.map((category) => {
          const isSelected = selectedCategory === category.name;

          return (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              variant={isSelected ? "default" : "outline"}
            >
              {category.name}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-semibold text-2xl">{selectedCategory}</p>

        <div className="grid grid-cols-1 gap-3">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-md transition-shadow p-2 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <CardContent className="flex items-center px-2">
                <img
                  src={product.imageUrl || ""}
                  alt={product.name}
                  className="size-16 rounded-full bg-primary flex items-center justify-center text-3xl shrink-0 object-cover"
                />
                <div className="flex-1 min-w-0 ml-4">
                  <p className="font-semibold text-base">{product.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <p className="font-bold text-primary mt-2">R$ {product.price.toFixed(2)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 size-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ProductModal
        restaurantId={restaurant.id}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </main>
  );
}
