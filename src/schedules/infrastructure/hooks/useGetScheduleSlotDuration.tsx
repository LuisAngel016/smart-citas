import { useQuery } from "@tanstack/react-query";
import { container } from "@/shared/IoC/container";
import type { SlotDuration } from "@/schedules/domain/domain/interfaces/slot-duration.interface";

export const useGetScheduleSlotDuration = () => {
    const getSlotDurationUseCase = container.resolve("getScheduleSlotDurationUseCase");
    return useQuery<SlotDuration>({
        queryKey: ["schedule-slot-duration"],
        queryFn: () => getSlotDurationUseCase.execute(),
        staleTime: 1000 * 60 * 5,
    });
};
