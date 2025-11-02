import { useQuery } from "@tanstack/react-query";
import { getUpcomingAppointmentsUseCase } from "@/dashboard/IoC/dashboard.container";

export const useGetUpcomingAppointments = () => {
    return useQuery({
        queryKey: ["dashboard", "upcoming-appointments"],
        queryFn: () => getUpcomingAppointmentsUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
