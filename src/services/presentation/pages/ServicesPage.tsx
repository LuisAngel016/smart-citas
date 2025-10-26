"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { DollarSign, Plus } from "lucide-react"
import { ServiceModal } from "../components/ServiceModal"
import { useServiceForm } from "@/services/infrastructure/hooks/useServiceForm"
import { useGetServices } from "@/services/infrastructure/hooks/useGetServices"

export const ServicesPage = () => {

    const { data: servicesData, isLoading } = useGetServices();
    const { register, handleSubmit, errors, isSubmitting, isDialogOpen, openDialog, setIsDialogOpen, control, watch } = useServiceForm()

    if (isLoading) {
        return <div>Cargando servicios...</div>;
    }

    console.log(servicesData)
    return (
        <div>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-primary dark:text-blue-400" />
                                <CardTitle className="dark:text-gray-100">Servicios</CardTitle>
                            </div>
                            <CardDescription className="dark:text-gray-400">Gestiona los servicios que ofreces</CardDescription>
                        </div>
                        <Button onClick={openDialog}>
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar Servicio
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {servicesData?.data.map((service) => (
                            <div key={service.id} className="flex items-center justify-between p-4 border border-border dark:border-gray-700 rounded-lg">
                                <div>
                                    <p className="font-medium text-foreground dark:text-gray-100">{service.name}</p>
                                    <p className="text-sm text-muted-foreground dark:text-gray-400">{service.duration} • ${service.price}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-600">Editar</Button>
                                    <Button variant="outline" size="sm" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-600">Eliminar</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <ServiceModal
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}