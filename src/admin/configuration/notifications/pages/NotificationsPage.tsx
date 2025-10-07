"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export const NotificationsPage = () => {
    return (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary dark:text-blue-400" />
                    <CardTitle className="dark:text-gray-100">Notificaciones</CardTitle>
                </div>
                <CardDescription className="dark:text-gray-400">Configura cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-foreground dark:text-gray-100">Nueva Cita</p>
                            <p className="text-sm text-muted-foreground dark:text-gray-400">Recibe notificación cuando se agenda una nueva cita</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-foreground dark:text-gray-100">Cancelación de Cita</p>
                            <p className="text-sm text-muted-foreground dark:text-gray-400">Notificación cuando un cliente cancela</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-foreground dark:text-gray-100">Recordatorio de Cita</p>
                            <p className="text-sm text-muted-foreground dark:text-gray-400">Recordatorio 1 hora antes de cada cita</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-foreground dark:text-gray-100">Resumen Diario</p>
                            <p className="text-sm text-muted-foreground dark:text-gray-400">Recibe un resumen de citas cada mañana</p>
                        </div>
                        <Switch />
                    </div>
                </div>
                <Button>Guardar Preferencias</Button>
            </CardContent>
        </Card>
    )
}