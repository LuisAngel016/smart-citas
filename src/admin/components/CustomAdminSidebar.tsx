"use client"

import { Link, useLocation } from "react-router"
import { Calendar, Users, LayoutDashboard, Settings } from "lucide-react"
import smartCitasTwo from "../../assets/images/smartCitas.png"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"


const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Citas", href: "/admin/appoinment", icon: Calendar },
    { name: "Clientes", href: "/admin/clients", icon: Users },
    { name: "Configuración", href: "/admin/configuration", icon: Settings },
]

export const CustomAdminSidebar = () => {
    const { pathname } = useLocation()
    const { state } = useSidebar()
    const collapsed = state === "collapsed"

    const isActive = (path: string) => pathname === path

    return (
        <Sidebar>
            <SidebarContent>
                {/* Logo */}
                <SidebarGroup>
                    <div className="px-2 py-1 border-b border-border">
                        <div className="flex items-center gap-2">
                            <img src={smartCitasTwo} className="h-12 w-auto" alt="SmartCitas" />
                        </div>
                    </div>
                </SidebarGroup>

                {/* Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-primary font-bold text-lg">
                        Menú Principal
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild isActive={isActive(item.href)}>
                                        <Link to={item.href}>
                                            <item.icon className="h-5 w-5" />
                                            {!collapsed && <span>{item.name}</span>}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
