import { useState } from 'react'
import { z } from 'zod'
import { format } from 'date-fns'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { Button } from '@/components/ui/button'
import { PlusCircle, MoreHorizontal } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'
import {
  MOCK_INVOICES,
  MOCK_PAYMENTS,
  MOCK_DISCOUNTS,
  MOCK_CLIENTS,
  MOCK_STUDENTS,
} from '@/lib/mock-data'
import { InvoiceForm } from '@/components/forms/InvoiceForm'
import { invoiceSchema } from '@/lib/schemas'
import { Invoice } from '@/lib/types'
import { useToast } from '@/components/ui/use-toast'

const Financial = () => {
  const { toast } = useToast()
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddInvoice = (data: z.infer<typeof invoiceSchema>) => {
    const client = MOCK_CLIENTS.find((c) => c.id === data.clientId)
    if (!client) return

    const totalAmount = data.items.reduce((sum, item) => sum + item.amount, 0)
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `2025-${String(invoices.length + 1).padStart(3, '0')}`,
      clientId: client.id,
      clientName: client.fullName,
      issueDate: format(new Date(), 'yyyy-MM-dd'),
      dueDate: format(data.dueDate, 'yyyy-MM-dd'),
      totalAmount,
      status: 'Pendente',
    }
    setInvoices((prev) => [newInvoice, ...prev])
    setIsFormOpen(false)
    toast({
      title: 'Fatura Gerada!',
      description: `Fatura para ${client.fullName} no valor de ${totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} foi gerada.`,
    })
  }

  return (
    <Tabs defaultValue="invoices">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="invoices">Faturas</TabsTrigger>
        <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        <TabsTrigger value="discounts">Descontos/Pacotes</TabsTrigger>
      </TabsList>
      <TabsContent value="invoices">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Faturas</CardTitle>
                <CardDescription>
                  Gerencie todas as faturas emitidas.
                </CardDescription>
              </div>
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Gerar Nova Fatura
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Gerar Nova Fatura</DialogTitle>
                  </DialogHeader>
                  <InvoiceForm
                    clients={MOCK_CLIENTS}
                    students={MOCK_STUDENTS}
                    onSubmit={handleAddInvoice}
                    onCancel={() => setIsFormOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <InvoiceTable invoices={invoices} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="payments">
        <Card>
          <CardHeader>
            <CardTitle>Pagamentos</CardTitle>
            <CardDescription>
              Visualize todos os pagamentos registrados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentTable />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="discounts">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Descontos e Pacotes</CardTitle>
                <CardDescription>
                  Gerencie descontos e pacotes de serviços.
                </CardDescription>
              </div>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                Adicionar Novo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DiscountTable />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

const InvoiceTable = ({ invoices }: { invoices: Invoice[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Nº Fatura</TableHead>
        <TableHead>Cliente</TableHead>
        <TableHead>Vencimento</TableHead>
        <TableHead>Valor</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>
          <span className="sr-only">Ações</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map((invoice) => (
        <TableRow key={invoice.id}>
          <TableCell>{invoice.invoiceNumber}</TableCell>
          <TableCell>{invoice.clientName}</TableCell>
          <TableCell>{invoice.dueDate}</TableCell>
          <TableCell>
            {invoice.totalAmount.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </TableCell>
          <TableCell>
            <Badge
              variant={
                invoice.status === 'Paga'
                  ? 'default'
                  : invoice.status === 'Atrasada'
                    ? 'destructive'
                    : 'secondary'
              }
            >
              {invoice.status}
            </Badge>
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                <DropdownMenuItem>Registrar Pagamento</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const PaymentTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Fatura</TableHead>
        <TableHead>Cliente</TableHead>
        <TableHead>Data Pagamento</TableHead>
        <TableHead>Valor Pago</TableHead>
        <TableHead>Forma</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {MOCK_PAYMENTS.map((payment) => (
        <TableRow key={payment.id}>
          <TableCell>{payment.invoiceId}</TableCell>
          <TableCell>{payment.clientName}</TableCell>
          <TableCell>{payment.paymentDate}</TableCell>
          <TableCell>
            {payment.amountPaid.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </TableCell>
          <TableCell>{payment.paymentMethod}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

const DiscountTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Nome</TableHead>
        <TableHead>Tipo</TableHead>
        <TableHead>Valor/Percentual</TableHead>
        <TableHead>
          <span className="sr-only">Ações</span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {MOCK_DISCOUNTS.map((discount) => (
        <TableRow key={discount.id}>
          <TableCell>{discount.name}</TableCell>
          <TableCell>{discount.type}</TableCell>
          <TableCell>
            {discount.type === 'Desconto Percentual'
              ? `${discount.value}%`
              : discount.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
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
)

export default Financial
