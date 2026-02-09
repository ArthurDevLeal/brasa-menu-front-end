"use client";
import { FolderOpen, Settings, UtensilsCrossed } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";

export default function FastActionsButtons() {
  const { id } = useParams();
  const router = useRouter();
  const handleNavigate = (path: string) => {
    router.push(`/dashboard/${id}/${path}`);
  };
  return (
    <div className="grid gap-4 grid-cols-3 mt-4">
      <Card
        onClick={() => handleNavigate("/categorias")}
        className="cursor-pointer hover:bg-accent-foreground/10 hover:border-accent-foreground/50 transition-colors"
      >
        <CardContent className="flex items-center gap-4 ">
          <div className="rounded-lg bg-green-400/20 p-3">
            <FolderOpen className="h-6 w-6 text-green-200" />
          </div>
          <div>
            <p className="font-medium">Categoria</p>
            <p className="text-sm text-muted-foreground">Criar uma nova categoria</p>
          </div>
        </CardContent>
      </Card>
      <Card
        onClick={() => handleNavigate("/cardapio")}
        className="cursor-pointer hover:bg-accent-foreground/10 hover:border-accent-foreground/50 transition-colors"
      >
        <CardContent className="flex items-center gap-4 ">
          <div className="rounded-lg bg-red-400/20 p-3">
            <UtensilsCrossed className="h-6 w-6 text-red-200" />
          </div>
          <div>
            <p className="font-medium">Novo Produto</p>
            <p className="text-sm text-muted-foreground">Adicionar item ao cardápio</p>
          </div>
        </CardContent>
      </Card>
      <Card
        onClick={() => handleNavigate("/settings")}
        className="cursor-pointer hover:bg-accent-foreground/10 hover:border-accent-foreground/50 transition-colors"
      >
        <CardContent className="flex items-center gap-4 ">
          <div className="rounded-lg bg-blue-400/20 p-3">
            <Settings className="h-6 w-6 text-blue-200" />
          </div>
          <div>
            <p className="font-medium">Configurações</p>
            <p className="text-sm text-muted-foreground">Configurar funcionamento</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
