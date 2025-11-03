import { httpClient } from "@/shared/api";
import { UserRepositoryImpl } from "../infrastructure/repositories/user.repository.impl";
// import { GetAllUsersUseCase } from "../application/get-users.usecase";
import { GetUserByIdUseCase } from "../application/get-user-by-id.usecase";
// import { CreateUserUseCase } from "../application/create-user.usecase";
import { UpdateUserUseCase } from "../application/update-user.usecase";
import { DeleteUserUseCase } from "../application/delete-user.usecase";

/**
 * Contenedor IoC del módulo de Proyectos
 * Usa el httpClient del contenedor compartido
 */


// Repository
const userRepository = new UserRepositoryImpl(httpClient);

// Use Cases
export const userContainer = {
	// getAllUsersUseCase: new GetAllUsersUseCase(userRepository),
	getUserByIdUseCase: new GetUserByIdUseCase(userRepository),
	// createUserUseCase: new CreateUserUseCase(userRepository),
	updateUserUseCase: new UpdateUserUseCase(userRepository),
	deleteUserUseCase: new DeleteUserUseCase(userRepository),
};
