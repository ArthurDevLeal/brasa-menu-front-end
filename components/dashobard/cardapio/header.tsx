import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types/category-type";
import { Filter, Search } from "lucide-react";
import CreateProduct from "./create-product";

interface CardapioHeaderProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchData: () => Promise<void>;
}

export default function CardapioHeader({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  fetchData,
  setSearchQuery,
}: CardapioHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar..."
            className="w-64 pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todas">Todas</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <CreateProduct categories={categories} fetchData={fetchData} />
    </div>
  );
}
