import React, { useRef } from 'react';
import { useSearchParams } from 'react-router';
import { Search, Bell, MessageSquare, Settings, Sun, Moon, User, LogOut } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { useThemeContext } from '@/shared/hooks/use-theme-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useAuthStore } from '@/auth/store/auth.store';

export const CustomAdminHeader: React.FC = () => {

    const [, setSearchParams] = useSearchParams()
    const { toggleTheme } = useThemeContext();

    const inputRef = useRef<HTMLInputElement>(null)

    const { logout } = useAuthStore()

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
            <div className="flex items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-md">
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
                            <button className="group cursor-pointer relative p-3 text-foreground/70 hover:text-foreground hover:bg-accent/10 rounded-xl transition-all duration-200 hover:border-accent/50">
                                <Settings
                                    size={22}
                                    className="transition-transform duration-200 group-hover:rotate-45"
                                />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-52 bg-popover border-border dropdown-shadow"
                            sideOffset={8}
                        >
                            <DropdownMenuLabel className="font-poppins text-base font-semibold">
                                Mi Cuenta
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-border" />
                            <DropdownMenuItem className="font-poppins cursor-pointer py-3 focus:bg-accent/10 focus:text-accent transition-colors">
                                <User className="mr-3 h-4 w-4" />
                                <span className="font-medium">Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-border" />
                            <DropdownMenuItem onClick={logout} className="font-poppins cursor-pointer py-3 text-destructive focus:bg-destructive/10 focus:text-destructive transition-colors">
                                <LogOut className="mr-3 h-4 w-4" />
                                <span className="font-medium">Cerrar sesión</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
                        JD
                    </div>
                </div>
            </div>
        </header >
    );
};
