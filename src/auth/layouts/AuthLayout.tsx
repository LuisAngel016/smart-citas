import { Outlet } from "react-router";


const AuthLayout = () => {
    return (
        <div className="font-poppins min-h-screen bg-background flex items-center justify-center p-4">

            <Outlet />
        </div>
    )
}

export default AuthLayout;
