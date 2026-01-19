"use client";
import { updateRestaurant } from "@/actions/restaurants/restaurant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loadings";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Restaurant } from "@/types/restaurant-type";
import { Image, Upload } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface GeneralSettingsProps {
  restaurant: Restaurant;
  onSave: () => void;
}

export default function GeneralSettings({ restaurant, onSave }: GeneralSettingsProps) {
  const { id }: { id: string } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    phone: "",
    address: "",
    logoUrl: "",
    bannerUrl: "",
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({
        name: restaurant.name || "",
        slug: restaurant.slug || "",
        description: restaurant.description || "",
        phone: restaurant.phone || "",
        address: restaurant.address || "",
        logoUrl: restaurant.logoUrl || "",
        bannerUrl: restaurant.bannerUrl || "",
      });
    }
  }, [restaurant]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TabsContent value="geral" className="space-y-6">
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
                onChange={(e) => handleInputChange("name", e.target.value)}
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
                  onChange={(e) => handleInputChange("slug", e.target.value)}
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
              onChange={(e) => handleInputChange("description", e.target.value)}
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
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Rua Augusta, 1234 - São Paulo"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
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

      <Card>
        <CardHeader>
          <CardTitle>Imagens</CardTitle>
          <CardDescription>Logo e banner do restaurante</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  {formData.logoUrl ? (
                    <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <Image className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <Button variant="outline" disabled={isLoading}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Banner</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-32 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  {formData.bannerUrl ? (
                    <img src={formData.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                  ) : (
                    <Image className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <Button variant="outline" disabled={isLoading}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
