import { Link } from 'react-router';
import { Bell, User, LogOut, Settings, HelpCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useAuthStore } from '@/auth/store/auth.store';
import { cn } from '@/shared/lib/utils';
import { getInitials } from '@/shared/lib/name.utils';


export const CustomUserDropdown = () => {

    const { logout, user } = useAuthStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-105 focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden">
                    {user?.imageUrl ? (
                        <img
                            src={user.imageUrl}
                            alt={user?.name || 'Avatar'}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        getInitials(user?.name || "")
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 font-poppins" align="end" sideOffset={8}>
                <div className="flex items-center gap-3 px-2 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white overflow-hidden">
                        {user?.imageUrl ? (
                            <img src={user.imageUrl} alt={user?.name || 'Avatar'} className="h-full w-full object-cover" />
                        ) : (
                            getInitials(user?.name || "")
                        )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-semibold leading-none">{user?.name}</p>
                        <p className="text-xs text-muted-foreground leading-none">{user?.email}</p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer py-2.5 hover:bg-ring/30 hover:text-ring">
                    <Link to="/admin/profile" className="flex items-center">
                        <User className={cn("mr-3 h-6 w-6")} />
                        <span className="font-medium">Perfil</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer py-2.5 hover:bg-ring/30 hover:text-ring">
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
    )
}
