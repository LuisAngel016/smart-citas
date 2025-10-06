"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BusinessPage, NotificationsPage, SchedulesPage, ServicesPage } from ".."

export const ConfigurationPage = () => {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
                <p className="text-muted-foreground mt-1">Personaliza tu negocio y preferencias</p>
            </div>

            <Tabs defaultValue="negocio" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="negocio">Negocio</TabsTrigger>
                    <TabsTrigger value="servicios">Servicios</TabsTrigger>
                    <TabsTrigger value="horarios">Horarios</TabsTrigger>
                    <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
                    {/* <TabsTrigger value="integraciones">Integraciones</TabsTrigger> */}
                </TabsList>

                <TabsContent value="negocio" className="space-y-4">
                    <BusinessPage />
                </TabsContent>

                <TabsContent value="servicios" className="space-y-4">
                    <ServicesPage />
                </TabsContent>

                <TabsContent value="horarios" className="space-y-4">
                    <SchedulesPage />
                </TabsContent>

                <TabsContent value="notificaciones" className="space-y-4">
                    <NotificationsPage />
                </TabsContent>

                {/* <TabsContent value="integraciones" className="space-y-4">
                    <IntegrationsPage />
                </TabsContent> */}
            </Tabs>
        </div>
    )
}
