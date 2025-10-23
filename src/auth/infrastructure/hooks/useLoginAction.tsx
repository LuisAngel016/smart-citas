import { container } from '@/shared/IoC';
import type { Session } from '@/auth/domain/interfaces/session.interface';

// Devuelve un objeto con shape { user, token } para mantener compatibilidad con el store
export const LoginAction = async (email: string, password: string): Promise<Session> => {

    try {
        const startLoginUseCase = container.resolve('startLoginUseCase');
        const { user, token } = await startLoginUseCase.execute(email, password);
        return {
            user,
            token
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};