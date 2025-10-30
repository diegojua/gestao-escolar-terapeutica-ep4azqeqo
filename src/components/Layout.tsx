import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/AppSidebar'
import { AppHeader } from '@/components/AppHeader'
import { useNotificationStore } from '@/stores/use-notification-store'

export default function Layout() {
  const { addNotification } = useNotificationStore()

  useEffect(() => {
    const interval = setInterval(() => {
      addNotification({
        type: 'system',
        title: 'Lembrete do Sistema',
        message: 'Não se esqueça de verificar os relatórios diários.',
        link: '/relatorios',
      })
    }, 60000) // Add a new notification every 60 seconds for demo

    return () => clearInterval(interval)
  }, [addNotification])

  return (
    <div className="flex min-h-screen w-full bg-secondary">
      <AppSidebar />
      <div className="flex flex-col flex-1">
        <AppHeader />
        <main className="flex-1 p-4 sm:p-6 md:p-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
