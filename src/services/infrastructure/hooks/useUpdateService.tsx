import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC";
import type { Service } from "@/services/domain/entities/service.entity";
import queryClient from "@/shared/lib/queryClient";

export const useUpdateService = () => {

  const updateServiceUseCase = container.resolve("updateServiceUseCase");

  return useMutation({
    mutationFn: ({
      id,
      clientData,
    }: {
      id: string;
      clientData: Partial<Omit<Service, "id">>;
    }) => updateServiceUseCase.execute(id, clientData),
    onSuccess: (_, variables) => {
      // Invalida el cache del servicio específico y la lista
      queryClient.invalidateQueries({ queryKey: ["service", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
