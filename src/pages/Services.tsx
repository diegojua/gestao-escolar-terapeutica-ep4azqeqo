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
import { MOCK_SERVICES } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { ServiceForm } from '@/components/forms/ServiceForm'
import { serviceSchema } from '@/lib/schemas'
import { Service } from '@/lib/types'
import { useToast } from '@/components/ui/use-toast'

const Services = () => {
  const { toast } = useToast()
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddService = (data: z.infer<typeof serviceSchema>) => {
    const newService: Service = {
      id: `ser-${Date.now()}`,
      ...data,
      associatedProfessionals: [], // Default
    }
    setServices((prev) => [newService, ...prev])
    setIsFormOpen(false)
    toast({
      title: 'Serviço Adicionado!',
      description: `${data.name} foi adicionado com sucesso.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Serviços</CardTitle>
            <CardDescription>Gerencie os serviços oferecidos.</CardDescription>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Adicionar Serviço
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Serviço</DialogTitle>
              </DialogHeader>
              <ServiceForm
                onSubmit={handleAddService}
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
              <TableHead>Nome do Serviço</TableHead>
              <TableHead>Preço Padrão</TableHead>
              <TableHead>Profissionais</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>
                  {service.standardPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {service.associatedProfessionals.map((prof) => (
                      <Badge key={prof} variant="secondary">
                        {prof}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Services
