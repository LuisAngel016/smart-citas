import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Link } from "react-router"

interface PlanFeature {
    text: string;
    included: boolean;
    emphasized?: boolean;
}

interface PricingPlan {
    title: string;
    description: string;
    price: number;
    period: string;
    features: PlanFeature[];
    buttonText: string;
    buttonLink: string;
    buttonVariant?: "outline" | "default";
    highlighted?: boolean;
    badge?: string;
}

const pricingPlans: PricingPlan[] = [
    {
        title: "Plan Gratis",
        description: "Perfecto para comenzar",
        price: 0,
        period: "/mes",
        features: [
            { text: "Hasta 50 citas por mes", included: true },
            { text: "Calendario semanal", included: true },
            { text: "Gestión de clientes básica", included: true },
            { text: "Formulario de reservas público", included: true },
            { text: "Notificaciones por email", included: false },
        ],
        buttonText: "Comenzar Gratis",
        buttonLink: "/auth/register",
        buttonVariant: "outline",
    },
    {
        title: "Plan Premium",
        description: "Para negocios en crecimiento",
        price: 29,
        period: "/mes",
        features: [
            { text: "Citas ilimitadas", included: true, emphasized: true },
            { text: "Todo del plan Gratis", included: true, emphasized: true },
            { text: "Dashboard con métricas avanzadas", included: true, emphasized: true },
            { text: "Notificaciones automáticas (Email + SMS)", included: true, emphasized: true },
            { text: "Recordatorios automáticos", included: true, emphasized: true },
            { text: "Soporte prioritario", included: true, emphasized: true },
        ],
        buttonText: "Comenzar Prueba Gratis",
        buttonLink: "/auth/register?plan=premium",
        buttonVariant: "default",
        highlighted: true,
        badge: "Más Popular",
    },
];

export const PricingPlans = () => {
    return (
        <section id="planes" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Planes para cada tipo de negocio</h2>
                    <p className="text-lg text-muted-foreground">Comienza gratis y escala cuando lo necesites</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {pricingPlans.map((plan) => (
                        <Card
                            key={plan.title}
                            className={`relative flex flex-col ${plan.highlighted ? "border-primary shadow-lg" : ""}`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                                    <span className="text-muted-foreground">{plan.period}</span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <Check
                                                className={`h-5 w-5 shrink-0 mt-0.5 ${feature.included ? "text-primary" : "text-muted-foreground"
                                                    }`}
                                            />
                                            <span
                                                className={`text-sm ${feature.emphasized ? "font-medium" : ""
                                                    } ${!feature.included ? "text-muted-foreground" : ""}`}
                                            >
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className={`w-full ${plan.buttonVariant === "outline" ? "bg-transparent" : ""}`}
                                    variant={plan.buttonVariant}
                                    asChild
                                >
                                    <Link to={plan.buttonLink}>{plan.buttonText}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
