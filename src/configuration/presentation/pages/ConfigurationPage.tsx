"use client"

import { BusinessPage } from "@/business/presentation"
import { NotificationsPage } from "@/notifications/presentation"
import { SchedulesPage } from "@/schedules/presentation"
import { ServicesPage } from "@/services/presentation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"

export const ConfigurationPage = () => {
    return (
        <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div>
                <h1 className="text-3xl font-bold text-foreground dark:text-gray-100">Configuración</h1>
                <p className="text-muted-foreground dark:text-gray-400 mt-1">Personaliza tu negocio y preferencias</p>
            </div>

            <Tabs defaultValue="negocio" className="space-y-6">
                <TabsList className="dark:bg-gray-800 dark:border-gray-700">
                    <TabsTrigger value="negocio" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">Negocio</TabsTrigger>
                    <TabsTrigger value="servicios" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">Servicios</TabsTrigger>
                    <TabsTrigger value="horarios" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">Horarios</TabsTrigger>
                    <TabsTrigger value="notificaciones" className="dark:data-[state=active]:bg-gray-700 dark:text-gray-300">Notificaciones</TabsTrigger>
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
