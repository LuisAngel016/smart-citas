import { CustomAdminHeader, CustomAdminSidebar } from "@/shared/components/custom";
import { useState } from "react";
import { Outlet } from "react-router";


const AdminLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    return (
        <div className="font-poppins min-h-screen bg-gray-50 dark:bg-gray-900 flex animate-fade animate-duration-[2000ms] animate-delay-100">
            <CustomAdminSidebar
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div className="flex-1 flex flex-col">
                <CustomAdminHeader />

                <main className="flex-1">

                    <Outlet />

                </main>
            </div>
        </div>
    )
}

export default AdminLayout;
