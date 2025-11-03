import { useQuery } from "@tanstack/react-query";

import { container } from "@/shared/IoC/container";
import type { User } from "@/auth/domain/entities/user.entity";

export const useGetUserById = (id?: string) => {
    const getUserByIdUseCase = container.resolve("getUserByIdUseCase");

    return useQuery<User>({
        queryKey: ["users", id],
        queryFn: async () => {
            if (!id) throw new Error("No id provided");
            return await getUserByIdUseCase.execute(id);
        },
        enabled: !!id,
    });
};

