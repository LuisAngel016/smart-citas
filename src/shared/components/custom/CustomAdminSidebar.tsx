import { Link, useLocation } from 'react-router';
import React, { useState } from 'react';
import {
    Users,
    Settings,
    ChevronLeft,
    ChevronRight,
    Briefcase,
    Box,
    Clock,
    LayoutDashboard,
    CalendarCheck,
} from 'lucide-react';
import { CustomLogo } from '@/shared/components/custom/CustomLogo';
import { cn } from '@/shared/lib/utils';
import { useAuthStore } from '@/auth/store/auth.store';
// Note: replaced dropdown overlay with an inline collapsible menu for 'Configuración'
// import { useAuthStore } from '@/auth/store/auth.store';

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export const CustomAdminSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {

    const { pathname } = useLocation();

    const { user } = useAuthStore();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
        { icon: CalendarCheck, label: 'Citas', to: '/admin/appointments' },
        { icon: Users, label: 'Clientes', to: '/admin/clients' },
    ];

    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(pathname.startsWith('/admin/settings'));

    const isActiveRoute = (to: string) => {

        if (pathname.includes('/admin/products/') && to === '/admin/products') return true;

        // treat settings subroutes as active for the parent
        if (to.startsWith('/admin/settings') && pathname.startsWith('/admin/settings')) return true;

        return pathname === to;
    }

    const getInitials = (fullName: string) => {
        if (!fullName) return;
        return fullName
            .split(" ")
            .map(word => word[0].toUpperCase())
            .join("");
    }

    return (
        <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-500 ease-in-out flex flex-col ${isCollapsed ? 'w-18' : 'w-64'}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between h-18">
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                    <CustomLogo navigate='/admin' />
                </div>
                <button
                    onClick={onToggle}
                    className={cn("p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 transition-all duration-300")}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li key={index}>
                                <Link
                                    to={item.to || '/admin'}
                                    className={`flex items-center gap-1.5 p-2 rounded-lg transition-all duration-300 group ${isActiveRoute(item.to || '/')
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-600 font-normal dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <Icon size={22} className="shrink-0" />
                                    <span className={`whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                                        }`}>
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                        {/* Configuración como submenú colapsable */}
                        <li>
                            <div>
                                <button
                                    onClick={() => setIsSettingsOpen((s) => !s)}
                                    aria-expanded={isSettingsOpen}
                                    className={`w-full flex items-center gap-1.5 p-2 rounded-lg transition-all duration-300 ${isActiveRoute('/admin/settings')
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-600 font-normal dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <Settings size={22} className="shrink-0" />
                                    <span className={`whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                                        }`}>
                                        Configuración
                                    </span>
                                    <ChevronRight size={16} className={`ml-auto transition-transform ${isSettingsOpen ? 'rotate-90' : ''} text-muted-foreground`} />
                                </button>

                                {/* subitems: hidden when collapsed */}
                                {!isCollapsed && (
                                    <ul className={`mt-1 ml-2 pl-2 border-l border-transparent ${isSettingsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} transition-all overflow-hidden`}>
                                        <li>
                                                <Link to="/admin/settings/business" className={`flex items-center gap-2 p-2 text-sm rounded-l-md ${pathname === '/admin/settings/business' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}>
                                                    <span className={`w-1 h-5 rounded-r-sm ${pathname === '/admin/settings/business' ? 'bg-blue-600' : 'bg-transparent'}`} />
                                                    <Briefcase size={16} className="shrink-0" />
                                                    <span>Negocio</span>
                                                </Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/settings/services" className={`flex items-center gap-2 p-2 text-sm rounded-l-md ${pathname === '/admin/settings/services' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}>
                                                <span className={`w-1 h-5 rounded-r-sm ${pathname === '/admin/settings/services' ? 'bg-blue-600' : 'bg-transparent'}`} />
                                                <Box size={16} className="shrink-0" />
                                                <span>Servicio</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/settings/schedules" className={`flex items-center gap-2 p-2 text-sm rounded-l-md ${pathname === '/admin/settings/schedules' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-medium' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'}`}>
                                                <span className={`w-1 h-5 rounded-r-sm ${pathname === '/admin/settings/schedules' ? 'bg-blue-600' : 'bg-transparent'}`} />
                                                <Clock size={16} className="shrink-0" />
                                                <span>Horario</span>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>
                </ul>
            </nav>

            {/* User Profile */}
            <div className={`p-4 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'h-0 p-0 opacity-0' : 'h-auto opacity-100'
                }`}>
                <div className="flex gap-2.5 items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {getInitials(user?.name || '')}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
