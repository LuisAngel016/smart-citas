import { useMutation } from "@tanstack/react-query";

import { container } from "@/shared/IoC/container";
import queryClient from "@/shared/lib/queryClient";
import type { UpdateUserFormDTO } from "@/users/domain/interfaces/update-user-form.dto";

export const useUpdateUser = () => {
    const updateUserUseCase = container.resolve("updateUserUseCase");

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateUserFormDTO }) =>
            updateUserUseCase.execute(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export default useUpdateUser;
