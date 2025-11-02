import { useQuery } from "@tanstack/react-query";
import { getAppointmentsChartUseCase } from "@/dashboard/IoC/dashboard.container";

export const useGetAppointmentsChart = () => {
    return useQuery({
        queryKey: ["dashboard", "appointments-chart"],
        queryFn: () => getAppointmentsChartUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
