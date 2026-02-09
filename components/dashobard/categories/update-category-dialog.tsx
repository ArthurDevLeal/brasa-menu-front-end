"use client";
import { updateCategory, toggleCategoryStatus } from "@/actions/category/category";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CategoryWithProductCount } from "@/types/category-type";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface UpdateCategoryDialogProps {
  category: CategoryWithProductCount;
  restaurantId: string;
  onSuccess: () => Promise<void>;
}

export function UpdateCategoryDialog({
  category,
  restaurantId,
  onSuccess,
}: UpdateCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: category.name,
    description: category.description || "",
    isActive: category.isActive,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = async (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset form when closing
      setFormData({
        name: category.name,
        description: category.description || "",
        isActive: category.isActive,
      });
    }
    setOpen(newOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      toast.error("O nome da categoria deve ter pelo menos 2 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const toastId = toast.loading("Atualizando categoria...");

      await updateCategory({
        restaurantId,
        categoryId: category.id,
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
      });

      if (formData.isActive !== category.isActive) {
        await toggleCategoryStatus({
          restaurantId,
          categoryId: category.id,
        });
      }

      await onSuccess();
      toast.success("Categoria atualizada com sucesso!", { id: toastId });
      setOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao atualizar categoria";
      toast.error(errorMessage);
      console.error("Error updating category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Categoria</DialogTitle>
          <DialogDescription>
            Atualize os detalhes da categoria "{category.name}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Categoria</Label>
            <Input
              id="name"
              name="name"
              placeholder="Ex: Bebidas"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground">
              {formData.name.length}/100 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (Opcional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Ex: Bebidas quentes e frias"
              value={formData.description}
              onChange={handleInputChange}
              disabled={isLoading}
              maxLength={500}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {formData.description.length}/500 caracteres
            </p>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
            <div className="flex flex-col gap-0.5">
              <Label htmlFor="status" className="font-medium cursor-pointer">
                Status da Categoria
              </Label>
              <p className="text-xs text-muted-foreground">
                {formData.isActive ? "Categoria ativa" : "Categoria inativa"}
              </p>
            </div>
            <Switch
              id="status"
              checked={formData.isActive}
              onCheckedChange={handleStatusChange}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}