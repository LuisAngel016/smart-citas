import { useQuery } from "@tanstack/react-query";
import { getDashboardStatsUseCase } from "@/dashboard/IoC/dashboard.container";

export const useGetDashboardStats = () => {
    return useQuery({
        queryKey: ["dashboard", "stats"],
        queryFn: () => getDashboardStatsUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
