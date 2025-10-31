import { Card } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'

export const SchedulesLoadingSkeleton = () => {
    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animation-duration-[800ms] animate-delay-100">
            <div className="flex items-center justify-between bg-white rounded-xl shadow p-4 dark:bg-gray-800">
                <div>
                    <Skeleton className="h-8 w-56 mb-2" />
                    <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-24 rounded" />
                </div>
            </div>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <div className="border-b px-4 py-3">
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="p-4 space-y-4">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 border border-border dark:border-gray-700 rounded-lg">
                            <Skeleton className="h-6 w-6 rounded" />
                            <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-8 w-full" />
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-36" />
                    </div>
                </div>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <div className="border-b px-4 py-3">
                    <Skeleton className="h-5 w-40" />
                </div>
                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-56" />
                        <Skeleton className="h-10 w-40" />
                    </div>
                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-36" />
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default SchedulesLoadingSkeleton
