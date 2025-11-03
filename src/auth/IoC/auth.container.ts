import { httpClient } from "@/shared/api";
import { StartLoginUseCase } from "../application/start-login.usecase";
import { CheckAuthStatusUseCase } from "../application/check-auth-status.usecase";
import { StartRegisterUseCase } from "../application/start-register.usecase";
import { AuthRepositoryImpl } from "../infrastructure/repositories/auth.repository.impl";

/**
 * Contenedor IoC del módulo de Proyectos
 * Usa el httpClient del contenedor compartido
 */


// Repository
const authRepository = new AuthRepositoryImpl(httpClient);

// Use Cases
export const authContainer = {
	startLoginUseCase: new StartLoginUseCase(authRepository),
	startRegisterUseCase: new StartRegisterUseCase(authRepository),
	checkAuthStatusUseCase: new CheckAuthStatusUseCase(authRepository),
};
