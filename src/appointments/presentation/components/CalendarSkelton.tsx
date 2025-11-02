export const CalendarSkeleton = () => {
    return (
        <div className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm p-3 sm:p-6">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
                <div className="flex-1">
                    <div className="h-7 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 animate-pulse"></div>
                </div>
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg self-start sm:self-auto animate-pulse"></div>
            </div>

            {/* Calendar Toolbar Skeleton */}
            <div className="mb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    {/* Left buttons */}
                    <div className="flex gap-2">
                        <div className="h-9 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-9 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="hidden sm:block h-9 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    {/* Center title */}
                    <div className="h-6 w-40 sm:w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>

                    {/* Right buttons */}
                    <div className="hidden sm:flex gap-2">
                        <div className="h-9 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-9 w-14 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Calendar Grid Skeleton */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {/* Header Row - Day names */}
                <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="border-r border-gray-200 dark:border-gray-700 last:border-r-0 p-3 sm:p-4 flex justify-center">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 animate-pulse"></div>
                        </div>
                    ))}
                </div>

                {/* Time Grid - Mobile (Single column) */}
                <div className="sm:hidden">
                    <div className="flex">
                        {/* Time column */}
                        <div className="w-16 bg-gray-50 dark:bg-gray-900/30 border-r border-gray-200 dark:border-gray-700">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className="h-20 border-b border-gray-200 dark:border-gray-700 last:border-b-0 flex items-start justify-center pt-2 px-1">
                                    <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>

                        {/* Events column */}
                        <div className="flex-1">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className="h-20 border-b border-gray-200 dark:border-gray-700 last:border-b-0 p-2 relative bg-white dark:bg-gray-800">
                                    {/* Un solo evento azul simulado */}
                                    {i === 10 && (
                                        <div className="absolute inset-2 bg-linear-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20 rounded-lg border-l-4 border-blue-500 p-2 animate-pulse">
                                            <div className="h-3 bg-blue-300 dark:bg-blue-700 rounded w-3/4 mb-1.5"></div>
                                            <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded w-1/2"></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Time Grid - Desktop (Week view) */}
                <div className="hidden sm:block">
                    <div className="flex">
                        {/* Time column */}
                        <div className="w-16 bg-gray-50 dark:bg-gray-900/30 border-r border-gray-200 dark:border-gray-700 shrink-0">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className="h-20 border-b border-gray-200 dark:border-gray-700 last:border-b-0 flex items-start justify-end pr-2 pt-1">
                                    <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>

                        {/* Days columns */}
                        <div className="flex flex-1 min-w-0">
                            {[...Array(7)].map((_, dayIndex) => (
                                <div key={dayIndex} className="flex-1 border-r border-gray-200 dark:border-gray-700 last:border-r-0 min-w-0">
                                    {[...Array(24)].map((_, timeIndex) => (
                                        <div key={timeIndex} className="h-20 border-b border-gray-200 dark:border-gray-700 last:border-b-0 p-1.5 relative bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            {/* Un solo evento azul simulado */}
                                            {(dayIndex === 2 && timeIndex === 10) && (
                                                <div className="absolute inset-1.5 bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20 rounded-md border-l-3 border-blue-500 p-2 shadow-sm animate-pulse">
                                                    <div className="h-2.5 bg-blue-300 dark:bg-blue-700 rounded w-4/5 mb-1.5"></div>
                                                    <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded w-3/5 mb-1"></div>
                                                    <div className="h-2 bg-blue-200 dark:bg-blue-800 rounded w-2/5"></div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};