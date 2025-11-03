import { Outlet } from "react-router"


export const HomeLayout = () => {
    return (
        <div className="font-poppins min-h-screen bg-background animate-fade animation-duration-[2000ms] animate-delay-100">
            <Outlet />
        </div>

    )
}
