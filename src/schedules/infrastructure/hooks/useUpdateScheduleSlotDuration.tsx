import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC/container";
import type { UpdateSlotDurationDTO, SlotDuration } from "@/schedules/domain/domain/interfaces/slot-duration.interface";
import queryClient from "@/shared/lib/queryClient";

export const useUpdateScheduleSlotDuration = () => {
    const updateUseCase = container.resolve("updateScheduleSlotDurationUseCase");

    return useMutation<SlotDuration, unknown, UpdateSlotDurationDTO>({
        mutationFn: (data: UpdateSlotDurationDTO) => updateUseCase.execute(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["schedule-slot-duration"] });
        },
    });
};
