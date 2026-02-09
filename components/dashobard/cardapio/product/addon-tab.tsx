"use client";
import {
  createAddOn,
  createAddOnCategory,
  deleteAddOn,
  deleteAddOnCategory,
  updateAddOn,
  updateAddOnCategory,
} from "@/actions/addons/addons";
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
import { GripVertical, Plus, Settings, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AddOnTabProps {
  product: ProductWithRelations;
  onSave: () => Promise<void>;
}

interface AddOnOption {
  id?: string;
  name: string;
  price: number;
}

interface AddOnCategoryForm {
  id?: string;
  name: string;
  isRequired: boolean;
  minSelections: number;
  maxSelections: number | null;
  addOns: AddOnOption[];
}

export default function AddOnTab({ product, onSave }: AddOnTabProps) {
  const { id: restaurantId } = useParams<{ id: string }>();
  const [addOnDialogOpen, setAddOnDialogOpen] = useState(false);
  const [editingAddOnCategoryId, setEditingAddOnCategoryId] = useState<string | null>(null);
  const [isLoadingDialog, setIsLoadingDialog] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);
  const [addOnCategoryForm, setAddOnCategoryForm] = useState<AddOnCategoryForm>({
    name: "",
    isRequired: false,
    minSelections: 0,
    maxSelections: null,
    addOns: [{ name: "", price: 0 }],
  });

  const openNewAddOnDialog = () => {
    setEditingAddOnCategoryId(null);
    setAddOnCategoryForm({
      name: "",
      isRequired: false,
      minSelections: 0,
      maxSelections: null,
      addOns: [{ name: "", price: 0 }],
    });
    setAddOnDialogOpen(true);
  };

  const openEditAddOnDialog = (category: any) => {
    setEditingAddOnCategoryId(category.id);
    setAddOnCategoryForm({
      id: category.id,
      name: category.name,
      isRequired: category.isRequired,
      minSelections: category.minSelections,
      maxSelections: category.maxSelections,
      addOns: category.addOns.map((a: any) => ({
        id: a.id,
        name: a.name,
        price: a.price,
      })),
    });
    setAddOnDialogOpen(true);
  };

  const handleAddAddOnOption = () => {
    setAddOnCategoryForm((prev) => ({
      ...prev,
      addOns: [...prev.addOns, { name: "", price: 0 }],
    }));
  };

  const handleRemoveAddOnOption = (index: number) => {
    setAddOnCategoryForm((prev) => ({
      ...prev,
      addOns: prev.addOns.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateAddOnOption = (index: number, field: keyof AddOnOption, value: any) => {
    setAddOnCategoryForm((prev) => ({
      ...prev,
      addOns: prev.addOns.map((addOn, i) => (i === index ? { ...addOn, [field]: value } : addOn)),
    }));
  };

  const handleSaveAddOnCategory = async () => {
    try {
      setIsLoadingDialog(true);

      if (!addOnCategoryForm.name.trim()) {
        throw new Error("Nome da categoria é obrigatório");
      }

      if (addOnCategoryForm.addOns.length === 0) {
        throw new Error("Adicione pelo menos uma opção");
      }

      const invalidAddOns = addOnCategoryForm.addOns.some((a) => !a.name.trim() || a.price < 0);

      if (invalidAddOns) {
        throw new Error("Todos os adicionais devem ter nome válido e preço não negativo");
      }

      if (addOnCategoryForm.minSelections < 0) {
        throw new Error("Mínimo de seleções deve ser não negativo");
      }

      if (
        addOnCategoryForm.maxSelections !== null &&
        addOnCategoryForm.maxSelections < addOnCategoryForm.minSelections
      ) {
        throw new Error("Máximo de seleções não pode ser menor que o mínimo");
      }

      if (editingAddOnCategoryId) {
        await updateAddOnCategory({
          restaurantId,
          productId: product.id,
          addOnCategoryId: editingAddOnCategoryId,
          name: addOnCategoryForm.name,
          isRequired: addOnCategoryForm.isRequired,
          minSelections: addOnCategoryForm.minSelections,
          maxSelections: addOnCategoryForm.maxSelections,
        });

        const existingAddOns =
          product.addOnCategories?.find((c) => c.id === editingAddOnCategoryId)?.addOns || [];

        const newAddOns = addOnCategoryForm.addOns.filter((a) => !a.id);
        const updatedAddOns = addOnCategoryForm.addOns.filter((a) => a.id);
        const deletedAddOnIds = existingAddOns
          .map((a) => a.id)
          .filter((id) => !addOnCategoryForm.addOns.some((a) => a.id === id));

        for (const addOn of newAddOns) {
          await createAddOn({
            restaurantId,
            productId: product.id,
            addOnCategoryId: editingAddOnCategoryId,
            name: addOn.name,
            price: addOn.price,
          });
        }

        for (const addOn of updatedAddOns) {
          const existingAddOn = existingAddOns.find((a) => a.id === addOn.id);
          if (existingAddOn?.name !== addOn.name || existingAddOn?.price !== addOn.price) {
            await updateAddOn({
              restaurantId,
              productId: product.id,
              addOnCategoryId: editingAddOnCategoryId,
              addOnId: addOn.id!,
              name: addOn.name,
              price: addOn.price,
            });
          }
        }

        for (const addOnId of deletedAddOnIds) {
          await deleteAddOn({
            restaurantId,
            productId: product.id,
            addOnCategoryId: editingAddOnCategoryId,
            addOnId,
          });
        }

        toast.success("Categoria de adicional atualizada com sucesso");
      } else {
        const categoryResponse = await createAddOnCategory({
          restaurantId,
          productId: product.id,
          name: addOnCategoryForm.name,
          isRequired: addOnCategoryForm.isRequired,
          minSelections: addOnCategoryForm.minSelections,
          maxSelections: addOnCategoryForm.maxSelections,
          orderIndex: product.addOnCategories?.length || 0,
        });

        for (const addOn of addOnCategoryForm.addOns) {
          await createAddOn({
            restaurantId,
            productId: product.id,
            addOnCategoryId: categoryResponse.data.id,
            name: addOn.name,
            price: Number(addOn.price) || 0,
          });
        }

        toast.success("Categoria de adicional criada com sucesso");
      }

      setAddOnDialogOpen(false);
      setIsSavingData(true);
      await onSave();
    } catch (error) {
      console.error("Error saving add-on category:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao salvar categoria de adicional");
    } finally {
      setIsLoadingDialog(false);
      setIsSavingData(false);
    }
  };

  const handleDeleteAddOnCategory = async (categoryId: string) => {
    try {
      const toastId = toast.loading("Removendo categoria de adicional...");

      await deleteAddOnCategory({
        restaurantId,
        productId: product.id,
        addOnCategoryId: categoryId,
      });
      await onSave();
      toast.success("Categoria de adicional removida com sucesso", { id: toastId });
    } catch (error) {
      console.error("Error deleting add-on category:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao remover categoria de adicional");
    }
  };

  if (isSavingData) {
    return (
      <TabsContent value="pedidos" className="space-y-6">
        <div className="w-full h-124 flex items-center justify-center gap-3">
          <Loading variant="bars" size="sm" />
          <span className="text-muted-foreground text-sm">Buscando dados...</span>
        </div>
      </TabsContent>
    );
  }

  return (
    <>
      <TabsContent value="pedidos" className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Categorias de Adicionais</CardTitle>
              <CardDescription>
                Opções adicionais que o cliente pode escolher (ex: bebida, molho)
              </CardDescription>
            </div>
            <Button size="sm" onClick={openNewAddOnDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Adicional
            </Button>
          </CardHeader>
          <CardContent>
            {product.addOnCategories?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum adicional cadastrado</p>
                <p className="text-sm">Adicione adicionais como bebidas ou molhos</p>
              </div>
            ) : (
              <div className="space-y-4">
                {product.addOnCategories?.map((category) => (
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
                          <p className="text-xs text-muted-foreground">
                            {category.addOns.length} opções
                            {category.minSelections > 0 || category.maxSelections ? (
                              <span className="ml-2">
                                (Mín: {category.minSelections}
                                {category.maxSelections ? `, Máx: ${category.maxSelections}` : ""}
                                {!category.maxSelections ? "+" : ""})
                              </span>
                            ) : null}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEditAddOnDialog(category)}>
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          onClick={() => handleDeleteAddOnCategory(category.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.addOns.map((addOn) => (
                        <Badge key={addOn.id} variant="outline" className="py-1.5 px-3">
                          {addOn.name}
                          {addOn.price > 0 && (
                            <span className="ml-1 text-ember">+R${addOn.price.toFixed(2)}</span>
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

      <Dialog open={addOnDialogOpen} onOpenChange={setAddOnDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAddOnCategoryId ? "Editar Adicional" : "Nova Categoria de Adicional"}
            </DialogTitle>
            <DialogDescription>
              Configure as opções adicionais que o cliente poderá escolher
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome da Categoria</Label>
              <Input
                value={addOnCategoryForm.name}
                onChange={(e) => setAddOnCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Bebida, Molho, Acompanhamento"
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">Obrigatório</p>
                <p className="text-xs text-muted-foreground">Cliente deve escolher uma opção</p>
              </div>
              <Switch
                checked={addOnCategoryForm.isRequired}
                onCheckedChange={(checked) =>
                  setAddOnCategoryForm((prev) => ({ ...prev, isRequired: checked }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mínimo de Seleções</Label>
                <Input
                  type="number"
                  min="0"
                  value={addOnCategoryForm.minSelections}
                  onChange={(e) =>
                    setAddOnCategoryForm((prev) => ({
                      ...prev,
                      minSelections: Math.max(0, parseInt(e.target.value) || 0),
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Máximo de Seleções</Label>
                <Input
                  type="number"
                  min="0"
                  value={addOnCategoryForm.maxSelections || ""}
                  onChange={(e) =>
                    setAddOnCategoryForm((prev) => ({
                      ...prev,
                      maxSelections:
                        e.target.value === "" ? null : Math.max(0, parseInt(e.target.value) || 0),
                    }))
                  }
                  placeholder="Ilimitado"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Opções</Label>
              <div className="space-y-2">
                {addOnCategoryForm.addOns.map((addOn, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={addOn.name}
                      onChange={(e) => handleUpdateAddOnOption(index, "name", e.target.value)}
                      placeholder="Nome do adicional"
                      className="flex-1"
                    />
                    <div className="w-28">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={addOn.price || ""}
                        onChange={(e) =>
                          handleUpdateAddOnOption(index, "price", parseFloat(e.target.value) || 0)
                        }
                        placeholder="+R$"
                      />
                    </div>
                    {addOnCategoryForm.addOns.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 shrink-0"
                        onClick={() => handleRemoveAddOnOption(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2" onClick={handleAddAddOnOption}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Opção
              </Button>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setAddOnDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveAddOnCategory} disabled={isLoadingDialog}>
                {isLoadingDialog ? (
                  <>
                    <Loading variant="dots" size="sm" className="mr-2" />
                  </>
                ) : editingAddOnCategoryId ? (
                  "Salvar Alterações"
                ) : (
                  "Criar Adicional"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
