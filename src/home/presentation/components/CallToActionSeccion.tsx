import { Button } from "@/shared/components/ui/button"
import { Link } from "react-router"


export const CallToActionSeccion = () => {
    return (
        <section className="bg-primary text-primary-foreground py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 dark:text-white">Comienza a gestionar tus citas hoy mismo</h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto dark:text-white px-2">
                    Únete a cientos de negocios que ya confían en CitasPro para administrar sus reservas
                </p>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                    <Link to="/auth/register">Crear Cuenta Gratis</Link>
                </Button>
            </div>
        </section>
    )
}
