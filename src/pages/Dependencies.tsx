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
import { MOCK_DEPENDENCIES } from '@/lib/mock-data'

const Dependencies = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Dependências</CardTitle>
        <CardDescription>
          Lista detalhada de todas as dependências técnicas, funcionais e de
          infraestrutura do sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">ID</TableHead>
                <TableHead className="min-w-[250px]">
                  Nome da Dependência
                </TableHead>
                <TableHead className="min-w-[200px]">Tipo</TableHead>
                <TableHead className="min-w-[400px]">
                  Descrição e Requisito Funcional
                </TableHead>
                <TableHead className="min-w-[250px]">
                  Métrica de Nível de Serviço (onde aplicável)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_DEPENDENCIES.map((dep) => (
                <TableRow key={dep.id}>
                  <TableCell className="font-medium">{dep.id}</TableCell>
                  <TableCell className="font-semibold">{dep.name}</TableCell>
                  <TableCell>{dep.type}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {dep.description}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {dep.sla}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default Dependencies
