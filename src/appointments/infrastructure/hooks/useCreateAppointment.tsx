import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC";
import type { CreateAppointmentDTO } from "@/appointments/domain/interfaces/create-appointment.dto";
import queryClient from "@/shared/lib/queryClient";

export const useCreateAppointment = () => {
    const createAppointmentUseCase = container.resolve("createAppointmentUseCase");

    return useMutation({
        mutationFn: (appointmentData: CreateAppointmentDTO) =>
            createAppointmentUseCase.execute(appointmentData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
};
