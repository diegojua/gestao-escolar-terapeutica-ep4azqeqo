import { Bell, CheckCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useNotificationStore } from '@/stores/use-notification-store'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Notification } from '@/lib/types'

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const { markAsRead } = useNotificationStore()
  const Icon = Bell

  const content = (
    <div className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{notification.title}</p>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(notification.timestamp, {
            addSuffix: true,
            locale: ptBR,
          })}
        </p>
      </div>
      {!notification.read && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 flex-shrink-0"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            markAsRead(notification.id)
          }}
        >
          <CheckCheck className="h-4 w-4" />
          <span className="sr-only">Marcar como lida</span>
        </Button>
      )}
    </div>
  )

  return notification.link ? (
    <Link to={notification.link}>{content}</Link>
  ) : (
    <div>{content}</div>
  )
}

export const NotificationCenter = () => {
  const { notifications, markAllAsRead } = useNotificationStore()
  const unreadNotifications = notifications.filter((n) => !n.read)

  return (
    <Card className="w-full border-0 shadow-none sm:w-[450px]">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>
              Você tem {unreadNotifications.length} notificações não lidas.
            </CardDescription>
          </div>
          {unreadNotifications.length > 0 && (
            <Button variant="link" size="sm" onClick={markAllAsRead}>
              Marcar todas como lidas
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="unread">
          <TabsList className="w-full grid grid-cols-2 rounded-none">
            <TabsTrigger value="unread">Não Lidas</TabsTrigger>
            <TabsTrigger value="all">Todas</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px]">
            <TabsContent value="unread" className="m-0">
              {unreadNotifications.length > 0 ? (
                unreadNotifications.map((n) => (
                  <NotificationItem key={n.id} notification={n} />
                ))
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  Nenhuma notificação nova.
                </div>
              )}
            </TabsContent>
            <TabsContent value="all" className="m-0">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <NotificationItem key={n.id} notification={n} />
                ))
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  Nenhuma notificação.
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  )
}
