import { useQuery } from "@tanstack/react-query";

import { container } from "@/shared/IoC/container";
import type { Schedule } from "@/schedules/domain/domain/entities/schedule.entity";

export const useGetSchedules = () => {
    const getAllSchedulesUseCase = container.resolve("getAllSchedulesUseCase");
    return useQuery<Schedule[]>({
        queryKey: ["schedule"],
        queryFn: () => getAllSchedulesUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
