import { useState } from 'react'
import { PlusCircle, MoreHorizontal } from 'lucide-react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MOCK_INVENTORY } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { InventoryItemForm } from '@/components/forms/InventoryItemForm'
import { inventoryItemSchema } from '@/lib/schemas'
import { InventoryItem } from '@/lib/types'
import { useToast } from '@/components/ui/use-toast'

const Inventory = () => {
  const { toast } = useToast()
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddItem = (data: z.infer<typeof inventoryItemSchema>) => {
    const newItem: InventoryItem = {
      id: `inv-item-${Date.now()}`,
      ...data,
    }
    setInventory((prev) => [newItem, ...prev])
    setIsFormOpen(false)
    toast({
      title: 'Item Adicionado!',
      description: `${data.name} foi adicionado ao estoque.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Estoque de Materiais</CardTitle>
            <CardDescription>
              Gerencie os materiais de apoio e consumo.
            </CardDescription>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Adicionar Item
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Item ao Estoque</DialogTitle>
              </DialogHeader>
              <InventoryItemForm
                onSubmit={handleAddItem}
                onCancel={() => setIsFormOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead>Estoque Atual</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => {
              const stockPercentage =
                item.minStock > 0
                  ? (item.quantity / (item.minStock * 2)) * 100
                  : 100
              const isLowStock = item.quantity < item.minStock

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{item.quantity}</span>
                      <Progress value={stockPercentage} className="w-24" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={isLowStock ? 'destructive' : 'secondary'}>
                      {isLowStock ? 'Estoque Baixo' : 'OK'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Ajustar Estoque</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Inventory
