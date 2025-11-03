import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC";
import queryClient from "@/shared/lib/queryClient";
import type { CreateClientDTO } from "@/clients/domain/domain/interfaces/create-client.dto";

export const useCreateClient = () => {

    const createClientUseCase = container.resolve("createClientUseCase");

    return useMutation({
        mutationFn: (clientData: CreateClientDTO) =>
            createClientUseCase.execute(clientData),
        onSuccess: () => {
            // Invalida el cache para refrescar la lista de clientes
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
    });
};
