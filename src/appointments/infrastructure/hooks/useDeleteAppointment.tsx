import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC";
import queryClient from "@/shared/lib/queryClient";

export const useDeleteAppointment = () => {
    const deleteAppointmentUseCase = container.resolve("deleteAppointmentUseCase");

    return useMutation({
        mutationFn: (id: string) => deleteAppointmentUseCase.execute(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            queryClient.invalidateQueries({ queryKey: ["appointment", id] });
        },
    });
};
