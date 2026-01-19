"use client";
import { getRestaurantById } from "@/actions/restaurants/restaurant";
import { getRestaurantSettings } from "@/actions/settings/settings";
import AppearenceSettings from "@/components/dashobard/settings/appearence";
import GeneralSettings from "@/components/dashobard/settings/general";
import HoursSettings from "@/components/dashobard/settings/hours";
import OrderSettings from "@/components/dashobard/settings/order-settings";
import { Layout } from "@/components/layout";
import { Loading } from "@/components/ui/loadings";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Restaurant } from "@/types/restaurant-type";
import { RestaurantSettings } from "@/types/settings-type";
import { Clock, DollarSign, Palette, Store } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const openingHours = [
  { day: 0, opensAt: "11:00", closesAt: "23:00", isOpen: false },
  { day: 1, opensAt: "11:00", closesAt: "23:00", isOpen: true },
  { day: 2, opensAt: "11:00", closesAt: "23:00", isOpen: true },
  { day: 3, opensAt: "11:00", closesAt: "23:00", isOpen: true },
  { day: 4, opensAt: "11:00", closesAt: "23:00", isOpen: true },
  { day: 5, opensAt: "11:00", closesAt: "00:00", isOpen: true },
  { day: 6, opensAt: "11:00", closesAt: "00:00", isOpen: true },
];

export default function SettingsPage() {
  const { id }: { id: string } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const restaurantReq = await getRestaurantById({ id });
      const settingsReq = await getRestaurantSettings({ restaurantId: id });
      setRestaurant(restaurantReq.data);
      setSettings(settingsReq.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Erro ao carregar configurações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSuccess = async () => {
    await fetchData();
  };

  if (!restaurant || !settings) {
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
    <Layout.Root title="Configurações" subtitle="Personalize seu restaurante">
      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="geral" className="gap-2">
            <Store className="h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="horarios" className="gap-2">
            <Clock className="h-4 w-4" />
            Horários
          </TabsTrigger>
          <TabsTrigger value="pedidos" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Pedidos
          </TabsTrigger>
          <TabsTrigger value="aparencia" className="gap-2">
            <Palette className="h-4 w-4" />
            Aparência
          </TabsTrigger>
        </TabsList>
        <GeneralSettings restaurant={restaurant} onSave={handleSaveSuccess} />
        <HoursSettings openingHours={openingHours} settings={settings} />
        <OrderSettings settings={settings} onSave={handleSaveSuccess} />
        <AppearenceSettings settings={settings} onSave={handleSaveSuccess}/>
      </Tabs>
    </Layout.Root>
  );
}
