import { httpClient } from "@/shared/api";
import { UserRepositoryImpl } from "../infrastructure/repositories/user.repository.impl";
import { GetAllUsersUseCase } from "../application/get-users.usecase";
import { GetUserByIdUseCase } from "../application/get-user-by-id.usecase";
import { CreateUserUseCase } from "../application/create-user.usecase";
import { UpdateUserUseCase } from "../application/update-user.usecase";
import { DeleteUserUseCase } from "../application/delete-user.usecase";
import { StartLoginUseCase } from "../application/start-login.usecase";
import { CheckAuthStatusUseCase } from "../application/check-auth-status.usecase";
import { StartRegisterUseCase } from "../application/start-register.usecase";

/**
 * Contenedor IoC del módulo de Proyectos
 * Usa el httpClient del contenedor compartido
 */


// Repository
const authRepository = new UserRepositoryImpl(httpClient);

// Use Cases
export const authContainer = {
	getAllUsersUseCase: new GetAllUsersUseCase(authRepository),
	getUserByIdUseCase: new GetUserByIdUseCase(authRepository),
	createUserUseCase: new CreateUserUseCase(authRepository),
	updateUserUseCase: new UpdateUserUseCase(authRepository),
	deleteUserUseCase: new DeleteUserUseCase(authRepository),
	startLoginUseCase: new StartLoginUseCase(authRepository),
	startRegisterUseCase: new StartRegisterUseCase(authRepository),
	checkAuthStatusUseCase: new CheckAuthStatusUseCase(authRepository),
};
