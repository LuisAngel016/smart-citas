import { CustomLogo } from "@/components/custom/CustomLogo"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"


export const CustomHeader = () => {
    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex justify-center items-center gap-2">
                    <CustomLogo />
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <a
                        href="#caracteristicas"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Características
                    </a>
                    <a href="#planes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Planes
                    </a>
                    <a href="#contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        Contacto
                    </a>
                </nav>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="py-4.5" asChild>
                        <Link to="/auth/login">Iniciar Sesión</Link>
                    </Button>
                    <Button size="sm" className="py-4.5" asChild>
                        <Link to="/auth/register">Comenzar Gratis</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
