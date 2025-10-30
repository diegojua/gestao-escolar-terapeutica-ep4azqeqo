import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart,
  PieChart,
  Pie,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { MOCK_CASH_FLOW, MOCK_SERVICES, MOCK_INVOICES } from '@/lib/mock-data'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const Reports = () => {
  const revenueByService = MOCK_SERVICES.map((service) => ({
    name: service.name,
    revenue: Math.random() * 5000 + 1000, // Mock revenue
  }))

  const paymentStatusData = [
    {
      name: 'Pagas',
      value: MOCK_INVOICES.filter((i) => i.status === 'Paga').length,
      fill: 'var(--color-paid)',
    },
    {
      name: 'Pendentes',
      value: MOCK_INVOICES.filter((i) => i.status === 'Pendente').length,
      fill: 'var(--color-pending)',
    },
    {
      name: 'Atrasadas',
      value: MOCK_INVOICES.filter((i) => i.status === 'Atrasada').length,
      fill: 'var(--color-overdue)',
    },
  ]

  return (
    <Tabs defaultValue="cash-flow">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="cash-flow">Fluxo de Caixa</TabsTrigger>
        <TabsTrigger value="revenue">Receitas</TabsTrigger>
        <TabsTrigger value="payments">Status de Pagamentos</TabsTrigger>
      </TabsList>
      <TabsContent value="cash-flow">
        <Card>
          <CardHeader>
            <CardTitle>Relatório de Fluxo de Caixa</CardTitle>
            <CardDescription>Análise de entradas e saídas.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer config={{}} className="h-full w-full">
              <ResponsiveContainer>
                <BarChart data={MOCK_CASH_FLOW}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="revenue"
                    name="Receita"
                    fill="hsl(var(--primary))"
                  />
                  <Bar
                    dataKey="expenses"
                    name="Despesas"
                    fill="hsl(var(--destructive))"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="revenue">
        <Card>
          <CardHeader>
            <CardTitle>Receitas por Serviço</CardTitle>
            <CardDescription>
              Distribuição da receita por serviço oferecido.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer config={{}} className="h-full w-full">
              <ResponsiveContainer>
                <BarChart data={revenueByService} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                    stroke="#888888"
                    fontSize={12}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="revenue"
                    name="Receita"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="payments">
        <Card>
          <CardHeader>
            <CardTitle>Status de Pagamentos</CardTitle>
            <CardDescription>
              Proporção de faturas pagas, pendentes e atrasadas.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
            <ChartContainer
              config={{
                paid: { label: 'Pagas', color: 'hsl(var(--success))' },
                pending: { label: 'Pendentes', color: 'hsl(var(--warning))' },
                overdue: {
                  label: 'Atrasadas',
                  color: 'hsl(var(--destructive))',
                },
              }}
              className="h-full w-full"
            >
              <ResponsiveContainer>
                <PieChart>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Pie
                    data={paymentStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default Reports
