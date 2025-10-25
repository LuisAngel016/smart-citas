import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC";
import type { Client } from "@/clients/domain/domain/entities/client.entity";
import queryClient from "@/shared/lib/queryClient";

export const useUpdateClient = () => {

  const updateClientUseCase = container.resolve("updateClientUseCase");

  return useMutation({
    mutationFn: ({
      id,
      clientData,
    }: {
      id: string;
      clientData: Partial<Omit<Client, "id">>;
    }) => updateClientUseCase.execute(id, clientData),
    onSuccess: (_, variables) => {
      // Invalida el cache del cliente específico y la lista
      queryClient.invalidateQueries({ queryKey: ["client", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
