import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Category, CategoryWithProductCount } from "@/types/category-type";
import { FolderOpen, GripVertical, Pencil, Trash2, UtensilsCrossed } from "lucide-react";

interface categoriesProps {
  categories: CategoryWithProductCount[];
}

export default function Cartegories({ categories }: categoriesProps) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {categories.map((category) => (
        <Card key={category.id} className={`transition-colors  ${!category.isActive ? "opacity-60" : ""}`}>
          <CardContent className="flex items-center gap-4">
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
                    category.isActive ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
                  }
                >
                  {category.isActive ? "Ativa" : "Inativa"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">{category.description}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <UtensilsCrossed className="h-4 w-4" />
              <span>{category.productCount} produtos</span>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
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
