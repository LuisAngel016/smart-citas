import { container } from "@/shared/IoC";
import queryClient from "@/shared/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useDeleteClient = () => {

    const deleteClientUseCase = container.resolve("deleteClientUseCase");

    return useMutation({
        mutationFn: (id: string) => deleteClientUseCase.execute(id),
        onSuccess: () => {
            // Invalida el cache para refrescar la lista de clientes
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        },
    });
};
