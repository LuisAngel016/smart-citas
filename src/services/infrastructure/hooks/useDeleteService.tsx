import { container } from "@/shared/IoC";
import queryClient from "@/shared/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useDeleteService = () => {

    const deleteServiceUseCase = container.resolve("deleteServiceUseCase");

    return useMutation({
        mutationFn: (id: string) => deleteServiceUseCase.execute(id),
        onSuccess: () => {
            // Invalida el cache para refrescar la lista de servicios
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
};
