"use client";
import { updateProduct } from "@/actions/product/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loadings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/category-type";
import { ProductWithRelations } from "@/types/product-type";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ImageUploadCard } from "./general-upload";

interface GeneralTabProps {
  productOriginal: ProductWithRelations;
  categories: Category[];
  saveData: () => Promise<void>;
}

export default function GeneralTab({ productOriginal, categories, saveData }: GeneralTabProps) {
  const { id }: { id: string } = useParams();
  const [product, setProduct] = useState<ProductWithRelations>(productOriginal || {});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await updateProduct({
        restaurantId: id,
        productId: product.id,
        name: product.name,
        price: product.price,
        description: product.description || "",
        imageUrl: product.imageUrl || "",
      });

      await saveData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar produto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (url: string, path: string) => {
    setProduct((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  return (
    <TabsContent value="geral" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>Dados principais do produto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                value={product.name || ""}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                placeholder="Ex: Picanha na Brasa"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={product.categoryId || ""}
                onValueChange={(value) => setProduct({ ...product, categoryId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={product.description || ""}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              placeholder="Descreva o produto..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Preço Base (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={product.price || ""}
                onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <ImageUploadCard
              imageUrl={product.imageUrl || ""}
              imagePath={product.id || ""}
              onImageChange={handleImageChange}
              onSave={saveData}
              restaurantId={id}
              productId={product.id}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium">Disponível</p>
              <p className="text-sm text-muted-foreground">Produto visível no cardápio</p>
            </div>
            <Switch
              checked={product.isAvailable || false}
              onCheckedChange={(checked) => setProduct({ ...product, isAvailable: checked })}
            />
          </div>

          {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <Button onClick={handleSave} disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loading variant="dots" size="sm" className="mr-2" />
              </>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
