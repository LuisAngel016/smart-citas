import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC";
import queryClient from "@/shared/lib/queryClient";

export const useUpdateStatusAppointment = () => {
    const updateStatusAppointmentUseCase = container.resolve("updateStatusAppointmentUseCase");

    return useMutation({
        mutationFn: ({ id }: { id: string }) =>
            updateStatusAppointmentUseCase.execute(id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["appointment", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    });
};
