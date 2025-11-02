import { useQuery } from "@tanstack/react-query";
import { container } from "@/shared/IoC/container";

export const useGetServicesChart = () => {
    const getServicesChartUseCase = container.resolve("getServicesChartUseCase");
    return useQuery({
        queryKey: ["dashboard", "services-chart"],
        queryFn: () => getServicesChartUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
