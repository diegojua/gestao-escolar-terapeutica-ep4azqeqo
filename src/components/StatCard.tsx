import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string
  icon: React.ElementType
  className?: string
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  className,
}: StatCardProps) => {
  return (
    <Card
      className={cn(
        'hover:border-primary transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1',
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
