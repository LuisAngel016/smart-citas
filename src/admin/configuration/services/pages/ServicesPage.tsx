"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign } from "lucide-react"
import { useState } from "react"
import { useServiceForm } from "../hooks/useServiceForm"
import type { Service } from "../interfaces/service.interface"
import ServiceModal from "../components/ServiceModal"

const initialServices: Service[] = [
    { id: '1', name: "Corte de Cabello", duration: "1 hora", price: 300 },
    { id: '2', name: "Tinte", duration: "1.5 horas", price: 800 },
    { id: '3', name: "Peinado", duration: "1 hora", price: 400 },
]

export const ServicesPage = () => {
    const [services, setServices] = useState(initialServices)
    const serviceForm = useServiceForm({
        onCreated: (service) => {
            setServices(prev => [{ ...service, id: String(prev.length + 1) }, ...prev])
        }
    })

    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <CardTitle>Servicios</CardTitle>
                            </div>
                            <CardDescription>Gestiona los servicios que ofreces</CardDescription>
                        </div>
                        <Button onClick={() => serviceForm.openDialog()}>Agregar Servicio</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {services.map((service: Service) => (
                            <div key={service.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                <div>
                                    <p className="font-medium text-foreground">{service.name}</p>
                                    <p className="text-sm text-muted-foreground">{service.duration} • ${service.price}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">Editar</Button>
                                    <Button variant="outline" size="sm">Eliminar</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <ServiceModal
                open={serviceForm.isDialogOpen}
                onOpenChange={(v) => { if (!v) serviceForm.closeDialog(); else serviceForm.openDialog() }}
                register={serviceForm.register}
                errors={serviceForm.errors}
                onSubmit={serviceForm.handleSubmit}
                isSubmitting={serviceForm.isSubmitting}
            />
        </div>
    )
}