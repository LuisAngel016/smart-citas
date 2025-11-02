import { useQuery } from "@tanstack/react-query";
import { getRevenueChartUseCase } from "@/dashboard/IoC/dashboard.container";

export const useGetRevenueChart = () => {
    return useQuery({
        queryKey: ["dashboard", "revenue-chart"],
        queryFn: () => getRevenueChartUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
