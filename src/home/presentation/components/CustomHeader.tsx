import { CustomLogo } from "@/shared/components/custom/CustomLogo"
import { Button } from "@/shared/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet"
import { Separator } from "@/shared/components/ui/separator"
import { useThemeContext } from "@/shared/hooks/use-theme-context"
import { Menu, Moon, Sun, ChevronRight, Calendar, Users, MessageSquare } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"


export const CustomHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { toggleTheme } = useThemeContext();
    const navigate = useNavigate();

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(false);
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setIsOpen(false);

        const element = document.querySelector(targetId);
        if (element) {
            const headerOffset = 80; // Altura del header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <button
                    onClick={handleLogoClick}
                    className="flex justify-center items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
                >
                    <CustomLogo />
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden sm:flex items-center gap-6">
                    <a
                        href="#caracteristicas"
                        onClick={(e) => handleSmoothScroll(e, '#caracteristicas')}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors dark:text-white"
                    >
                        Características
                    </a>
                    <a
                        href="#planes"
                        onClick={(e) => handleSmoothScroll(e, '#planes')}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors dark:text-white"
                    >
                        Planes
                    </a>
                    <a
                        href="#contacto"
                        onClick={(e) => handleSmoothScroll(e, '#contacto')}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors dark:text-white"
                    >
                        Contacto
                    </a>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden sm:flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="relative p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </button>
                    <Button variant="ghost" size="sm" className="py-4.5" asChild>
                        <Link to="/auth/login">Iniciar Sesión</Link>
                    </Button>
                    <Button size="sm" className="py-4.5 " asChild>
                        <Link to="/auth/register">Comenzar Gratis</Link>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="sm:hidden flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="relative p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                        <Moon className="absolute top-2 left-2 h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    </button>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Abrir menú</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-full sm:w-[400px] p-0 flex flex-col"
                        >
                            {/* Header */}
                            <SheetHeader className="px-6 py-5 border-b border-border">
                                <SheetTitle asChild>
                                    <button
                                        onClick={handleLogoClick}
                                        className="font-poppins flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-left"
                                    >
                                        <CustomLogo />
                                    </button>
                                </SheetTitle>
                                <SheetDescription className="sr-only">
                                    Menú de navegación principal con opciones para características, planes y contacto
                                </SheetDescription>
                            </SheetHeader>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto">
                                {/* Navigation Section */}
                                <div className="py-4">
                                    <div className="px-6 mb-2">
                                        <h3 className="font-poppins text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            Navegar
                                        </h3>
                                    </div>

                                    <nav className="flex flex-col">
                                        <a
                                            href="#caracteristicas"
                                            onClick={(e) => handleSmoothScroll(e, '#caracteristicas')}
                                            className="flex items-center justify-between px-6 py-4 hover:bg-accent transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-primary/10">
                                                    <Calendar className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="font-poppins text-sm font-medium text-foreground">
                                                    Características
                                                </span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                        </a>

                                        <a
                                            href="#planes"
                                            onClick={(e) => handleSmoothScroll(e, '#planes')}
                                            className="flex items-center justify-between px-6 py-4 hover:bg-accent transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-primary/10">
                                                    <Users className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="font-poppins text-sm font-medium text-foreground">
                                                    Planes
                                                </span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                        </a>

                                        <a
                                            href="#contacto"
                                            onClick={(e) => handleSmoothScroll(e, '#contacto')}
                                            className="flex items-center justify-between px-6 py-4 hover:bg-accent transition-colors group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-primary/10">
                                                    <MessageSquare className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="font-poppins text-sm font-medium text-foreground">
                                                    Contacto
                                                </span>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                        </a>
                                    </nav>
                                </div>

                                <Separator className="my-2" />

                                {/* Other Links Section */}
                                <div className="py-4">
                                    <div className="px-6 mb-2">
                                        <h3 className="font-poppins text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                            Información
                                        </h3>
                                    </div>

                                    <nav className="flex flex-col">
                                        <a
                                            href="#acerca"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-between px-6 py-3 hover:bg-accent transition-colors"
                                        >
                                            <span className="font-poppins text-sm text-muted-foreground">Acerca de</span>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </a>
                                        <a
                                            href="#ayuda"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-between px-6 py-3 hover:bg-accent transition-colors"
                                        >
                                            <span className="font-poppins text-sm text-muted-foreground">Ayuda</span>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                        </a>
                                    </nav>
                                </div>
                            </div>

                            {/* Footer with Action Buttons */}
                            <div className="border-t border-border p-4 space-y-3 bg-card/50 backdrop-blur-sm">
                                <Button
                                    variant="outline"
                                    className="font-poppins w-full h-11 font-medium border-2"
                                    asChild
                                >
                                    <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                                        Iniciar Sesión
                                    </Link>
                                </Button>
                                <Button
                                    className="font-poppins w-full h-11 bg-primary hover:bg-primary/90"
                                    asChild
                                >
                                    <Link to="/auth/register" onClick={() => setIsOpen(false)}>
                                        Comenzar Gratis
                                    </Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
