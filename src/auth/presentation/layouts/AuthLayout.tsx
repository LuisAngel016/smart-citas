import { Outlet } from "react-router";


const AuthLayout = () => {
    return (
        <div className="font-poppins min-h-screen bg-background flex flex-col animate-fade animate-duration-[2000ms] animate-delay-100">

            <main className="flex-1 flex items-center justify-center">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout;
