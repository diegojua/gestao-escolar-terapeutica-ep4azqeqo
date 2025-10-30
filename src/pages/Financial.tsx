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
import { Badge } from '@/components/ui/badge'
import { MOCK_INVOICES, MOCK_PAYMENTS, MOCK_DISCOUNTS } from '@/lib/mock-data'

const Financial = () => {
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
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                Gerar Nova Fatura
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <InvoiceTable />
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

const InvoiceTable = () => (
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
      {MOCK_INVOICES.map((invoice) => (
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
