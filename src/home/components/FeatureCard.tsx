import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DivideIcon as LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: typeof LucideIcon;
    title: string
    description: string
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
    return (
        <Card className="h-full transition-all shadow-md duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <CardTitle className="text-xl font-bold leading-tight">{title}</CardTitle>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-3 shrink-0">
                        <Icon className="h-7 w-7 text-primary" />
                    </div>
                </div>
                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                </CardDescription>
            </CardHeader>
        </Card>
    )
}
