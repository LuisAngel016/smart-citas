import { Outlet } from "react-router";
import { CustomAdminSidebar } from "../components/CustomAdminSidebar";
import { CustomAdminHeader } from "../components/CustomAdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";


const AdminLayout = () => {
    return (
        <SidebarProvider>
            <div className="font-poppins min-h-screen bg-background flex w-full">
                <CustomAdminSidebar />
                <div className="flex-1 flex flex-col">
                    <CustomAdminHeader />
                    <Outlet />
                </div>
            </div>
        </SidebarProvider>
    )
}

export default AdminLayout;
