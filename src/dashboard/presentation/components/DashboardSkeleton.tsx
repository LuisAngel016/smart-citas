export const DashboardSkeleton = () => {
    return (
        <div className="p-4 space-y-6 bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-screen">
            {/* Header Skeleton */}
            <div className="flex flex-col items-start justify-start bg-white rounded-xl shadow p-4 dark:bg-gray-800">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="mt-4">
                            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row 1 Skeleton */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Appointments Chart Skeleton */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex-1">
                            <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    {/* Chart Area */}
                    <div className="h-[300px] flex items-end justify-between gap-2 px-4">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-linear-to-t from-blue-200 to-blue-100 dark:from-blue-900/40 dark:to-blue-900/20 rounded-t-lg animate-pulse"
                                    style={{ height: `${Math.random() * 60 + 40}%` }}
                                ></div>
                                <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Chart Skeleton */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex-1">
                            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                            <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div>
                            <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse"></div>
                            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Bar Chart Area */}
                    <div className="h-[300px] flex items-end justify-between gap-3 px-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-linear-to-t from-cyan-400 to-cyan-300 dark:from-cyan-600/60 dark:to-cyan-500/40 rounded-t-lg animate-pulse"
                                    style={{ height: `${Math.random() * 70 + 30}%` }}
                                ></div>
                                <div className="h-3 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Charts Row 2 Skeleton */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Services List Skeleton */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-6">
                    <div className="mb-6">
                        <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                        <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="absolute h-full bg-linear-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"
                                        style={{ width: `${Math.random() * 60 + 40}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Appointments Skeleton */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg p-6">
                    <div className="mb-6">
                        <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
                            >
                                <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 animate-pulse"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                    <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                                <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};