"use client";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateDashboardRestaurantsHeader() {
  const router = useRouter();

  return (
    <header className="border-b border-border ">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Store className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-foreground">Meus Restaurantes</h1>
            <p className="text-sm text-muted-foreground">Selecione ou crie um restaurante</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/login")}>
          Sair
        </Button>
      </div>
    </header>
  );
}
