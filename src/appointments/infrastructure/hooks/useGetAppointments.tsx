
import { useQuery } from "@tanstack/react-query";

import { container } from "@/shared/IoC/container";
import type { AppointmentPage } from "@/appointments/domain/interfaces/appointment-page.interface";

export const useGetAppointments = () => {
    const getAllAppointmentsUseCase = container.resolve("getAllAppointmentsUseCase");
    return useQuery<AppointmentPage>({
        queryKey: ["appointments"],
        queryFn: () => getAllAppointmentsUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};