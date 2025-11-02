import { useQuery } from "@tanstack/react-query";
import { getServicesChartUseCase } from "@/dashboard/IoC/dashboard.container";

export const useGetServicesChart = () => {
    return useQuery({
        queryKey: ["dashboard", "services-chart"],
        queryFn: () => getServicesChartUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
