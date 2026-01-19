import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductWithRelations } from "@/types/product-type";
import { Copy, Eye, ImageIcon, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
interface TableCompProps {
  filteredProducts: ProductWithRelations[];
}

export default function TableComp({ filteredProducts }: TableCompProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-75">Produto</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Variantes</TableHead>
          <TableHead>Adicionais</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-12.5"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProducts.map((product) => (
          <TableRow key={product.id} className="cursor-pointer hover:bg-muted/50">
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="font-medium">{product.name}</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary">{product.category.name}</Badge>
            </TableCell>
            <TableCell>R$ {product.price.toFixed(2)}</TableCell>
            <TableCell>
              {product.variantCategories.length>0 ? (
                <Badge className="bg-blue-500/10 text-blue-500">Sim</Badge>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>
            <TableCell>
              {product.addOnCategories.length>0 ? (
                <Badge className="bg-purple-500/10 text-purple-500">Sim</Badge>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>
            <TableCell>{product.metrics?.views}</TableCell>
            <TableCell>
              <Badge
                className={
                  product.isAvailable ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                }
              >
                {product.isAvailable ? "Ativo" : "Inativo"}
              </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Visualizar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-500">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
