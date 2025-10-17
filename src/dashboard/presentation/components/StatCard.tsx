import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
    title: string
    value: string | number
    description: string
    icon: LucideIcon
}

export const StatCard = ({ title, value, description, icon: Icon }: StatCardProps) => {
    return (
        <Card className="py-6 px-2 dark:bg-gray-800 dark:border-gray-700 animate-fade animate-duration-[1000ms] animate-delay-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
                <CardTitle className="text-sm font-medium dark:text-gray-100">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold dark:text-gray-100">{value}</div>
                <p className="text-xs text-muted-foreground dark:text-gray-400">{description}</p>
            </CardContent>
        </Card>
    )
}
