import { httpClient } from "@/shared/api";
import { ServiceRepositoryImpl } from "../infrastructure/repositories/service.repository.impl";
import { GetAllServicesUseCase } from "../application/get-all-services.usecase";
import { GetServiceByIdUseCase } from "../application/get-service-by-id.usecase";
import { CreateServiceUseCase } from "../application/create-service.usecase";
import { UpdateServiceUseCase } from "../application/update-service.usecase";
import { DeleteServiceUseCase } from "../application/delete-service.usecase";

/**
 * Contenedor IoC del módulo de Proyectos
 * Usa el httpClient del contenedor compartido
 */


// Repository
const serviceRepository = new ServiceRepositoryImpl(httpClient);

// Use Cases
export const serviceContainer = {
	getAllServicesUseCase: new GetAllServicesUseCase(serviceRepository),
	getServiceByIdUseCase: new GetServiceByIdUseCase(serviceRepository),
	createServiceUseCase: new CreateServiceUseCase(serviceRepository),
	updateServiceUseCase: new UpdateServiceUseCase(serviceRepository),
	deleteServiceUseCase: new DeleteServiceUseCase(serviceRepository),
};
