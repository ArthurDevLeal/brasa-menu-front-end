"use client";
import { createCategory } from "@/actions/category/category";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loadings";
import { Textarea } from "@/components/ui/textarea";
import { CircleCheckBig, CircleX, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CategoriesHeaderProps {
  fetchData: () => Promise<void>;
  categoryLength: number;
}

export default function CategoriesHeader({ fetchData, categoryLength }: CategoriesHeaderProps) {
  const { id }: { id: string } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveCategory = async () => {
    setIsLoading(true);
    try {
      const categoryReq = await createCategory({
        name: formData.name,
        restaurantId: id,
        description: formData.description,
        orderIndex: categoryLength,
      });

      if (!categoryReq?.data?.id) {
        toast.error("Erro ao criar categoria", {
          description: "Não foi possível cadastrar a categoria. Verifique os dados e tente novamente.",
          icon: <CircleX className="h-4 w-4" />,
        });
        return;
      }

      toast.success("Categoria criada com sucesso!", {
        description: "A categoria já está disponível no seu cardápio.",
        icon: <CircleCheckBig className="h-4 w-4" />,
      });

      setFormData({ name: "", description: "" });
      setIsDialogOpen(false);
      await fetchData();
    } catch (error: any) {
      toast.error("Erro ao criar categoria", {
        description: error?.message || "Tente novamente.",
        icon: <CircleX className="h-4 w-4" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setFormData({ name: "", description: "" });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">Arraste para reordenar as categorias</p>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Categoria
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Categoria</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Categoria</Label>
              <Input
                id="name"
                placeholder="Ex: Carnes"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva a categoria..."
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                Cancelar
              </Button>
              <Button onClick={handleSaveCategory} disabled={!formData.name || isLoading}>
                {isLoading ? (
                  <>
                    <Loading variant="dots" size="sm" className="mr-2" />
                  </>
                ) : (
                  "Salvar categoria"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
