import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC";
import type { Client } from "@/clients/domain/domain/entities/client.entity";
import queryClient from "@/shared/lib/queryClient";

export const useCreateClient = () => {

    const createClientUseCase = container.resolve("createClientUseCase");

    return useMutation({
        mutationFn: (clientData: Omit<Client, "id">) =>
            createClientUseCase.execute(clientData),
        onSuccess: () => {
            // Invalida el cache para refrescar la lista de clientes
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
    });
};
