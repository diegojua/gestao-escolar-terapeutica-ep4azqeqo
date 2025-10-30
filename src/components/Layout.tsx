import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/AppSidebar'
import { AppHeader } from '@/components/AppHeader'

export default function Layout() {
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
