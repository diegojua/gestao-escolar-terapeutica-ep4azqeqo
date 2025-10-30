import { useState } from 'react'
import { PlusCircle, MoreHorizontal, FileDown } from 'lucide-react'
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
import { MOCK_STUDENTS, MOCK_CLIENTS } from '@/lib/mock-data'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { StudentForm } from '@/components/forms/StudentForm'
import { studentSchema } from '@/lib/schemas'
import { Student } from '@/lib/types'
import { useToast } from '@/components/ui/use-toast'

const Students = () => {
  const { toast } = useToast()
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS)
  const [clients] = useState(MOCK_CLIENTS)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddStudent = (data: z.infer<typeof studentSchema>) => {
    const responsibleClient = clients.find(
      (c) => c.id === data.responsibleClientId,
    )
    if (!responsibleClient) return

    const newStudent: Student = {
      id: `stu-${Date.now()}`,
      fullName: data.fullName,
      birthDate: data.birthDate,
      responsibleClientId: data.responsibleClientId,
      responsibleClientName: responsibleClient.fullName,
      contractedServices: [],
      observations: data.observations,
    }
    setStudents((prev) => [newStudent, ...prev])
    setIsFormOpen(false)
    toast({
      title: 'Aluno Adicionado!',
      description: `${data.fullName} foi adicionado com sucesso.`,
    })
  }

  const handleExport = () => {
    toast({
      title: 'Exportação Iniciada',
      description: 'A exportação dos dados dos alunos foi iniciada.',
    })
    console.log('Exporting students:', students)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Alunos/Pacientes</CardTitle>
            <CardDescription>Gerencie os alunos e pacientes.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={handleExport}
            >
              <FileDown className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exportar
              </span>
            </Button>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Adicionar Aluno
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Aluno/Paciente</DialogTitle>
                </DialogHeader>
                <StudentForm
                  clients={clients}
                  onSubmit={handleAddStudent}
                  onCancel={() => setIsFormOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex items-center gap-4 pt-4">
          <Input placeholder="Filtrar por nome..." className="max-w-sm" />
          <Input
            placeholder="Filtrar por responsável..."
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome Completo</TableHead>
              <TableHead>Cliente Responsável</TableHead>
              <TableHead>Data de Nascimento</TableHead>
              <TableHead>Próximo Agendamento</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  {student.fullName}
                </TableCell>
                <TableCell>{student.responsibleClientName}</TableCell>
                <TableCell>{student.birthDate}</TableCell>
                <TableCell>{student.nextAppointment || 'N/A'}</TableCell>
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
                      <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
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
      <div className="p-4 border-t">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  )
}

export default Students
