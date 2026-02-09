"use client";
import { getRestaurantCategoriesWithProductCount } from "@/actions/category/category";
import Cartegories from "@/components/dashobard/categories/categories";
import CategoriesHeader from "@/components/dashobard/categories/header";
import { Layout } from "@/components/layout";
import { Loading } from "@/components/ui/loadings";
import { CategoryWithProductCount } from "@/types/category-type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const { id }: { id: string } = useParams();

  const [categories, setCategories] = useState<CategoryWithProductCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const categoriesReq = await getRestaurantCategoriesWithProductCount({ restaurantId: id });
      setCategories(categoriesReq.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Layout.Root title="Categorias" subtitle="Organize as categorias do seu cardápio">
      <CategoriesHeader fetchData={fetchData} categoryLength={categories.length} />
      <>
        {isLoading && (
          <div className="w-full h-124 flex items-center justify-center gap-3">
            <Loading variant="bars" size="sm" />
            <span className="text-cream/70 text-sm">Buscando dados...</span>
          </div>
        )}
        {!isLoading && <Cartegories categories={categories} fetchData={fetchData}/>}
      </>
    </Layout.Root>
  );
}
