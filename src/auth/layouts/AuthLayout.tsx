import { CustomHeader } from "@/components/custom/CustomHeader";
import { Outlet } from "react-router";


const AuthLayout = () => {
    return (
        <div className="font-poppins min-h-screen bg-background flex flex-col">
            <CustomHeader />

            <main className="flex-1 flex items-center justify-center bg-cyan-500/3">
                <Outlet />
            </main>
        </div>
    )
}

export default AuthLayout;
