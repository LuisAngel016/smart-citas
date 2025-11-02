import { useQuery } from "@tanstack/react-query";
import { container } from "@/shared/IoC/container";

export const useGetUpcomingAppointments = () => {
    const getUpcomingAppointmentsUseCase = container.resolve("getUpcomingAppointmentsUseCase");
    return useQuery({
        queryKey: ["dashboard", "upcoming-appointments"],
        queryFn: () => getUpcomingAppointmentsUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
