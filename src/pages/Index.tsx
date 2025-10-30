import { CalendarCheck, Users, Wallet, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/StatCard'
import { CashFlowChart } from '@/components/charts/CashFlowChart'
import { RecentAppointments } from '@/components/RecentAppointments'
import { PendingPayments } from '@/components/PendingPayments'
import {
  MOCK_APPOINTMENTS,
  MOCK_INVOICES,
  MOCK_STUDENTS,
} from '@/lib/mock-data'

const Index = () => {
  const upcomingAppointmentsCount = MOCK_APPOINTMENTS.filter(
    (a) => a.status === 'Agendado',
  ).length
  const pendingPayments = MOCK_INVOICES.filter(
    (i) => i.status === 'Pendente' || i.status === 'Atrasada',
  )
  const pendingPaymentsCount = pendingPayments.length
  const pendingPaymentsTotal = pendingPayments.reduce(
    (sum, inv) => sum + inv.totalAmount,
    0,
  )
  const newStudentsCount = MOCK_STUDENTS.length // Mocking this for now
  const monthlyRevenue = MOCK_INVOICES.filter(
    (i) => i.status === 'Paga',
  ).reduce((sum, inv) => sum + inv.totalAmount, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Próximos Agendamentos"
          value={upcomingAppointmentsCount.toString()}
          icon={CalendarCheck}
        />
        <StatCard
          title="Pagamentos Pendentes"
          value={`${pendingPaymentsCount} (${pendingPaymentsTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})`}
          icon={Wallet}
        />
        <StatCard
          title="Novos Alunos/Pacientes (Mês)"
          value={newStudentsCount.toString()}
          icon={Users}
        />
        <StatCard
          title="Receita do Mês"
          value={monthlyRevenue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
          icon={TrendingUp}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <CashFlowChart />
        <PendingPayments />
      </div>
      <div>
        <RecentAppointments />
      </div>
    </div>
  )
}

export default Index
