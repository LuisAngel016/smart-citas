import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const ClientsLoadingSkeleton = () => {
    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animation-duration-[800ms] animate-delay-100">
            {/* Header (match ClientsPage layout) */}
            <div className="flex items-center justify-between bg-white rounded-xl shadow p-4 dark:bg-gray-800">
                <div>
                    <Skeleton className="h-10 w-56 mb-2" />
                    <Skeleton className="h-5 w-72" />
                </div>
                <div className="flex items-center gap-2">
                    <Button disabled className="flex items-center gap-2 w-full sm:w-auto opacity-70">
                        <Skeleton className="h-5 w-28" />
                    </Button>
                </div>
            </div>

            {/* Table skeleton (simulate DataTable card) */}
            <Card className="overflow-hidden bg-white/60 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="border-b px-4 py-3 bg-transparent">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-8 w-24" />
                    </div>
                </div>
                <div className="p-4">
                    <div className="grid grid-cols-6 gap-4 mb-3">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-10 w-full" />
                        ))}
                    </div>
                    <div className="space-y-3">
                        {[...Array(6)].map((_, rowIdx) => (
                            <div key={rowIdx} className="grid grid-cols-6 gap-4">
                                {[...Array(6)].map((_, colIdx) => (
                                    <Skeleton key={colIdx} className="h-6 w-full" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};
