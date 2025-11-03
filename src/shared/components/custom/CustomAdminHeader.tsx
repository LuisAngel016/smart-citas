import React, { useRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Search, Bell, MessageSquare, Sun, Moon, User, LogOut, Menu, Settings, HelpCircle } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { useThemeContext } from '@/shared/hooks/use-theme-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useAuthStore } from '@/auth/store/auth.store';
import { cn } from '@/shared/lib/utils';
import { getInitials } from '@/shared/lib/name.utils';

interface HeaderProps {
    onMenuClick: () => void;
}

export const CustomAdminHeader: React.FC<HeaderProps> = ({ onMenuClick }) => {

    const [, setSearchParams] = useSearchParams()
    const { toggleTheme } = useThemeContext();

    const inputRef = useRef<HTMLInputElement>(null)

    const { logout, user } = useAuthStore()

    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        const query = inputRef.current?.value.trim().toLowerCase() ?? '';
        if (!query) {
            setSearchParams(() => '')
            return;
        };

        setSearchParams((prev) => {
            prev.set('query', query);
            return prev;
        })
    }
    return (
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 h-18">
            <div className="flex items-center justify-between gap-4">
                {/* Botón menú mobile - AGREGAR AL INICIO */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                    <Menu size={24} />
                </button>
                {/* Search */}
                <div className="flex-1 max-w-md hidden md:block">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="relative cursor-pointer p-2 text-gray-600 hover:hover:text-foreground dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </button>
                    <button className="group relative cursor-pointer p-2 text-gray-600 dark:text-gray-300 hover:hover:text-foreground dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Bell size={20} className="transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                    </button>

                    <button aria-label="Mensajes" className="group cursor-pointer p-2 text-gray-600 dark:text-gray-300 hover:hover:text-foreground dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <MessageSquare size={20} className="transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110" />
                    </button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-105 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2">
                                {getInitials(user?.name || "")}
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-72 font-poppins" align="end" sideOffset={8}>
                            <div className="flex items-center gap-3 px-2 py-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
                                    {getInitials(user?.name || "")}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-sm font-semibold leading-none">{user?.name}</p>
                                    <p className="text-xs text-muted-foreground leading-none">{user?.email}</p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className="cursor-pointer py-2.5 hover:bg-ring/30 hover:text-ring">
                                <Link to="/profile" className="flex items-center">
                                    <User className={cn("mr-3 h-6 w-6")} />
                                    <span className="font-medium">Perfil</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer py-2.5 hover:bg-ring/30 hover:text-ring">
                                <Link to="/admin/settings/business" className="flex items-center">
                                    <Settings className={cn("mr-3 h-6 w-6")} />
                                    <span className="font-medium">Configuración</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer py-2.5 hover:bg-ring/30 hover:text-ring">
                                <Bell className={cn("mr-3 h-6 w-6")} />
                                <span className="font-medium">Notificaciones</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer py-2.5 hover:bg-ring/30 hover:text-ring">
                                <HelpCircle className={cn("mr-3 h-6 w-6")} />
                                <span className="font-medium">Ayuda y soporte</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout} variant="destructive" className="cursor-pointer py-2.5">
                                <LogOut className={cn("mr-3 h-6 w-6")} />
                                <span className="font-medium">Cerrar sesión</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </header >
    );
};
