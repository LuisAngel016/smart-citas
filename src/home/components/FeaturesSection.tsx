import { Calendar, Users, Clock, BarChart3, Settings, Check } from "lucide-react"
import { FeatureCard } from "./FeatureCard"


export const FeaturesSection = () => {
    return (
        <section id="caracteristicas" className="bg-muted/30 py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Todo lo que necesitas para gestionar tu negocio
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Herramientas profesionales diseñadas para negocios que valoran su tiempo
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <FeatureCard
                        icon={Calendar}
                        title="Calendario Inteligente"
                        description="Vista semanal con disponibilidad en tiempo real y gestión de horarios"
                    />

                    <FeatureCard
                        icon={Users}
                        title="Gestión de Clientes"
                        description="Base de datos completa con historial de citas y preferencias"
                    />

                    <FeatureCard
                        icon={Clock}
                        title="Reservas Online"
                        description="Formulario público para que tus clientes agenden 24/7"
                    />

                    <FeatureCard
                        icon={BarChart3}
                        title="Dashboard con Métricas"
                        description="Estadísticas y reportes para tomar mejores decisiones"
                    />

                    <FeatureCard
                        icon={Settings}
                        title="Configuración Flexible"
                        description="Personaliza horarios, servicios y notificaciones automáticas"
                    />

                    <FeatureCard
                        icon={Check}
                        title="Fácil de Usar"
                        description="Interfaz intuitiva que no requiere capacitación técnica"
                    />
                </div>
            </div>
        </section>
    )
}