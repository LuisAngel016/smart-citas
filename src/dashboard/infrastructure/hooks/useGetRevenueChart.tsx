import { useQuery } from "@tanstack/react-query";
import { container } from "@/shared/IoC/container";

export const useGetRevenueChart = () => {
    const getRevenueChartUseCase = container.resolve("getRevenueChartUseCase");
    return useQuery({
        queryKey: ["dashboard", "revenue-chart"],
        queryFn: () => getRevenueChartUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
