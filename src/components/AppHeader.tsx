import { useLocation } from 'react-router-dom'
import { Menu, Search, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AppSidebar } from '@/components/AppSidebar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { NotificationCenter } from '@/components/NotificationCenter'
import { useNotificationStore } from '@/stores/use-notification-store'

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case '/':
      return 'Dashboard'
    case '/clientes':
      return 'Clientes'
    case '/alunos':
      return 'Alunos/Pacientes'
    case '/servicos':
      return 'Serviços'
    case '/agenda':
      return 'Agenda'
    case '/financeiro':
      return 'Financeiro'
    case '/relatorios':
      return 'Relatórios'
    case '/configuracoes':
      return 'Configurações'
    default:
      if (pathname.startsWith('/clientes/')) return 'Detalhes do Cliente'
      if (pathname.startsWith('/alunos/')) return 'Detalhes do Aluno/Paciente'
      return 'Gestão Escolar'
  }
}

export const AppHeader = () => {
  const location = useLocation()
  const pageTitle = getPageTitle(location.pathname)
  const { unreadCount } = useNotificationStore()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <AppSidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] rounded-md"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notificações</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-screen max-w-md p-0" align="end">
            <NotificationCenter />
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Menu do usuário</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Meu Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
