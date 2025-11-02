import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Clock } from 'lucide-react'

export const SchedulesLoadingSkeleton = () => {
    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animated-duration-[800ms] animate-delay-100">
            {/* Card de Horario de Atención */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary dark:text-blue-400" />
                        <Skeleton className="h-6 w-44" />
                    </div>
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 border border-border dark:border-gray-700 rounded-lg">
                            <Skeleton className="h-6 w-10 rounded-full" />
                            <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                                <Skeleton className="h-5 w-20" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    ))}
                    <Skeleton className="h-10 w-36 mt-4" />
                </CardContent>
            </Card>

            {/* Card de Duración de Slots */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-72 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-10 w-full max-w-xs" />
                    </div>
                    <Skeleton className="h-10 w-36 mt-2" />
                </CardContent>
            </Card>
        </div>
    )
}