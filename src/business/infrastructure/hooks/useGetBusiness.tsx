import { useQuery } from "@tanstack/react-query";
import { container } from "@/shared/IoC/container";
import type { Business } from "@/business/domain/entities/business.entity";

export const useGetBusiness = () => {
    const getAllBusinessUseCase = container.resolve("getAllBusinessUseCase");
    return useQuery<Business>({
        queryKey: ["business"],
        queryFn: () => getAllBusinessUseCase.execute(),
        staleTime: 1000 * 60 * 5,
    });
};
