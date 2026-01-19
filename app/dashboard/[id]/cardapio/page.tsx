"use client";
import { getRestaurantCategories } from "@/actions/category/category";
import { getRestaurantProducts } from "@/actions/product/product";
import CardapioHeader from "@/components/dashobard/cardapio/header";
import TableComp from "@/components/dashobard/cardapio/table";
import { Layout } from "@/components/layout";
import { Loading } from "@/components/ui/loadings";
import { Category } from "@/types/category-type";
import { ProductWithRelations } from "@/types/product-type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CardapioPage() {
  const { id }: { id: string } = useParams();
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const productsReq = await getRestaurantProducts({ restaurantId: id });
      const categoriesReq = await getRestaurantCategories({ restaurantId: id });
      setProducts(productsReq.data);
      setCategories(categoriesReq.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || product.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout.Root title="Cardápio" subtitle="Gerencie os produtos do seu restaurante">
      <CardapioHeader
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchData={fetchData}
      />
      <div className="rounded-xl border border-border bg-card mt-4">
        {isLoading && (
          <div className="w-full h-124 flex items-center justify-center gap-3">
            <Loading variant="bars" size="sm" />
            <span className="text-cream/70 text-sm">Buscando dados...</span>
          </div>
        )}
        {!isLoading && <TableComp filteredProducts={filteredProducts} />}
      </div>
    </Layout.Root>
  );
}
