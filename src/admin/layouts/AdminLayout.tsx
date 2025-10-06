import { useState } from "react";
import { Outlet } from "react-router";
import { CustomAdminSidebar } from "../shared/components/CustomAdminSidebar";
import { CustomAdminHeader } from "../shared/components/CustomAdminHeader";


const AdminLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    return (
        <div className="font-poppins min-h-screen bg-gray-50 flex">
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
