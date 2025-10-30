import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC/container";
import type { Schedule } from "@/schedules/domain/domain/entities/schedule.entity";
import type { UpdateScheduleDTO } from "@/schedules/domain/domain/interfaces/create-schedule.dto";
import queryClient from "@/shared/lib/queryClient";

export const useUpdateSchedule = () => {
    const updateScheduleUseCase = container.resolve("updateScheduleUseCase");

    return useMutation<Schedule[], unknown, UpdateScheduleDTO[]>({
        mutationFn: (schedules: UpdateScheduleDTO[]) =>
            updateScheduleUseCase.executeMany(schedules),
        onSuccess: () => {
            // Invalida el cache de la lista de schedules
            queryClient.invalidateQueries({ queryKey: ["schedule"] });
        },
    });
};
