
import { useQuery } from "@tanstack/react-query";

import { container } from "@/shared/IoC/container";
import type { ClientPage } from "@/clients/domain/domain/interfaces/client-page.interface";

export const useGetClients = () => {
    const getAllClientsUseCase = container.resolve("getAllClientsUseCase");
    return useQuery<ClientPage>({
        queryKey: ["clients"],
        queryFn: () => getAllClientsUseCase.execute(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};