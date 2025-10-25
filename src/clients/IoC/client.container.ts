import { httpClient } from "@/shared/api";
import { ClientRepositoryImpl } from "../infrastructure/repositories/client.repository.impl";
import { GetAllClientsUseCase } from "../application/get-all-clients.usecase";
import { GetClientByIdUseCase } from "../application/get-client-by-id.usecase";
import { CreateClientUseCase } from "../application/create-client.usecase";
import { UpdateClientUseCase } from "../application/update-client.usecase";
import { DeleteClientUseCase } from "../application/delete-client.usecase";

/**
 * Contenedor IoC del módulo de Proyectos
 * Usa el httpClient del contenedor compartido
 */


// Repository
const clientRepository = new ClientRepositoryImpl(httpClient);

// Use Cases
export const clientContainer = {
	getAllClientsUseCase: new GetAllClientsUseCase(clientRepository),
	getClientByIdUseCase: new GetClientByIdUseCase(clientRepository),
	createClientUseCase: new CreateClientUseCase(clientRepository),
	updateClientUseCase: new UpdateClientUseCase(clientRepository),
	deleteClientUseCase: new DeleteClientUseCase(clientRepository),
};
