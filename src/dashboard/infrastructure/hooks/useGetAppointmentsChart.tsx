import { useQuery } from "@tanstack/react-query";
import { container } from "@/shared/IoC/container";

export const useGetAppointmentsChart = () => {
    const getAppointmentsChartUseCase = container.resolve("getAppointmentsChartUseCase");
    return useQuery({
        queryKey: ["dashboard", "appointments-chart"],
        queryFn: () => getAppointmentsChartUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
