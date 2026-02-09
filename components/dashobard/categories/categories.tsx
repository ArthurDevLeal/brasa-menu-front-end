"use client";
import { deleteCategory } from "@/actions/category/category";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryWithProductCount } from "@/types/category-type";
import { FolderOpen, GripVertical, Trash2, UtensilsCrossed } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { UpdateCategoryDialog } from "./update-category-dialog";

interface categoriesProps {
  categories: CategoryWithProductCount[];
  fetchData: () => Promise<void>;
}

export default function Cartegories({ categories, fetchData }: categoriesProps) {
  const { id }: { id: string } = useParams();

  const handleDelete = async (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const toastId = toast.loading("Removendo categoria...");
      await deleteCategory({ restaurantId: id, categoryId });
      await fetchData();
      toast.success("Categoria removida com sucesso!", { id: toastId });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao remover categoria";
      toast.error(errorMessage);
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {categories.map((category) => (
        <Card
          key={category.id}
          className={`transition-colors ${!category.isActive ? "opacity-60" : ""}`}
        >
          <CardContent className="flex items-center gap-4 ">
            <div className="cursor-grab text-muted-foreground hover:text-foreground">
              <GripVertical className="h-5 w-5" />
            </div>

            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <FolderOpen className="h-5 w-5 text-accent-foreground" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{category.name}</h3>
                <Badge
                  variant="secondary"
                  className={
                    category.isActive
                      ? "bg-green-500/10 text-green-500"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {category.isActive ? "Ativa" : "Inativa"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {category.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UtensilsCrossed className="h-4 w-4" />
              <span>{category.productCount} produtos</span>
            </div>

            <div className="flex items-center gap-1">
              <UpdateCategoryDialog
                category={category}
                restaurantId={id}
                onSuccess={fetchData}
              />
              <Button
                variant="ghost"
                onClick={(e) => handleDelete(category.id, e)}
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {categories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FolderOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">Nenhuma categoria</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Crie sua primeira categoria para organizar o cardápio
          </p>
        </div>
      )}
    </div>
  );
}