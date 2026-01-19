"use client";
import { createRestaurant } from "@/actions/restaurants/restaurant";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loadings";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CreateRestaurantCardProps {
  handleFetchRestaurants: () => Promise<void>;
}

export default function CreateRestaurantCard({ handleFetchRestaurants }: CreateRestaurantCardProps) {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    address: "",
    phone: "",
    description: "",
  });

  const validateForm = (): boolean => {
    if (!newRestaurant.name.trim()) {
      toast.error("Nome do restaurante é obrigatório", {
        description: "Digite um nome válido com pelo menos 2 caracteres",
      });
      return false;
    }

    if (newRestaurant.name.trim().length < 2) {
      toast.error("Nome inválido", {
        description: "O nome do restaurante deve ter pelo menos 2 caracteres",
      });
      return false;
    }

    if (!newRestaurant.address.trim()) {
      toast.error("Endereço é obrigatório", {
        description: "Digite o endereço do seu restaurante",
      });
      return false;
    }

    if (newRestaurant.address.trim().length < 5) {
      toast.error("Endereço inválido", {
        description: "O endereço deve ter pelo menos 5 caracteres",
      });
      return false;
    }

    if (!newRestaurant.phone.trim()) {
      toast.error("Telefone é obrigatório", {
        description: "Digite um número de telefone válido",
      });
      return false;
    }

    if (newRestaurant.phone.trim().length < 10) {
      toast.error("Telefone inválido", {
        description: "O telefone deve ter pelo menos 10 dígitos",
      });
      return false;
    }

    return true;
  };

  const handleCreateRestaurant = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const restaurantReq = await createRestaurant({
        name: newRestaurant.name.trim(),
        address: newRestaurant.address.trim(),
        phone: newRestaurant.phone.trim(),
        slug: newRestaurant.name.toLowerCase().trim().replace(/\s+/g, "-"),
        description: newRestaurant.description?.trim() || undefined,
      });

      if (!restaurantReq?.data?.id) {
        toast.error("Erro ao criar restaurante", {
          description: "Ocorreu um erro ao criar seu restaurante. Tente novamente.",
        });
        return;
      }

      toast.success("Restaurante criado com sucesso", {
        description: `${restaurantReq.data.name} foi adicionado à sua lista de restaurantes`,
      });

      setShowNewDialog(false);
      setNewRestaurant({ name: "", address: "", phone: "", description: "" });
      await handleFetchRestaurants();
    } catch (error: any) {
      const errorMessage = error?.message || "Erro desconhecido ao criar restaurante";
      toast.error("Falha ao criar restaurante", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setShowNewDialog(open);
    if (!open) {
      setNewRestaurant({ name: "", address: "", phone: "", description: "" });
    }
  };

  return (
    <>
      <Card
        onClick={() => setShowNewDialog(true)}
        className="cursor-pointer border-dashed border-2 hover:border-primary/50 bg-transparent hover:bg-primary/10 transition-all duration-200"
      >
        <CardContent className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
            <Plus className="w-7 h-7 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-lg text-muted-foreground">
              Adicionar Restaurante
            </h3>
            <p className="text-sm text-muted-foreground/70">Crie um novo restaurante para gerenciar</p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showNewDialog} onOpenChange={handleOpenChange}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Novo Restaurante</DialogTitle>
            <DialogDescription>Preencha as informações do seu restaurante</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Restaurante *</Label>
              <Input
                id="name"
                placeholder="Ex: Brasa Steakhouse"
                value={newRestaurant.name}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço *</Label>
              <Input
                id="address"
                placeholder="Ex: Rua Augusta, 1500 - São Paulo, SP"
                value={newRestaurant.address}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                placeholder="Ex: (11) 99999-9999"
                value={newRestaurant.phone}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, phone: e.target.value })}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição (opcional)</Label>
              <Textarea
                id="description"
                placeholder="Ex: Restaurante de carnes premium com ambiente aconchegante"
                value={newRestaurant.description}
                onChange={(e) => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
                rows={3}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button 
              variant="ghost" 
              onClick={() => setShowNewDialog(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateRestaurant}
              disabled={isLoading || !newRestaurant.name.trim() || !newRestaurant.address.trim() || !newRestaurant.phone.trim()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {!isLoading && "Criar Restaurante"}
              {isLoading && <Loading size="sm"/>}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}