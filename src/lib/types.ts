export type Client = {
  id: string
  fullName: string
  cpf: string
  birthDate?: string
  phone: string
  email: string
  address: string
  observations?: string
}

export type Student = {
  id: string
  fullName: string
  birthDate: string
  responsibleClientId: string
  responsibleClientName: string
  contractedServices: string[]
  nextAppointment?: string
  observations?: string
}

export type Service = {
  id: string
  name: string
  description: string
  standardPrice: number
  standardDuration: number // in minutes
  associatedProfessionals: string[]
}

export type Appointment = {
  id: string
  studentId: string
  studentName: string
  serviceId: string
  serviceName: string
  professional: string
  start: Date
  end: Date
  status: 'Agendado' | 'Concluído' | 'Cancelado'
}

export type Invoice = {
  id: string
  invoiceNumber: string
  clientId: string
  clientName: string
  studentId?: string
  studentName?: string
  issueDate: string
  dueDate: string
  totalAmount: number
  status: 'Paga' | 'Pendente' | 'Atrasada'
}

export type Payment = {
  id: string
  invoiceId: string
  clientId: string
  clientName: string
  paymentDate: string
  amountPaid: number
  paymentMethod: 'Dinheiro' | 'Cartão de Crédito' | 'Débito' | 'Pix' | 'Boleto'
}

export type DiscountPackage = {
  id: string
  name: string
  type: 'Desconto Fixo' | 'Desconto Percentual' | 'Pacote de Serviços'
  value: number
  validity?: { start: string; end: string }
  applicableServices: string[]
  conditions: string
}

export type Notification = {
  id: string
  type: 'invoice' | 'appointment' | 'system'
  title: string
  message: string
  timestamp: Date
  read: boolean
  link?: string
}
