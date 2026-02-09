"use client";
import { updateRestaurant } from "@/actions/restaurants/restaurant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loadings";
import { Textarea } from "@/components/ui/textarea";
import { Restaurant } from "@/types/restaurant-type";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface RestaurantInfoCardProps {
  restaurant: Restaurant;
  isLoading: boolean;
  formData: {
    name: string;
    slug: string;
    description: string;
    phone: string;
    address: string;
    logoUrl: string;
    bannerUrl: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
}

export function RestaurantInfoCard({
  restaurant,
  isLoading,
  formData,
  onInputChange,
  onSave,
}: RestaurantInfoCardProps) {
  const { id }: { id: string } = useParams();

  const handleSaveGeneral = async () => {
    if (!formData.name.trim()) {
      toast.error("Nome obrigatório", {
        description: "Digite um nome para o restaurante",
      });
      return;
    }

    if (!formData.slug.trim()) {
      toast.error("Slug obrigatório", {
        description: "Digite uma URL para o cardápio",
      });
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Endereço obrigatório", {
        description: "Digite o endereço do restaurante",
      });
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Telefone obrigatório", {
        description: "Digite o telefone do restaurante",
      });
      return;
    }

    try {
      await updateRestaurant({
        id,
        name: formData.name,
        slug: formData.slug,
        address: formData.address,
        phone: formData.phone,
        description: formData.description || undefined,
        logoUrl: formData.logoUrl || undefined,
        bannerUrl: formData.bannerUrl || undefined,
      });

      toast.success("Informações atualizadas com sucesso!");
      onSave();
    } catch (error: any) {
      toast.error("Erro ao salvar", {
        description: error?.message || "Tente novamente.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Restaurante</CardTitle>
        <CardDescription>Dados básicos que aparecem no cardápio digital</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Restaurante</Label>
            <Input
              id="name"
              placeholder="Ex: Brasa Steakhouse"
              value={formData.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL do Cardápio</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-sm text-muted-foreground">
                menu.app/
              </span>
              <Input
                id="slug"
                placeholder="brasa"
                value={formData.slug}
                onChange={(e) => onInputChange("slug", e.target.value)}
                className="rounded-l-none"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            id="description"
            placeholder="Descreva seu restaurante..."
            value={formData.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            rows={3}
            disabled={isLoading}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              type="number"
              value={formData.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              placeholder="Rua Augusta, 1234 - São Paulo"
              value={formData.address}
              onChange={(e) => onInputChange("address", e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <Button onClick={handleSaveGeneral} disabled={isLoading}>
          {!isLoading && "Salvar Informações"}
          {isLoading && <Loading variant="dots" size="sm" className="mr-2" />}
        </Button>
      </CardContent>
    </Card>
  );
}