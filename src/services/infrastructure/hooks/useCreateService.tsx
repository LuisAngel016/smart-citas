import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC";
import type { Service } from "@/services/domain/entities/service.entity";
import queryClient from "@/shared/lib/queryClient";

export const useCreateService = () => {

    const createServiceUseCase = container.resolve("createServiceUseCase");

    return useMutation({
        mutationFn: (serviceData: Omit<Service, "id">) =>
            createServiceUseCase.execute(serviceData),
        onSuccess: () => {
            // Invalida el cache para refrescar la lista de servicios
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
};
