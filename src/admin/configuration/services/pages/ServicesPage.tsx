"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign } from "lucide-react"
import { useState } from "react"
import { useServiceForm } from "../hooks/useServiceForm"
import { ServiceModal } from "../components/ServiceModal"
import type { Service } from "../interfaces/service.interface"

const initialServices: Service[] = [
    { id: '1', name: "Corte de Cabello", duration: "1 hora", price: "300" },
    { id: '2', name: "Tinte", duration: "1.5 horas", price: "800" },
    { id: '3', name: "Peinado", duration: "1 hora", price: "400" },
]

export const ServicesPage = () => {
    const [services, setServices] = useState(initialServices)
    const { register, handleSubmit, errors, isSubmitting, isDialogOpen, openDialog, setIsDialogOpen } = useServiceForm({
        onCreated: (service) => {
            setServices(prev => [{ ...service, id: String(prev.length + 1) }, ...prev])
        }
    })

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
                        <Button onClick={() => openDialog()}>Agregar Servicio</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {services.map((service: Service) => (
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
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}