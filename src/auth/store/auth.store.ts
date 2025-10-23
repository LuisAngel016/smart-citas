import type { User } from '@/auth/domain/entities/user.entity';
import { create } from 'zustand'
import { LoginAction } from '../infrastructure/hooks/useLoginAction';
import { CheckAuthAction } from '../infrastructure/hooks/useCheckAuthStatus';


type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    // Properties
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,


    // Getters
    isAdmin: () => boolean;

    // Actions
    login: (email: string, password: string) => Promise<boolean>,
    logout: () => void,
    checkAuthStatus: () => Promise<boolean>,
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Implementación del store

    user: null,
    token: null,
    authStatus: 'checking',

    // Getters
    isAdmin: () => {
        const roles = get().user?.roles || [];

        return roles.includes('user');
    },

    // Actions
    login: async (email: string, password: string) => {
        try {
            const data = await LoginAction(email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            return true;
        } catch (error) {
            console.log(error)
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' })
    },
    checkAuthStatus: async() => {
        try {
            const { user, token } = await CheckAuthAction();

            set({
                user,
                token,
                authStatus: 'authenticated'
            })

            return true;
            
        } catch (error) {
            console.log(error)
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            })

            return false;
        }
    }
}))