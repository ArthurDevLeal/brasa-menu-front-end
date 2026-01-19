"use client";
import { getRestaurantById } from "@/actions/restaurants/restaurant";
import { cn } from "@/lib/utils";
import { useTokenStore } from "@/store/token-store";
import { useUserStore } from "@/store/user-store";
import { Restaurant } from "@/types/restaurant-type";
import { motion } from "framer-motion";
import { FolderOpen, LayoutDashboard, LogOut, Settings, Store, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "admin" },
  { icon: UtensilsCrossed, label: "Cardápio", href: "cardapio" },
  { icon: FolderOpen, label: "Categorias", href: "categorias" },
  { icon: Settings, label: "Configurações", href: "settings" },
];

export default function SideBar() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { user, updateRestaurantName, removeUser } = useUserStore();
  const { removeToken } = useTokenStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !id) return;

    const fetchRestaurant = async () => {
      try {
        const restaurantReq = await getRestaurantById({ id: id as string });
        if (restaurantReq?.data) {
          setRestaurant(restaurantReq.data);
          if (user && user.userRestaurantName !== restaurantReq.data.name) {
            updateRestaurantName(restaurantReq.data.name);
          }
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [id, isHydrated, user, updateRestaurantName]);

  const handleLogout = () => {
    removeUser();
    removeToken();
    router.push("/dashboard/login");
  };

  const restaurantName = isHydrated ? user?.userRestaurantName || restaurant?.name || "" : "";
  const pathname = usePathname();

  return (
    <aside className="relative h-screen w-64 bg-card border-r border-border row-span-2">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <Store className="h-6 w-6 text-primary" />
        <span className="font-display text-xl font-bold tracking-tight text-primary truncate">
          {restaurantName}
        </span>
        <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded whitespace-nowrap">
          Admin
        </span>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.endsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav-bg"
                  className="absolute inset-0 rounded-lg bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon className="relative h-4 w-4 z-10" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4 space-y-2">
        <Link
          href="/dashboard/login"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Voltar ao Site
        </Link>
      </div>
    </aside>
  );
}
