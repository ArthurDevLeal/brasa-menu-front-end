"use client";
import {
  createVariant,
  createVariantCategory,
  deleteVariant,
  deleteVariantCategory,
  updateVariant,
  updateVariantCategory,
} from "@/actions/variant/variants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loadings";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { ProductWithRelations } from "@/types/product-type";
import { GripVertical, Layers, Pencil, Plus, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface VariantTabProps {
  product: ProductWithRelations;
  onSave: () => Promise<void>;
}

interface VariantOption {
  id?: string;
  name: string;
  priceModifier: number;
}

interface VariantCategoryForm {
  id?: string;
  name: string;
  isRequired: boolean;
  variants: VariantOption[];
}

export default function VariantTab({ product, onSave }: VariantTabProps) {
  const { id: restaurantId } = useParams<{ id: string }>();
  const [variantDialogOpen, setVariantDialogOpen] = useState(false);
  const [editingVariantCategoryId, setEditingVariantCategoryId] = useState<string | null>(null);
  const [isLoadingDialog, setIsLoadingDialog] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);
  const [variantCategoryForm, setVariantCategoryForm] = useState<VariantCategoryForm>({
    name: "",
    isRequired: false,
    variants: [{ name: "", priceModifier: 0 }],
  });

  const openNewVariantDialog = () => {
    setEditingVariantCategoryId(null);
    setVariantCategoryForm({
      name: "",
      isRequired: false,
      variants: [{ name: "", priceModifier: 0 }],
    });
    setVariantDialogOpen(true);
  };

  const openEditVariantDialog = (category: any) => {
    setEditingVariantCategoryId(category.id);
    setVariantCategoryForm({
      id: category.id,
      name: category.name,
      isRequired: category.isRequired,
      variants: category.variants.map((v: any) => ({
        id: v.id,
        name: v.name,
        priceModifier: v.priceModifier,
      })),
    });
    setVariantDialogOpen(true);
  };

  const handleAddVariantOption = () => {
    setVariantCategoryForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { name: "", priceModifier: 0 }],
    }));
  };

  const handleRemoveVariantOption = (index: number) => {
    setVariantCategoryForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateVariantOption = (index: number, field: keyof VariantOption, value: any) => {
    setVariantCategoryForm((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant)),
    }));
  };

  const handleSaveVariantCategory = async () => {
    try {
      setIsLoadingDialog(true);

      if (!variantCategoryForm.name.trim()) {
        throw new Error("Nome da categoria é obrigatório");
      }

      if (variantCategoryForm.variants.length === 0) {
        throw new Error("Adicione pelo menos uma opção");
      }

      const invalidVariants = variantCategoryForm.variants.some((v) => !v.name.trim() || v.priceModifier < 0);

      if (invalidVariants) {
        throw new Error("Todas as opções devem ter nome válido e preço não negativo");
      }

      if (editingVariantCategoryId) {
        await updateVariantCategory({
          restaurantId,
          productId: product.id,
          variantCategoryId: editingVariantCategoryId,
          name: variantCategoryForm.name,
          isRequired: variantCategoryForm.isRequired,
        });

        const existingVariants =
          product.variantCategories?.find((c) => c.id === editingVariantCategoryId)?.variants || [];

        const newVariants = variantCategoryForm.variants.filter((v) => !v.id);
        const updatedVariants = variantCategoryForm.variants.filter((v) => v.id);
        const deletedVariantIds = existingVariants
          .map((v) => v.id)
          .filter((id) => !variantCategoryForm.variants.some((v) => v.id === id));

        for (const variant of newVariants) {
          await createVariant({
            restaurantId,
            productId: product.id,
            variantCategoryId: editingVariantCategoryId,
            name: variant.name,
            priceModifier: variant.priceModifier,
          });
        }

        for (const variant of updatedVariants) {
          const existingVariant = existingVariants.find((v) => v.id === variant.id);
          if (
            existingVariant?.name !== variant.name ||
            existingVariant?.priceModifier !== variant.priceModifier
          ) {
            await updateVariant({
              restaurantId,
              productId: product.id,
              variantCategoryId: editingVariantCategoryId,
              variantId: variant.id!,
              name: variant.name,
              priceModifier: variant.priceModifier,
            });
          }
        }

        for (const variantId of deletedVariantIds) {
          await deleteVariant({
            restaurantId,
            productId: product.id,
            variantCategoryId: editingVariantCategoryId,
            variantId,
          });
        }

        toast.success("Categoria de variante atualizada com sucesso");
      } else {
        const categoryResponse = await createVariantCategory({
          restaurantId,
          productId: product.id,
          name: variantCategoryForm.name,
          isRequired: variantCategoryForm.isRequired,
          orderIndex: product.variantCategories?.length || 0,
        });

        for (const variant of variantCategoryForm.variants) {
          console.log("Creating variant:", variant);
          await createVariant({
            restaurantId,
            productId: product.id,
            variantCategoryId: categoryResponse.data.id,
            name: variant.name,
            priceModifier: Number(variant.priceModifier) || 0,
          });
        }

        toast.success("Categoria de variante criada com sucesso");
      }

      setVariantDialogOpen(false);
      setIsSavingData(true);
      await onSave();
    } catch (error) {
      console.error("Error saving variant category:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao salvar categoria de variante");
    } finally {
      setIsLoadingDialog(false);
      setIsSavingData(false);
    }
  };

  const handleDeleteVariantCategory = async (categoryId: string) => {
    try {
      const toastId = toast.loading("Removendo categoria de variante...");

      await deleteVariantCategory({
        restaurantId,
        productId: product.id,
        variantCategoryId: categoryId,
      });
      await onSave();
      toast.success("Categoria de variante removida com sucesso", { id: toastId });
    } catch (error) {
      console.error("Error deleting variant category:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao remover categoria de variante");
    }
  };

  if (isSavingData) {
    return (
      <TabsContent value="variantes" className="space-y-6">
        <div className="w-full h-124 flex items-center justify-center gap-3">
          <Loading variant="bars" size="sm" />
          <span className="text-muted-foreground text-sm">Buscando dados...</span>
        </div>
      </TabsContent>
    );
  }

  return (
    <>
      <TabsContent value="variantes" className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Categorias de Variantes</CardTitle>
              <CardDescription>Opções que o cliente deve escolher (ex: tamanho, ponto)</CardDescription>
            </div>
            <Button size="sm" onClick={openNewVariantDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Variante
            </Button>
          </CardHeader>
          <CardContent>
            {product.variantCategories?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Layers className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma variante cadastrada</p>
                <p className="text-sm">Adicione variantes como tamanho ou ponto da carne</p>
              </div>
            ) : (
              <div className="space-y-4">
                {product.variantCategories?.map((category) => (
                  <div key={category.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{category.name}</h4>
                            {category.isRequired && (
                              <Badge variant="secondary" className="text-xs">
                                Obrigatório
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{category.variants.length} opções</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEditVariantDialog(category)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          onClick={() => handleDeleteVariantCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.variants.map((variant) => (
                        <Badge key={variant.id} variant="outline" className="py-1.5 px-3">
                          {variant.name}
                          {variant.priceModifier > 0 && (
                            <span className="ml-1 text-ember">+R${variant.priceModifier.toFixed(2)}</span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <Dialog open={variantDialogOpen} onOpenChange={setVariantDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingVariantCategoryId ? "Editar Variante" : "Nova Categoria de Variante"}
            </DialogTitle>
            <DialogDescription>Configure as opções que o cliente poderá escolher</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome da Categoria</Label>
              <Input
                value={variantCategoryForm.name}
                onChange={(e) => setVariantCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Tamanho, Ponto da Carne"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Obrigatório</p>
                <p className="text-xs text-muted-foreground">Cliente deve escolher uma opção</p>
              </div>
              <Switch
                checked={variantCategoryForm.isRequired}
                onCheckedChange={(checked) =>
                  setVariantCategoryForm((prev) => ({ ...prev, isRequired: checked }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Opções</Label>
              <div className="space-y-2">
                {variantCategoryForm.variants.map((variant, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={variant.name}
                      onChange={(e) => handleUpdateVariantOption(index, "name", e.target.value)}
                      placeholder="Nome da opção"
                      className="flex-1"
                    />
                    <div className="w-28">
                      <Input
                        type="number"
                        step="0.01"
                        value={variant.priceModifier || ""}
                        onChange={(e) =>
                          handleUpdateVariantOption(index, "priceModifier", parseFloat(e.target.value) || 0)
                        }
                        placeholder="+R$"
                      />
                    </div>
                    {variantCategoryForm.variants.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 shrink-0"
                        onClick={() => handleRemoveVariantOption(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2" onClick={handleAddVariantOption}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Opção
              </Button>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setVariantDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveVariantCategory} disabled={isLoadingDialog}>
                {isLoadingDialog ? (
                  <>
                    <Loading variant="dots" size="sm" className="mr-2" />
                  </>
                ) : editingVariantCategoryId ? (
                  "Salvar Alterações"
                ) : (
                  "Criar Variante"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
