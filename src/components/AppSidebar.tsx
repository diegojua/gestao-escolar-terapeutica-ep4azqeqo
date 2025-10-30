import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  HeartHandshake,
  Briefcase,
  Calendar,
  DollarSign,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  School,
  Workflow,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clientes', label: 'Clientes', icon: Users },
  { href: '/alunos', label: 'Alunos/Pacientes', icon: HeartHandshake },
  { href: '/servicos', label: 'Serviços', icon: Briefcase },
  { href: '/agenda', label: 'Agenda', icon: Calendar },
  { href: '/financeiro', label: 'Financeiro', icon: DollarSign },
  { href: '/relatorios', label: 'Relatórios', icon: BarChart },
  { href: '/dependencias', label: 'Dependências', icon: Workflow },
  { href: '/configuracoes', label: 'Configurações', icon: Settings },
]

export const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen text-white sidebar-gradient transition-width duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64',
      )}
    >
      <div className="flex items-center justify-between p-4 h-16 border-b border-white/20">
        <Link
          to="/"
          className={cn(
            'flex items-center gap-2',
            isCollapsed && 'justify-center w-full',
          )}
        >
          <School className="h-8 w-8" />
          <span
            className={cn(
              'font-bold text-xl whitespace-nowrap',
              isCollapsed && 'hidden',
            )}
          >
            Gestão
          </span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:flex absolute -right-4 top-6 bg-white text-primary hover:bg-gray-200 hover:text-primary rounded-full h-8 w-8"
          onClick={toggleSidebar}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="flex-1 p-2 space-y-2">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md p-3 text-sm font-semibold transition-colors',
                    'hover:bg-white/20',
                    location.pathname === item.href
                      ? 'bg-white/30 border-l-4 border-white'
                      : 'border-l-4 border-transparent',
                    isCollapsed && 'justify-center',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className={cn(isCollapsed && 'hidden')}>
                    {item.label}
                  </span>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="bg-primary text-white">
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
    </aside>
  )
}
