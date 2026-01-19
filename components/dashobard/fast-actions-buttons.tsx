import { Clock, DollarSign, UtensilsCrossed } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function FastActionsButtons() {
  return (
    <div className="grid gap-4 grid-cols-3 mt-4">
      <Card className="cursor-pointer hover:bg-accent-foreground/10 hover:border-accent-foreground/50 transition-colors">
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
      <Card className="cursor-pointer hover:bg-accent-foreground/10 hover:border-accent-foreground/50 transition-colors">
        <CardContent className="flex items-center gap-4 ">
          <div className="rounded-lg bg-blue-400/20 p-3">
            <Clock className="h-6 w-6 text-blue-200" />
          </div>
          <div>
            <p className="font-medium">Horários</p>
            <p className="text-sm text-muted-foreground">Configurar funcionamento</p>
          </div>
        </CardContent>
      </Card>
      <Card className="cursor-pointer hover:bg-accent-foreground/10 hover:border-accent-foreground/50 transition-colors">
        <CardContent className="flex items-center gap-4 ">
          <div className="rounded-lg bg-green-400/20 p-3">
            <DollarSign className="h-6 w-6 text-green-200" />
          </div>
          <div>
            <p className="font-medium">Preços</p>
            <p className="text-sm text-muted-foreground">Atualização em massa</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
