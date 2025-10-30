import { z } from 'zod'

export const clientSchema = z.object({
  fullName: z.string().min(3, { message: 'O nome completo é obrigatório.' }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF inválido. Use o formato XXX.XXX.XXX-XX.',
  }),
  birthDate: z.string().optional(),
  phone: z.string().min(10, { message: 'O telefone é obrigatório.' }),
  email: z.string().email({ message: 'Email inválido.' }),
  address: z.string().min(5, { message: 'O endereço é obrigatório.' }),
  observations: z.string().optional(),
})

export const studentSchema = z.object({
  fullName: z.string().min(3, { message: 'O nome completo é obrigatório.' }),
  birthDate: z
    .string()
    .min(10, { message: 'A data de nascimento é obrigatória.' }),
  responsibleClientId: z.string({
    required_error: 'Selecione um cliente responsável.',
  }),
  observations: z.string().optional(),
})

export const professionalSchema = z.object({
  fullName: z.string().min(3, { message: 'O nome completo é obrigatório.' }),
  specialty: z.string().min(2, { message: 'A especialidade é obrigatória.' }),
  phone: z.string().min(10, { message: 'O telefone é obrigatório.' }),
  email: z.string().email({ message: 'Email inválido.' }),
})

export const serviceSchema = z.object({
  name: z.string().min(3, { message: 'O nome do serviço é obrigatório.' }),
  description: z.string().min(10, { message: 'A descrição é obrigatória.' }),
  standardPrice: z.coerce
    .number()
    .positive({ message: 'O preço deve ser um número positivo.' }),
  standardDuration: z.coerce
    .number()
    .int()
    .positive({ message: 'A duração deve ser um número inteiro positivo.' }),
})

export const appointmentSchema = z.object({
  studentId: z.string({ required_error: 'Selecione um aluno.' }),
  serviceId: z.string({ required_error: 'Selecione um serviço.' }),
  professionalId: z.string({ required_error: 'Selecione um profissional.' }),
  date: z.date({ required_error: 'A data é obrigatória.' }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Hora de início inválida.',
  }),
})

export const invoiceSchema = z.object({
  clientId: z.string({ required_error: 'Selecione um cliente.' }),
  studentId: z.string().optional(),
  dueDate: z.date({ required_error: 'A data de vencimento é obrigatória.' }),
  items: z
    .array(
      z.object({
        description: z.string().min(1, 'Descrição é obrigatória.'),
        amount: z.coerce.number().positive('O valor deve ser positivo.'),
      }),
    )
    .min(1, 'Adicione pelo menos um item à fatura.'),
})

export const inventoryItemSchema = z.object({
  name: z.string().min(2, { message: 'O nome do item é obrigatório.' }),
  description: z.string().optional(),
  quantity: z.coerce
    .number()
    .int()
    .min(0, 'A quantidade não pode ser negativa.'),
  minStock: z.coerce
    .number()
    .int()
    .min(0, 'O estoque mínimo não pode ser negativo.'),
  supplier: z.string().optional(),
})
