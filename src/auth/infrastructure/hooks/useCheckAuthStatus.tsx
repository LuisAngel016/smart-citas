import { container } from '@/shared/IoC';
import type { Session } from '@/auth/domain/interfaces/session.interface';

export const CheckAuthAction = async (): Promise<Session> => {
    const existingToken = localStorage.getItem('token');
    if (!existingToken) throw new Error('No token found');

    try {
        const checkAuthStatusUseCase = container.resolve('checkAuthStatusUseCase');
        const { user, token } = await checkAuthStatusUseCase.execute();
        localStorage.setItem('token', token);
        return { user, token };
    } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
        throw new Error('Token expired or not valid');
    }
};