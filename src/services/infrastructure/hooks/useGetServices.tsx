
import { useQuery } from "@tanstack/react-query";

import { container } from "@/shared/IoC/container";
import type { ServicePage } from "@/services/domain/interfaces/service-page.interface";

export const useGetServices = () => {
    const getAllServicesUseCase = container.resolve("getAllServicesUseCase");
    return useQuery<ServicePage>({
        queryKey: ["services"],
        queryFn: () => getAllServicesUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};