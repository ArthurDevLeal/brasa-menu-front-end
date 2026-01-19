"use client";
import { getRestaurantCategoriesWithProductCount } from "@/actions/category/category";
import { getRestaurantMetricsOverview, getTopProductsByAddedToCart } from "@/actions/metrics/metrics";
import { getRestaurantById } from "@/actions/restaurants/restaurant";
import FastActionsButtons from "@/components/dashobard/fast-actions-buttons";
import ProductsPeformace from "@/components/dashobard/products-peformace";
import TopCategory from "@/components/dashobard/top-category";
import { Layout } from "@/components/layout";
import { Loading } from "@/components/ui/loadings";
import { StatCard } from "@/components/ui/stats-card";
import { CategoryWithProductCount } from "@/types/category-type";
import { MetricsOverview, TopProductByViews } from "@/types/metrics-type";
import { Restaurant } from "@/types/restaurant-type";
import { Eye, ShoppingCart, TrendingUp, UtensilsCrossed } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [metric, setMetric] = useState<MetricsOverview>();
  const [products, setProducts] = useState<TopProductByViews[]>([]);
  const [categories, setCategories] = useState<CategoryWithProductCount[]>([]);
  const { id }: { id: string } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const restaurantReq = await getRestaurantById({ id: id });
      const metricsReq = await getRestaurantMetricsOverview({ restaurantId: id });
      const restaurantProductsReq = await getTopProductsByAddedToCart({ restaurantId: id });
      const categoriesReq = await getRestaurantCategoriesWithProductCount({ restaurantId: id });
      setRestaurant(restaurantReq.data);
      setProducts(restaurantProductsReq.data);
      setMetric(metricsReq.data);
      setCategories(categoriesReq.data);
    };
    fetchData();
  }, []);

  if (!restaurant || !metric) {
    return (
      <Layout.Root title="Dashboard" subtitle="Visão geral do seu restaurante">
        <div className="w-full h-124 flex items-center justify-center gap-3">
          <Loading variant="bars" size="sm" />
          <span className="text-cream/70 text-sm">Buscando dados...</span>
        </div>
      </Layout.Root>
    );
  }
  return (
    <Layout.Root title="Dashboard" subtitle="Visão geral do seu restaurante">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Visualizações" value={metric?.totalViews.toString()} icon={Eye} />
        <StatCard
          title="Adicionados ao Carrinho"
          value={metric?.totalAddedToCart.toString()}
          icon={ShoppingCart}
        />
        <StatCard
          title="Taxa de Conversão"
          value={metric?.averageConversionRate.toString()}
          icon={TrendingUp}
        />
        <StatCard title="Produtos Ativos" value={metric?.totalProducts.toString()} icon={UtensilsCrossed} />
      </div>

      <div className="grid gap-4 grid-cols-4 mt-4">
        <ProductsPeformace products={products} />
        <TopCategory categories={categories} />
      </div>

      <FastActionsButtons />
    </Layout.Root>
  );
}
