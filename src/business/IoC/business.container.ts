import { httpClient } from "@/shared/api";
import { BusinessRepositoryImpl } from "../infrastructure/repositories/business.repository.impl";
import { GetAllBusinessUseCase } from "../application/get-all-business.usecase";
import { UpdateBusinessUseCase } from "../application/update-business.usecase";

const businessRepository = new BusinessRepositoryImpl(httpClient);

export const businessContainer = {
  getAllBusinessUseCase: new GetAllBusinessUseCase(businessRepository),
  updateBusinessUseCase: new UpdateBusinessUseCase(businessRepository),
};
