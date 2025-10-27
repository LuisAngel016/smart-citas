import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC";
import type { Appointment } from "@/appointments/domain/entities/appointment.entity";
import queryClient from "@/shared/lib/queryClient";

export const useCreateAppointment = () => {
    const createAppointmentUseCase = container.resolve("createAppointmentUseCase");

    return useMutation({
        mutationFn: (appointmentData: Omit<Appointment, "id">) =>
            createAppointmentUseCase.execute(appointmentData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
};
