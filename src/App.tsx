import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import Clients from './pages/Clients'
import Students from './pages/Students'
import Services from './pages/Services'
import Schedule from './pages/Schedule'
import Financial from './pages/Financial'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/alunos" element={<Students />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/agenda" element={<Schedule />} />
          <Route path="/financeiro" element={<Financial />} />
          <Route path="/relatorios" element={<Reports />} />
          <Route path="/configuracoes" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </BrowserRouter>
)

export default App
