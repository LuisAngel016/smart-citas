import { container } from '@/shared/IoC';
import type { Session } from '@/auth/domain/interfaces/session.interface';

// Devuelve un objeto con shape { user, token } para mantener compatibilidad con el store
export const RegisterAction = async (email: string, password: string, fullName: string): Promise<Session> => {

    try {
        const startRegisterUseCase = container.resolve('startRegisterUseCase');
        const { user, token } = await startRegisterUseCase.execute(email, password, fullName);
        return {
            user,
            token
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
};