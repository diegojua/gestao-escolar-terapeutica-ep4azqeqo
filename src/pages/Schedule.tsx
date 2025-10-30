import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  setHours,
  setMinutes,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import {
  MOCK_APPOINTMENTS,
  MOCK_STUDENTS,
  MOCK_SERVICES,
  MOCK_PROFESSIONALS,
} from '@/lib/mock-data'
import { AppointmentForm } from '@/components/forms/AppointmentForm'
import { appointmentSchema } from '@/lib/schemas'
import { Appointment } from '@/lib/types'
import { useToast } from '@/components/ui/use-toast'

const Schedule = () => {
  const { toast } = useToast()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [appointments, setAppointments] =
    useState<Appointment[]>(MOCK_APPOINTMENTS)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddAppointment = (data: z.infer<typeof appointmentSchema>) => {
    const student = MOCK_STUDENTS.find((s) => s.id === data.studentId)
    const service = MOCK_SERVICES.find((s) => s.id === data.serviceId)
    const professional = MOCK_PROFESSIONALS.find(
      (p) => p.id === data.professionalId,
    )
    if (!student || !service || !professional) return

    const [hours, minutes] = data.startTime.split(':').map(Number)
    const startDate = setMinutes(setHours(data.date, hours), minutes)
    const endDate = addDays(startDate, service.standardDuration / 60)

    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      studentId: student.id,
      studentName: student.fullName,
      serviceId: service.id,
      serviceName: service.name,
      professional: professional.fullName,
      start: startDate,
      end: endDate,
      status: 'Agendado',
    }
    setAppointments((prev) => [...prev, newAppointment])
    setIsFormOpen(false)
    toast({
      title: 'Agendamento Criado!',
      description: `Agendamento para ${student.fullName} criado com sucesso.`,
    })
  }

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold capitalize">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </h2>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Agendamento
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
          </DialogHeader>
          <AppointmentForm
            students={MOCK_STUDENTS}
            services={MOCK_SERVICES}
            professionals={MOCK_PROFESSIONALS}
            onSubmit={handleAddAppointment}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderDays = () => {
    const days = []
    const startDate = startOfWeek(currentMonth, { locale: ptBR })
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center font-medium text-sm text-muted-foreground"
        >
          {format(addDays(startDate, i), 'eee', { locale: ptBR })}
        </div>,
      )
    }
    return <div className="grid grid-cols-7">{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart, { locale: ptBR })
    const endDate = endOfWeek(monthEnd, { locale: ptBR })

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day
        const appointmentsToday = appointments.filter((app) =>
          isSameDay(app.start, cloneDay),
        )

        days.push(
          <div
            className={cn(
              'p-2 border-t border-r h-32 flex flex-col relative group',
              !isSameMonth(day, monthStart)
                ? 'bg-muted/50 text-muted-foreground'
                : 'bg-background',
              isSameDay(day, new Date()) && 'bg-blue-50',
            )}
            key={day.toString()}
          >
            <span
              className={cn(
                'font-medium text-sm',
                isSameDay(day, new Date()) && 'text-primary font-bold',
              )}
            >
              {format(day, 'd')}
            </span>
            <div className="flex-1 overflow-y-auto text-xs mt-1 space-y-1">
              {appointmentsToday.map((app) => (
                <div
                  key={app.id}
                  className="bg-primary/80 text-white p-1 rounded-md truncate"
                >
                  {app.studentName}
                </div>
              ))}
            </div>
          </div>,
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>,
      )
      days = []
    }
    return <div>{rows}</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agenda</CardTitle>
      </CardHeader>
      <CardContent>
        {renderHeader()}
        <div className="border rounded-lg">
          {renderDays()}
          {renderCells()}
        </div>
      </CardContent>
    </Card>
  )
}

export default Schedule
