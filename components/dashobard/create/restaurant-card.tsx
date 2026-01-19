"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Store } from "lucide-react";
import { useRouter } from "next/navigation";

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    address: string;
  };
}
export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter()
  return (
    <Card onClick={()=>router.push(`/dashboard/${restaurant.id}/admin`)} key={restaurant.id} className="group cursor-pointer hover:bg-muted transition-all duration-200">
      <CardContent className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
          <Store className="w-7 h-7 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{restaurant.address}</span>
          </div>
        </div>

        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </CardContent>
    </Card>
  );
}
