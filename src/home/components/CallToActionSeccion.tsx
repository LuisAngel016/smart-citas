import { Button } from "@/components/ui/button"
import { Link } from "react-router"


export const CallToActionSeccion = () => {
    return (
        <section className="bg-primary text-primary-foreground py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Comienza a gestionar tus citas hoy mismo</h2>
                <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                    Únete a cientos de negocios que ya confían en CitasPro para administrar sus reservas
                </p>
                <Button size="lg" variant="secondary" asChild>
                    <Link to="/registro">Crear Cuenta Gratis</Link>
                </Button>
            </div>
        </section>
    )
}
