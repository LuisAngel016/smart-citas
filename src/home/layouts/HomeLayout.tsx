import { Outlet } from "react-router"


export const HomeLayout = () => {
    return (
        <div className="font-poppins min-h-screen bg-background">
            <Outlet />
        </div>

    )
}
