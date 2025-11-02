import { useMutation } from "@tanstack/react-query";
import { container } from "@/shared/IoC/container";
import queryClient from "@/shared/lib/queryClient";
import type { UpdateBusinessFormDTO } from "@/business/domain/interfaces/update-business-form.dto";

export const useUpdateBusiness = () => {
    const updateBusinessUseCase = container.resolve("updateBusinessUseCase");

    return useMutation({
        mutationFn: ({ data }: { data: UpdateBusinessFormDTO }) =>
            updateBusinessUseCase.execute(data),
        onSuccess: () => {
            // Invalidate business cache
            queryClient.invalidateQueries({ queryKey: ["business"] });
        },
    });
};
