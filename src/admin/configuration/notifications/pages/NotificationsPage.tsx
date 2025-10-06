"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export const NotificationsPage = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    <CardTitle>Notificaciones</CardTitle>
                </div>
                <CardDescription>Configura cómo y cuándo recibir notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-foreground">Nueva Cita</p>
                            <p className="text-sm text-muted-foreground">Recibe notificación cuando se agenda una nueva cita</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-foreground">Cancelación de Cita</p>
                            <p className="text-sm text-muted-foreground">Notificación cuando un cliente cancela</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-foreground">Recordatorio de Cita</p>
                            <p className="text-sm text-muted-foreground">Recordatorio 1 hora antes de cada cita</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-foreground">Resumen Diario</p>
                            <p className="text-sm text-muted-foreground">Recibe un resumen de citas cada mañana</p>
                        </div>
                        <Switch />
                    </div>
                </div>
                <Button>Guardar Preferencias</Button>
            </CardContent>
        </Card>
    )
}