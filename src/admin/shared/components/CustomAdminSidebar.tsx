import { Link, useLocation } from 'react-router';
import {
    Users,
    Settings,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    CalendarCheck,
} from 'lucide-react';
import { CustomLogo } from '@/components/custom/CustomLogo';
import { cn } from '@/lib/utils';
// import { useAuthStore } from '@/auth/store/auth.store';

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export const CustomAdminSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {

    const { pathname } = useLocation();

    //   const { user } = useAuthStore();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
        { icon: CalendarCheck, label: 'Citas', to: '/admin/appointments' },
        { icon: Users, label: 'Clientes', to: '/admin/clients' },
        { icon: Settings, label: 'Configuración', to: '/admin/settings' },
    ];

    const isActiveRoute = (to: string) => {

        if (pathname.includes('/admin/products/') && to === '/admin/products') return true;

        return pathname === to;
    }

    // const getInitials = (fullName: string) => {
    //     if (!fullName) return;
    //     return fullName
    //         .split(" ")
    //         .map(word => word[0].toUpperCase())
    //         .join("");
    // }

    return (
        <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-18' : 'w-64'
            } flex flex-col`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between h-18">
                {!isCollapsed && (
                    <CustomLogo />
                )}
                <button
                    onClick={onToggle}
                    className={cn("p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors")}
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
                                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${isActiveRoute(item.to || '/')
                                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    <Icon size={22} className="flex-shrink-0" />
                                    {!isCollapsed && (
                                        <span className="font-medium">{item.label}</span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User Profile */}
            {!isCollapsed && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {/* {getInitials(user?.fullName || '')} */}
                        </div>
                        <div className="flex-1 min-w-0">
                            {/* <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.fullName}</p> */}
                            {/* <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
