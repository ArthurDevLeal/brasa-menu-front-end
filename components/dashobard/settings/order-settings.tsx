import { updateRestaurantSettings } from "@/actions/settings/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loadings";
import { TabsContent } from "@/components/ui/tabs";
import { RestaurantSettings } from "@/types/settings-type";
import { useState } from "react";
import { toast } from "sonner";

interface orderSettingsProps {
  settings: RestaurantSettings;
  onSave: () => void;
}
export default function OrderSettings({ settings, onSave }: orderSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    tax: settings.taxPercentage.toString() || "",
    minimumPrice: settings.minOrderAmount.toString() || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveGeneral = async () => {
    if (!formData.tax.trim()) {
      toast.error("Taxa obrigatória", {
        description: "Digite uma taxa para o restaurante",
      });
      return;
    }

    if (!formData.minimumPrice.trim()) {
      toast.error("Preço minimo obrigatório", {
        description: "Digite um preço minimo para o cardápio",
      });
      return;
    }

    setIsLoading(true);

    try {
      await updateRestaurantSettings({
        restaurantId: settings.restaurantId,
        taxPercentage: parseInt(formData.tax),
        minOrderAmount: parseInt(formData.minimumPrice),
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
    <TabsContent value="pedidos" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Pedidos</CardTitle>
          <CardDescription>Taxas e valores mínimos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tax">Taxa de Serviço (%)</Label>
              <Input
                value={formData.tax}
                onChange={(e) => handleInputChange("tax", e.target.value)}
                id="tax"
                type="number"
                step="0.1"
                defaultValue="10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minOrder">Pedido Mínimo (R$)</Label>
              <Input
                value={formData.minimumPrice}
                onChange={(e) => handleInputChange("minimumPrice", e.target.value)}
                id="minOrder"
                type="number"
                step="0.01"
                defaultValue="0.00"
              />
            </div>
          </div>
          <Button
            onClick={handleSaveGeneral}
            disabled={
              isLoading ||
              (settings.taxPercentage.toString() === formData.tax &&
                settings.minOrderAmount.toString() === formData.minimumPrice)
            }
          >
            {!isLoading && "Salvar Informações"}
            {isLoading && <Loading variant="dots" size="sm" className="mr-2" />}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
