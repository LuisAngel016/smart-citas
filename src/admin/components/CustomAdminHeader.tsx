import { Bell, Calendar, LogOut, Search, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CustomAdminHeader = () => {
    return (
        <header className="border-b bg-gradient-to-r from-background to-muted/20 backdrop-blur-sm sticky top-0 z-10">
            <div className="h-16 flex items-center px-6 gap-4">
                <SidebarTrigger />
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Panel de Administración</h1>
                        <p className="text-xs text-muted-foreground">Gestiona tus citas y clientes</p>
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-3">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar clientes, servicios..."
                            className="pl-9 w-64"
                        />
                    </div>
                    <Button variant="outline" size="icon" className="relative rounded-full">
                        <Bell className="h-4 w-4" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                            3
                        </span>
                    </Button>

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer">
                                    <span className="text-sm font-semibold text-primary">JP</span>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Juan Pérez</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        juan.perez@ejemplo.com
                                    </p>
                                    <p className="text-xs leading-none text-primary font-medium mt-1">
                                        Plan Premium
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configuración</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Cerrar Sesión</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};
