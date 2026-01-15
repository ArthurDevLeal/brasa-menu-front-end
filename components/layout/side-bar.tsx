"use client";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Settings,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: UtensilsCrossed, label: "Cardápio", href: "/admin/cardapio" },
  { icon: FolderOpen, label: "Categorias", href: "/admin/categorias" },
  { icon: BarChart3, label: "Métricas", href: "/admin/metricas" },
  { icon: Settings, label: "Configurações", href: "/admin/configuracoes" },
];
export default function SideBar() {
  const pathname = usePathname();

  return (
    <aside className="relative h-screen w-64 bg-card border-r border-border row-span-2">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <Store className="h-6 w-6" />
        <span className="font-display text-xl font-bold tracking-tight">BRASA</span>
        <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">Admin</span>
      </div>

      <nav className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent-foreground/10 text-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Voltar ao Site
        </Link>
      </div>
    </aside>
  );
}
