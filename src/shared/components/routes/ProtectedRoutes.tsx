import { useAuthStore } from "@/auth/store/auth.store"
import type { PropsWithChildren } from "react"
import { CustomFullScreenLoading } from "../custom/CustomFullScreenLoading";
import { Navigate } from "react-router";




export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {


    const { authStatus } = useAuthStore();

    if (authStatus === "checking") return <CustomFullScreenLoading />

    if (authStatus === "not-authenticated") return <Navigate to='/auth/login' />

    return children;
}

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {


    const { authStatus, isAdmin } = useAuthStore();

    if (authStatus === "checking") return <CustomFullScreenLoading />

    if (authStatus === "authenticated") {
        // Redirigir según el rol del usuario
        return <Navigate to={isAdmin() ? '/admin' : '/user'} />
    }

    return children;

}

export const AdminRoute = ({ children }: PropsWithChildren) => {


    const { authStatus, isAdmin, isUser } = useAuthStore();

    if (authStatus === "checking") return <CustomFullScreenLoading />

    if (authStatus === "not-authenticated") return <Navigate to='/auth/login' />

    // Si es user, redirigir a /user, si no es admin ni user, redirigir a login
    if (!isAdmin()) return <Navigate to={isUser() ? '/user' : '/auth/login'} />

    return children;
}

export const UserRoute = ({ children }: PropsWithChildren) => {


    const { authStatus, isUser, isAdmin } = useAuthStore();

    if (authStatus === "checking") return <CustomFullScreenLoading />

    if (authStatus === "not-authenticated") return <Navigate to='/auth/login' />

    // Si es admin, redirigir a /admin, si no es user ni admin, redirigir a login
    if (!isUser()) return <Navigate to={isAdmin() ? '/admin' : '/auth/login'} />

    return children;
}