import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
    title: string
    value: string | number
    description: string
    icon: LucideIcon
}

export const StatCard = ({ title, value, description, icon: Icon }: StatCardProps) => {
    // Función para determinar el color basado en el valor
    const getDescriptionColor = (desc: string): string => {
        const descStr = String(desc || "").trim()

        // Extraer el número del string
        const numMatch = descStr.match(/-?\d+\.?\d*/)
        if (!numMatch) return "text-muted-foreground"

        const num = parseFloat(numMatch[0])

        // Verificar si hay signo negativo o paréntesis (formato contable)
        const hasMinusSign = /^-/.test(descStr) || /^\(/.test(descStr)

        if (num === 0 && !hasMinusSign) {
            return "text-muted-foreground"
        } else if (num < 0 || hasMinusSign) {
            return "text-red-600 dark:text-red-400"
        } else {
            return "text-green-600 dark:text-green-400"
        }
    }

    const descriptionColor = getDescriptionColor(description)
    const isPositive = descriptionColor.includes("green")
    const isNegative = descriptionColor.includes("red")

    return (
        <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/20 animate-fade animation-duration-[1000ms] animate-delay-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
                <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {title}
                </CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
            </CardHeader>

            <CardContent className="relative">
                <div className="text-3xl font-bold tracking-tight text-foreground mb-1">
                    {value}
                </div>
                <div className="flex items-center gap-1.5">
                    {/* Indicador visual opcional */}
                    {isPositive && (
                        <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    )}
                    {isNegative && (
                        <svg className="h-4 w-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    )}
                    <p className={`text-sm leading-relaxed font-medium ${descriptionColor} transition-colors`}>
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}