"use client";
import { createProduct } from "@/actions/product/product";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loading } from "@/components/ui/loadings";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Category } from "@/types/category-type";
import { CircleCheckBig, CircleX, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CreateProductProps {
  categories: Category[];
  fetchData: () => Promise<void>;
}

export default function CreateProduct({ categories, fetchData }: CreateProductProps) {
  const { id }: { id: string } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    price: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProduct = async () => {
    if (!formData.name.trim()) {
      toast.error("Nome do produto obrigatório", {
        description: "Digite um nome válido",
        icon: <CircleX className="h-4 w-4" />,
      });
      return;
    }

    if (!formData.categoryId) {
      toast.error("Categoria obrigatória", {
        description: "Selecione uma categoria",
        icon: <CircleX className="h-4 w-4" />,
      });
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Preço inválido", {
        description: "Digite um preço válido",
        icon: <CircleX className="h-4 w-4" />,
      });
      return;
    }

    setIsLoading(true);

    try {
      const productReq = await createProduct({
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        restaurantId: id,
        description: formData.description?.trim() || undefined,
        imageUrl: "",
      });

      if (!productReq?.data?.id) {
        toast.error("Erro ao criar produto", {
          description: "Não foi possível cadastrar o produto. Tente novamente.",
          icon: <CircleX className="h-4 w-4" />,
        });
        return;
      }

      toast.success("Produto criado com sucesso!", {
        description: "O produto já está disponível no seu cardápio.",
        icon: <CircleCheckBig className="h-4 w-4" />,
      });

      setFormData({ name: "", categoryId: "", description: "", price: "" });
      setIsDialogOpen(false);
      await fetchData();
    } catch (error: any) {
      toast.error("Erro ao criar produto", {
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
      setFormData({ name: "", categoryId: "", description: "", price: "" });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                placeholder="Ex: Picanha na Brasa"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(value) => handleInputChange("categoryId", value)}
              >
                <SelectTrigger disabled={isLoading}>
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
              placeholder="Descreva o produto..."
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProduct}
              disabled={!formData.name || !formData.categoryId || !formData.price || isLoading}
            >
              {isLoading ? (
                <>
                  <Loading variant="dots" size="sm" className="mr-2" />
                </>
              ) : (
                "Salvar produto"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
