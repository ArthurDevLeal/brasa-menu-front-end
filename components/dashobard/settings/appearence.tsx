import { updateRestaurantSettings } from "@/actions/settings/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loadings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { RestaurantSettings } from "@/types/settings-type";
import { useState } from "react";
import { toast } from "sonner";

interface appearenceSettingsProps {
  settings: RestaurantSettings;
  onSave: () => void;
}
export default function AppearenceSettings({ settings, onSave }: appearenceSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    layout: settings.layoutType,
    priceShown: settings.showPrice,
    showImages: settings.showImage,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveGeneral = async () => {
    setIsLoading(true);

    try {
      await updateRestaurantSettings({
        restaurantId: settings.restaurantId,
        layoutType: formData.layout,
        showImage: formData.showImages,
        showPrice: formData.priceShown,
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
    <TabsContent value="aparencia" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Layout do Cardápio</CardTitle>
          <CardDescription>Personalize como os produtos são exibidos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Layout</Label>
            <Select
              defaultValue="GRID"
              value={formData.layout}
              onValueChange={(value) => handleInputChange("layout", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GRID">Grid (Cards)</SelectItem>
                <SelectItem value="LIST">Lista</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">Mostrar Preços</p>
                <p className="text-sm text-muted-foreground">Exibir preços dos produtos no cardápio</p>
              </div>
              <Switch
                checked={formData.priceShown}
                onCheckedChange={(checked) => handleInputChange("priceShown", checked)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium">Mostrar Imagens</p>
                <p className="text-sm text-muted-foreground">Exibir imagens dos produtos no cardápio</p>
              </div>
              <Switch
                checked={formData.showImages}
                onCheckedChange={(checked) => handleInputChange("showImages", checked)}
              />
            </div>
          </div>
          <Button
            onClick={handleSaveGeneral}
            disabled={
              isLoading ||
              (settings.layoutType === formData.layout &&
                settings.showPrice === formData.priceShown &&
                settings.showImage === formData.showImages)
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
