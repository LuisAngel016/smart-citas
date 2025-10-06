import { Button } from "@/components/ui/button"
import { Link } from "react-router"


export const CustomJumbotron = () => {
    return (
        <section className="container mx-auto px-4 py-20 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                    Gestiona las citas de tu negocio de forma profesional
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
                    Sistema completo para administrar reservas, clientes y servicios. Ahorra tiempo y mejora la experiencia de
                    tus clientes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="w-full sm:w-auto" asChild>
                        <Link to="/auth/register">Comenzar Gratis</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                        <a href="#planes">Ver Planes</a>
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Sin tarjeta de crédito • Configuración en 5 minutos</p>
            </div>
        </section>
    )
}
