import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC";
import type { Appointment } from "@/appointments/domain/entities/appointment.entity";
import queryClient from "@/shared/lib/queryClient";

export const useUpdateAppointment = () => {
    const updateAppointmentUseCase = container.resolve("updateAppointmentUseCase");

    return useMutation({
        mutationFn: ({ id, appointmentData }: { id: string; appointmentData: Partial<Omit<Appointment, "id">> }) =>
            updateAppointmentUseCase.execute(id, appointmentData),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["appointment", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
};
