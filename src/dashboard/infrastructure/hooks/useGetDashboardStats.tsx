import { useQuery } from "@tanstack/react-query";
import { container } from "@/shared/IoC/container";

export const useGetDashboardStats = () => {
    const getDashboardStatsUseCase = container.resolve("getDashboardStatsUseCase");
    return useQuery({
        queryKey: ["dashboard", "stats"],
        queryFn: () => getDashboardStatsUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
