import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Building2, Palette } from "lucide-react"

export const BusinessLoadingSkeleton = () => {
    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen animate-fade-up animated-duration-[800ms] animate-delay-100">
            {/* Información del Negocio Card */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary dark:text-blue-400" />
                        <Skeleton className="h-6 w-52" />
                    </div>
                    <Skeleton className="h-4 w-64 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Nombre del Negocio */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-20 w-full" />
                    </div>

                    {/* Teléfono y Email */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>

                    {/* Dirección */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>

                    {/* Botón Guardar */}
                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-36" />
                    </div>
                </CardContent>
            </Card>

            {/* Personalización Card */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Palette className="h-5 w-5 text-primary dark:text-blue-400" />
                        <Skeleton className="h-6 w-40" />
                    </div>
                    <Skeleton className="h-4 w-80 mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Logo del Negocio */}
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-[200px] w-full rounded-lg" />
                        </div>

                        {/* Logo Actual */}
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-[200px] w-full rounded-lg" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}