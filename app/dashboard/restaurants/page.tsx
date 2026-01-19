"use client";
import { getUserRestaurants } from "@/actions/restaurants/restaurant";
import CreateRestaurantCard from "@/components/dashobard/create/create-restaurant-card";
import CreateDashboardRestaurantsHeader from "@/components/dashobard/create/header";
import RestaurantCard from "@/components/dashobard/create/restaurant-card";
import { Loading } from "@/components/ui/loadings";
import { Restaurant } from "@/types/restaurant-type";
import { useEffect, useState } from "react";

export default function CreateDashboardRestaurants() {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    const fetching = async () => {
      await handleGetRestaurants();
      setLoading(false);
    };
    fetching();
  }, []);
  const handleGetRestaurants = async () => {
    try {
      const restaurantReq = await getUserRestaurants();
      if (restaurantReq?.data && restaurantReq.data.length > 0) {
        setRestaurants(restaurantReq.data);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CreateDashboardRestaurantsHeader />

      {loading ? (
        <div className="w-full h-124 flex items-center justify-center gap-3">
          <Loading variant="bars" size="sm" />
          <span className="text-cream/70 text-sm">Buscando dados...</span>
        </div>
      ) : (
        <>
          <main className="flex flex-col items-center justify-center container mx-auto px-6 py-12">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Qual restaurante você quer gerenciar?
              </h2>
              <p className="text-muted-foreground">Escolha um dos seus restaurantes ou adicione um novo</p>
            </div>

            <div className="grid gap-4 mb-8 w-full mt-8 max-w-5xl">
              {restaurants.map((restaurant, index) => (
                <RestaurantCard key={index} restaurant={restaurant} />
              ))}
              <CreateRestaurantCard handleFetchRestaurants={handleGetRestaurants} />
            </div>
          </main>
        </>
      )}
    </div>
  );
}
